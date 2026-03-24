// Imports from tauri api
import { getCurrentWindow, PhysicalSize } from "@tauri-apps/api/window";

// import Context - UserData
import { UserData } from "@/Context/context";
import { AuthProvider } from "./Context/AuthProvider";
import { AppRoutes } from "./Components/AppRoutes";
import { useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "./utils";

const MAX_X = 812;
const MAX_Y = 546;

function App() {
  useEffect(() => {
    const appWindow = getCurrentWindow();

    // Aplicando valor minimo da tela de desktop
    appWindow.setMinSize(new PhysicalSize(1450, 900));

    // Ao redimensionar a tela
    appWindow.onResized(() => {
      //-------- TimerDrag --------//

      // Buscando os valores x e y na localStorage
      const timerDrag = getLocalStorage("timerDrag");
      // Alterando valores x e y de acordo com a condição
      timerDrag.x = timerDrag.x > MAX_Y ? 800 : timerDrag.x;
      timerDrag.y = timerDrag.y > MAX_Y ? 540 : timerDrag.y;

      // Salvando na localStorage
      setLocalStorage("timerDrag", timerDrag);

      //-------- TaskFrameDrag --------//

      // Buscando valores x e y na localStorage
      const TaskFrameDrag = getLocalStorage("TaskFrameDrag");

      // Alterando valores x e y de acordo com a condição
      TaskFrameDrag.x = TaskFrameDrag.x > MAX_X ? 730 : TaskFrameDrag.x;
      TaskFrameDrag.y = TaskFrameDrag.y > MAX_Y ? 540 : TaskFrameDrag.y;

      // Salvando na localStorage
      setLocalStorage("TaskFrameDrag", TaskFrameDrag);
    });
  }, []);

  return (
    <AuthProvider>
      <UserData>
        <AppRoutes />
      </UserData>
    </AuthProvider>
  );
}

export default App;
