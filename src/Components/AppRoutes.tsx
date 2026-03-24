import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WindowHeader } from "./Header/window-header";
import { ProtectedRoute, PublicRouter } from "./ProtectedRouter";
import { Home } from "@/Pages/Home";
import { Register } from "@/Pages/Register";
import { Study } from "@/Pages/Study";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* window customize */}
      <WindowHeader />

      <Routes>
        <Route element={<PublicRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/study"
          element={
            <ProtectedRoute>
              <Study />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
