import styles from "./empleados.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faBars,
  faBell,
  faHeart,
  faHome,
  faRightFromBracket,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import perfil from "../../../assets/perfil.png";
import logo from "../../../assets/logo.png";
import { useToast } from "../../../hooks/useToast";
const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("empleados"));
    if (data) {
      setEmpleados(data);
    }
  }, []);

  const navigate = useNavigate();
  const { toast } = useToast();
  const verEmpleado = (id) => {
    navigate(`/infoempleado/${id}`);
  }
  const noAbiableFunction = () => {
    toast("warning", "Esta funcion no esta disponible");
  };

  const deleteEmepleado = (id) => {
    const data = JSON.parse(localStorage.getItem("empleados"));
    const newData = data.filter((empleado) => empleado.id !== id);
    localStorage.setItem("empleados", JSON.stringify(newData));
    setEmpleados(newData);
  };

  const editarEmpleado = (id) => {
    const empleado = empleados.find((empleado) => empleado.id === id);
    Swal.fire({
      title: "Editar Empleado",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre" value="${empleado.name}" required>
        <input type="text" id="lastName" class="swal2-input" placeholder="Apellido" value="${empleado.lastName}" required>
        <input type="email" id="email" class="swal2-input" placeholder="Correo electronico" value="${empleado.email}" required>
        <input type="text" id="cargo" class="swal2-input" placeholder="Cargo" value="${empleado.cargo}" required>
        <input type="text" id="departamento" class="swal2-input" placeholder="Departamento" value="${empleado.departamento}" required>
        <input type="text" id="telefono" class="swal2-input" placeholder="Telefono" value="${empleado.telefono}" required>
      `,
      showCancelButton: true,
      confirmButtonText: "Editar",
      preConfirm: () => {
        return {
          name: document.getElementById("name").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          cargo: document.getElementById("cargo").value,
          departamento: document.getElementById("departamento").value,
          telefono: document.getElementById("telefono").value,
        };
      },
    }).then((result) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(result.value.email)) {
        toast("error", "Correo electronico invalido", false);
        return;
      }
      const dataLocal = JSON.parse(localStorage.getItem("empleados"));
      const newData = dataLocal.map((empleado) => {
        if (empleado.id === id) {
          return {
            id: empleado.id,
            name: result.value.name,
            lastName: result.value.lastName,
            email: result.value.email,
            cargo: result.value.cargo,
            departamento: result.value.departamento,
            telefono: result.value.telefono,
          };
        }
        return empleado;
      });
      localStorage.setItem("empleados", JSON.stringify(newData));
      setEmpleados(newData);
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas seguro de cerrar sesion?",
      showCancelButton: true,
      confirmButtonText: `Cerrar Sesion`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  const handleNotification = () => {
    Swal.fire({
      title: "Notificaciones",
      text: "Aqui se mostraran las notificaciones",
      icon: "info",
      confirmButtonText: "Aceptar",
    });
  };
  const handleAgregarEmpleado = () => {
    Swal.fire({
      title: "Agregar Empleado",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre" required>
        <input type="text" id="lastName" class="swal2-input" placeholder="Apellido" required>
        <input type="email" id="email" class="swal2-input" placeholder="Correo electronico" required>
        <input type="text" id="cargo" class="swal2-input" placeholder="Cargo" required>
        <input type="text" id="departamento" class="swal2-input" placeholder="Departamento" required>
        <input type="text" id="telefono" class="swal2-input" placeholder="Telefono" required>
      `,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      preConfirm: () => {
        return {
          name: document.getElementById("name").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          cargo: document.getElementById("cargo").value,
          departamento: document.getElementById("departamento").value,
          telefono: document.getElementById("telefono").value,
        };
      },
    }).then((result) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(result.value.email)) {
        toast("error", "Correo electronico invalido", false);
        return;
      }

      const dataLocal = JSON.parse(localStorage.getItem("empleados")) || [];
      const user = dataLocal.find((user) => user.email === result.value.email);

      if (user) {
        toast("error", "El empleado ya existe", false);
      } else {
        const newEmpleado = {
          id: dataLocal.length + 1,
          name: result.value.name,
          lastName: result.value.lastName,
          email: result.value.email,
          cargo: result.value.cargo,
          departamento: result.value.departamento,
          telefono: result.value.telefono,
        };
        const newData = [...dataLocal, newEmpleado];
        localStorage.setItem("empleados", JSON.stringify(newData));
        setEmpleados(newData); // Actualiza el estado para que se vuelva a renderizar el componente
        toast("success", "Empleado agregado correctamente", false);
      }
    });
  };
 
  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={logo} alt="" className={styles.logosidebar} />
        </div>
        <h2>Menu</h2>
        <p>Administracion de recursos humanos</p>
        <div className={styles.menu}>
          <div className={styles.top_sidebar}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="busqueda global"
                className={styles.sidebar_input}
              />
            </div>
            <nav className={styles.list}>
              <ul>
                <Link to="/dashboard" className={styles.text_white}>
                  <li className={styles.menu_btn}>
                    <FontAwesomeIcon icon={faHome} />
                    <span>Inicio</span>
                  </li>
                </Link>
                <Link to="/empleados" className={styles.text_white}>
                  <li className={styles.menu_btn}>
                    <FontAwesomeIcon icon={faUpload} />
                    Empleados
                  </li>
                </Link>
                <li onClick={handleNotification} className={styles.menu_btn}>
                  <FontAwesomeIcon icon={faBell} />
                  Notificaciones
                </li>
                <Link to="/areasocial" className={styles.text_white}>
                  <li className={styles.menu_btn}>
                    <FontAwesomeIcon icon={faHeart} />
                    Area Social
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className={styles.bottom_sidebar}>
            <nav className={styles.list}>
              <ul>
                <li className={styles.menu_btn} onClick={noAbiableFunction}>
                  <FontAwesomeIcon icon={faBars} />
                  Configuraciones
                </li>
                <li onClick={handleLogout} className={styles.menu_btn}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Cerrar Sesion
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <h1>Empleados</h1>
        <div className={styles.search_bar}>
          <select name="" id="" className={styles.select_empleado}>
            Buscar por
            <option value="">Nombre</option>
            <option value="">Apellido</option>
            <option value="">Cargo</option>
            <option value="">Departamento</option>
          </select>
          <button onClick={noAbiableFunction} className={styles.primary_btn}>
            Ordenar de la A - Z
          </button>
          <input
            type="text"
            placeholder="Buscar empleado"
            id="empleado_search"
            className={styles.empleado_search_input}
          />
          <button className={styles.primary_btn} onClick={noAbiableFunction}>
            Buscar
          </button>
          <button
            className={styles.primary_btn}
            onClick={handleAgregarEmpleado}
          >
            Agregar empleado
          </button>
        </div>
        <div className={styles.empleado_list} id="empleado_list">
          {empleados.length > 0 ? (
            empleados.map((empleado, index) => {
              return (
                <div className={styles.empleado_card} key={index}>
                  <div className={styles.empleado_info}>
                    <img
                      onClick={() => verEmpleado(empleado.id)}
                      src={perfil}
                      alt=""
                      className={styles.empleado_card_icon}
                    />
                    <div>
                      <h3>
                        {empleado.name} {empleado.lastName}
                      </h3>
                      <p>Cargo: {empleado.cargo}</p>
                      <p>Departamento: {empleado.departamento}</p>
                      <p>Correo: {empleado.email}</p>
                      <p>Telefono: {empleado.telefono}</p>
                    </div>
                  </div>
                  <div className={styles.empleado_actions}>
                    <button
                      className={styles.primary_btn}
                      onClick={() => editarEmpleado(empleado.id)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.primary_btn}
                      onClick={() => deleteEmepleado(empleado.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No hay empleados</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default Empleados;
