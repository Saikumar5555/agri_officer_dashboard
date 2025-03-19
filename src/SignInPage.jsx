// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignInPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Dummy check for email and password
//     if (email === 'admin@gmail.com' && password === '123') {
//       // Store the role in localStorage
//       localStorage.setItem('role', 'admin');
//       navigate('/admin');
//     } else if (email === 'user@gmail.com' && password === '123') {
//       localStorage.setItem('role', 'user');
//       navigate('/user');
//     } else {
//       setErrorMessage('Invalid email or password');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome to Neural Farms</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className='flex justify-between'>
//             <label>Register</label>
//             <label>Forgot Password ?</label>
//           </div>
//           {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

//           <button
//             type="submit"
//             className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mbstechai from './logo1.png';
import mbsg from './mbs-g.png'

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    
    // Dummy check for email and password
    if (email === 'admin@gmail.com' && password === '123') {
      // Store the role in localStorage
      localStorage.setItem('role', 'admin');
      navigate('/admin');
    } else if (email === 'user@gmail.com' && password === '123') {
      localStorage.setItem('role', 'user');
      navigate('/user');
      
    } else if (email === 'main@gmail.com' && password === '123') {
      localStorage.setItem('role', 'main');
      navigate('/main');
      
    } 
    else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700">
       <img src={mbsg} alt="logo" className="absolute w-80 h-auto top-12 left-40" />
    <img src={mbstechai} alt="logo" className="absolute w-60 h-auto top-16 right-40" />
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register for Neural Farms</h2>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>

        {/* Link back to sign-in */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-green-600 hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
