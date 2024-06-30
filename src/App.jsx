import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom"
import Principal from "./components/layout/principal/Principal";
import Empleados from "./components/layout/empleados/Empleados";
import Dashboard from "./components/layout/dashboard/Dashboard";
import InfoEmpleado from "./components/layout/infoempleados/InfoEmpleado";
import AreaSocial from "./components/layout/areasocial/AreaSocial";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/infoempleado/:id" element={<InfoEmpleado />} />
          <Route path="/areasocial" element={<AreaSocial />} />
          <Route path="*" element={<div>
            <h1>404</h1>
            <p>Not Found</p>
            <NavLink to={"/"}>Ir al incio de sesion</NavLink>
          </div>} />
          </Routes>
      </Router>
    </>
  )
}

export default App;
