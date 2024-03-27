import { PhysicalSize, appWindow } from '@tauri-apps/api/window'
appWindow.setMinSize(new PhysicalSize(1450,900))

// Ao redimensionar a tela
appWindow.onResized(() => {

  const timerDrag = localStorage.getItem('timerDrag') !== null && JSON.parse(localStorage.getItem('timerDrag') as string)

  timerDrag.x = timerDrag.x > 812 ? 800 : timerDrag.x
  timerDrag.y = timerDrag.y > 546 ? 540 : timerDrag.y

  localStorage.setItem('timerDrag',JSON.stringify(timerDrag))
})

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import window header 
import { WindowHeader } from './Components/window-header';

// pages
import { Home } from "./Components/Home";
import { Register } from './Components/Register';
import { Study } from './Components/study';

// import Context - UserData
import { UserData } from './Context/context';



function App() {
  return (
      <UserData>
        <BrowserRouter>
            {/* window customize */}
            <WindowHeader/>

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/study' element={<Study/>}/>
            </Routes>
        </BrowserRouter>
      </UserData>
  )
}

export default App;
