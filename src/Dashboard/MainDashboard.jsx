import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../mainpages/Dashboard'
import FarmerManagement from '../mainpages/FarmerManagement'
import TaskManagement from '../mainpages/TaskManagement'
import ReportsAnalytics from '../mainpages/ReportsAnalytics'

function MainDashboard() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path = 'FarmerManagement' element={<FarmerManagement/>} />
        <Route path='TaskManagement' element= {<TaskManagement/>} />
        <Route path = 'ReportsAnalytics' element= {<ReportsAnalytics/>} />
        
        
      </Route>
    </Routes>
  )
}

export default MainDashboard