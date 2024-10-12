import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Scroll from './Pages/Scroll'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/scroll' element={<Scroll></Scroll>}></Route>
      </Routes>
    </div>
  )
}

export default App