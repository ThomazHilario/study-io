import { PhysicalSize, appWindow } from '@tauri-apps/api/window'
appWindow.setMinSize(new PhysicalSize(1450,900))
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from "./Components/Home";
import { Register } from './Components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
