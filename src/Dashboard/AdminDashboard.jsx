import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../Adminpages/Home'
import ServiceProviderDashboard from '../Adminpages/ServiceProviderDashboard'
import FarmEquipmentManager from '../Adminpages/FarmEquipmentManager'
import ServiceReport from '../Adminpages/ServiceReport'
import StaffAssignmentForm from '../Adminpages/StaffAssignmentForm'
import ServicesManagement from '../Adminpages/ServicesManagement'

function AdminDashboard() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        
        <Route path='ServicesManagement' element= {<ServicesManagement/>} />
        <Route path = 'ServiceReport' element={<ServiceReport />} />
        <Route path='FarmEquipmentManager' element= {<FarmEquipmentManager/>} />
        <Route path = 'StaffAssignmentForm' element= {<StaffAssignmentForm />} />
        <Route path='ServiceProviderDashboard' element={<ServiceProviderDashboard/>} />
        
      </Route>
    </Routes>
  )
}

export default AdminDashboard