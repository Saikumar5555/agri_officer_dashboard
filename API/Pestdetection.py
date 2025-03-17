from fastapi import FastAPI, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import torch
import numpy as np
from PIL import Image
from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import login
from transformers.utils import is_flash_attn_2_available
from transformers import BitsAndBytesConfig
import os
from ultralytics import YOLO  # Import for YOLOv8

# Initialize FastAPI
app = FastAPI()

# Ensure "static" directory exists for storing the processed image
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Add CORS middleware
origins = [
    "http://localhost",  # Allow local development requests
    "http://localhost:5173",  # Allow React front-end (if running on port 3000)
    "*",  # Allow all origins, adjust if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins or specify specific ones
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Log in to Hugging Face with your token
token = os.getenv("access_key")  # Replace with your actual token
login(token=token, add_to_git_credential=True)

# Load the model and tokenizer for image analysis
model_id = "vikhyatk/moondream2"
revision = "2024-08-26"

# Load the image analysis model and tokenizer
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True, revision=revision)
tokenizers = AutoTokenizer.from_pretrained(model_id, revision=revision)

# Configure model for text generation
model_id_text = "google/gemma-2b-it"
quantization_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_compute_dtype=torch.float16)

# Check for flash attention support
if is_flash_attn_2_available() and (torch.cuda.is_available() and torch.cuda.get_device_capability(0)[0] >= 8):
    attn_implementation = "flash_attention_2"
else:
    attn_implementation = "sdpa"  # scaled dot product attention

# Load the text model and tokenizer
tokenizer_text = AutoTokenizer.from_pretrained(model_id_text)
llm_model = AutoModelForCausalLM.from_pretrained(
    model_id_text,
    torch_dtype=torch.float16,
    attn_implementation=attn_implementation
)

# Move model to CUDA if available
if torch.cuda.is_available():
    llm_model.to("cuda")

# Load YOLOv8 model with CPU inference to avoid CUDA NMS issue
yolo_model = YOLO(r"C:\Users\yaswanth\Desktop\projects\Neural_Farms\Practice_web1\API\model\best.pt")  # Replace with your model path

# Image processing function for YOLOv8 and Moondream2
def process_image(image: Image.Image, symptoms_input: str):
    # Save the original PIL image temporarily to work with YOLOv8
    temp_img_path = "temp_image.jpg"
    image.save(temp_img_path)
    
    # Run YOLOv8 detection on the image with CPU device to avoid CUDA NMS issues
    results = yolo_model(temp_img_path, device="cpu")
    
    # Get the detection visualization (plot returns numpy array)
    detected_image = results[0].plot()
    
    # Convert back to PIL image
    detected_image_pil = Image.fromarray(detected_image)
    
    # Get moondream2 to analyze the original image
    original_image = image
    enc_image = model.encode_image(original_image)
    
    # Get the answer about the image
    ans = model.answer_question(enc_image, "Describe what you see in the image such as color, shape, size and what it may be in detail. Dont add prompt template or any other extra details. don't put any markdowns", tokenizers)
    
    # Get YOLO detection results for text analysis
    detection_info = ""
    for r in results:
        # Extract detected objects and their counts
        if len(r.boxes) > 0:
            classes = r.boxes.cls.cpu().numpy()
            names = r.names
            unique_classes, counts = np.unique(classes, return_counts=True)
            
            detection_info = "Detected: "
            for cls, count in zip(unique_classes, counts):
                detection_info += f"{count} {names[int(cls)]}, "
            detection_info = detection_info.rstrip(", ")
        else:
            detection_info = "No objects detected"
    
    # Combine answers for the final input
    prompt_question = "Describe what you know about this, including what measures to take and who to talk to about this.Dont add prompt template or any other extra details. don't put any markdowns"
    input_text = ans + " " + detection_info + " " + prompt_question

    # Create prompt template for instruction-tuned model
    dialogue_template = [
        {"role": "user", "content": input_text}
    ]

    # Apply the chat template
    prompt = tokenizer_text.apply_chat_template(conversation=dialogue_template, tokenize=False, add_generation_prompt=True)

    # Tokenize the input text and send it to the GPU
    input_ids = tokenizer_text(prompt, return_tensors="pt").to("cuda")

    # Generate outputs from the local LLM
    outputs = llm_model.generate(**input_ids, max_new_tokens=1024)

    # Decode the output tokens to text
    outputs_decoded = tokenizer_text.decode(outputs[0])

    # Clean and format the output
    outputs_cleaned = outputs_decoded.replace("<bos>", "").replace("<eos>", "").replace("<start_of_turn>", "").replace("<end_of_turn>", "").strip()

    # Extract structured data from the output
    analysis_result = outputs_cleaned.split("Measures to take:")[0].strip()
    measures_to_take = outputs_cleaned.split("Measures to take:")[1].split("Who to talk to:")[0].strip()
    who_to_talk_to = outputs_cleaned.split("Who to talk to:")[1].strip()

    # Return structured data
    structured_output = {
        "analysis_result": analysis_result,
        "measures_to_take": measures_to_take,
        "who_to_talk_to": who_to_talk_to,
        "yolo_detection_results": detection_info,
        "symptoms_provided": symptoms_input,
    }

    return structured_output, detected_image_pil

# Define FastAPI endpoint for image upload and analysis
@app.post("/analyze_image/")
async def analyze_image(image: UploadFile = File(...), symptoms_input: str = Form(...)):
    # Log the incoming data
    print(f"Received image: {image.filename}")
    print(f"Received symptoms input: {symptoms_input}")
    
    # Read the uploaded image data
    image_data = await image.read()
    image = Image.open(BytesIO(image_data))

    # Process the image and symptoms input
    analysis_result, detected_image = process_image(image, symptoms_input)

    # Ensure "static" directory exists for storing the processed image
    os.makedirs("static", exist_ok=True)
    
    # Save the processed detected image temporarily in the "static" folder
    detected_image_path = "static/detected_image.jpg"
    detected_image.save(detected_image_path)

    # Return the structured analysis result and the URL of the detected image
    return JSONResponse(content={
        "analysis_result": analysis_result["analysis_result"],
        "measures_to_take": analysis_result["measures_to_take"],
        "who_to_talk_to": analysis_result["who_to_talk_to"],
        "yolo_detection_results": analysis_result["yolo_detection_results"],
        "symptoms_provided": analysis_result["symptoms_provided"],
        "detected_image_url": f"/static/detected_image.jpg"  # Return relative URL
    })

# Run the FastAPI app using `uvicorn`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)