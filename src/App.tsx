// Imports from tauri api
import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';

// Instance getCurrentWindow
const appWindow = getCurrentWindow()

// Aplicando valor minimo da tela de desktop
appWindow.setMinSize(new PhysicalSize(1450,900))

// Ao redimensionar a tela
appWindow.onResized(() => {

  //-------- TimerDrag --------//

  // Buscando os valores x e y na localStorage
  const timerDrag = localStorage.getItem('timerDrag') !== null && JSON.parse(localStorage.getItem('timerDrag') as string)

  // Alterando valores x e y de acordo com a condição
  timerDrag.x = timerDrag.x > 812 ? 800 : timerDrag.x
  timerDrag.y = timerDrag.y > 546 ? 540 : timerDrag.y

  // Salvando na localStorage
  localStorage.setItem('timerDrag',JSON.stringify(timerDrag))


  //-------- TaskFrameDrag --------//

  // Buscando valores x e y na localStorage
  const TaskFrameDrag = localStorage.getItem('TaskFrameDrag') !== null && JSON.parse(localStorage.getItem('TaskFrameDrag') as string)
  
  // Alterando valores x e y de acordo com a condição
  TaskFrameDrag.x = TaskFrameDrag.x > 812 ? 730 : TaskFrameDrag.x
  TaskFrameDrag.y = TaskFrameDrag.y > 546 ? 540 : TaskFrameDrag.y

  // Salvando na localStorage
  localStorage.setItem('TaskFrameDrag',JSON.stringify(TaskFrameDrag))
})

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import window header 
import { WindowHeader } from '@/Components/Header/window-header';

// pages
import { Home } from "@/Pages/Home";
import { Register } from '@/Pages/Register';
import { Study } from '@/Pages/Study';

// import Context - UserData
import { UserData } from '@/Context/context';

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
