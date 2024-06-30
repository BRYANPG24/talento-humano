import styles from "./infoempleado.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
const InfoEmpleado = () => {
  const [empleado, setEmpleado] = useState({
    id: "",
    name: "",
    lastName: "",
    departamento: "",
    email: "",
    telefono: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    // bucamos el empleado por el id en local storage
    // y lo mostramos en pantalla
    const empleados = JSON.parse(localStorage.getItem("empleados"));
    console.log(empleados);
    if (!empleados || empleados.length === 0) {
      toast("error", "No hay empleados registrados");
      navigate("/empleados");
    }

    const empleado = empleados.find((empleado) => empleado.id === parseInt(id));
    if (!empleado) {
      toast("error", "No se encontro el empleado");
      navigate("/empleados");
    }

    setEmpleado({
      id: empleado.id,
      name: empleado.name,
      lastName: empleado.lastName,
      departamento: empleado.departamento,
      email: empleado.email,
      telefono: empleado.telefono,
    });
    console.log(empleado);

  }, []);
  const handleAgregarTarea = () => {
    Swal.fire({
      title: "Agregar Tarea",
      html: `
        <input type="text" id="tarea" class="swal2-input" placeholder="Tarea" required>
        <input type="text" id="descripcion" class="swal2-input" placeholder="Descripcion" required>
        <h3>Fecha de vencimiento</h3>
        <input type="date" id="date" placeholder="Fecha de vencimiento" class="swal2-input">
        <h3>Prioridad</h3>
        <select id="prioridad" class="swal2-input">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <h3>Instrucciones</h3>
        <input type="file" disabled id="file" class="swal2-input" title="No disponible por el momento">
      `,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      preConfirm: () => {
        return {
          tarea: document.getElementById("tarea").value,
          descripcion: document.getElementById("descripcion").value,
          date: document.getElementById("date").value,
          prioridad: document.getElementById("prioridad").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = JSON.parse(localStorage.getItem("empleados"));
        if (!data) {
          toast("error", "No hay empleados registrados");
          return;
        }
        console.log(data.findIndex((empleado) => empleado.id === parseInt(id)));
        console.log(empleado);
        empleado.tareas = empleado.tareas || [];
        empleado.tareas.push({
          id: empleado.tareas.length + 1,
          tarea: result.value.tarea,
          descripcion: result.value.descripcion,
          date: result.value.date,
          prioridad: result.value.prioridad,
        });
        localStorage.setItem("empleados", JSON.stringify(data));
        toast("success", "Tarea agregada correctamente");
      }
    });
  };

  const volverEmpleados = () => {
    navigate("/empleados");
  };
  const noAbiableFunction = () => {
    toast("warning", "Esta funcion no esta disponible");
  };

  const handleNotification = () => {
    Swal.fire({
      title: "Notificaciones",
      text: "Aqui se mostraran las notificaciones",
      icon: "info",
      confirmButtonText: "Aceptar",
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

  const deleteEmepleado = () => {
    const data = JSON.parse(localStorage.getItem("empleados"));
    const newData = data.filter((empleado) => empleado.id !== parseInt(id));
    localStorage.setItem("empleados", JSON.stringify(newData));
    setEmpleado(newData);
    toast("success", "Empleado eliminado correctamente");
    navigate("/empleados");
  };

  const editarEmpleado = () => {
    Swal.fire({
      title: "Editar Empleado",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre" value="${empleado.name}" required>
        <input type="text" id="lastName" class="swal2-input" placeholder="Apellido" value="${empleado.lastName}" required>
        <input type="email" id="email" class="swal2-input" placeholder="Correo electronico" value="${empleado.email}" required>
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
      const data = JSON.parse(localStorage.getItem("empleados"));
      const newData = data.map((empleado) => {
        if (empleado.id === parseInt(id)) {
          return {
            id: empleado.id,
            name: result.value.name,
            lastName: result.value.lastName,
            email: result.value.email,
            departamento: result.value.departamento,
            telefono: result.value.telefono,
          };
        }
        return empleado;
      });
      localStorage.setItem("empleados", JSON.stringify(newData));
      setEmpleado({
        id: empleado.id,
        name: result.value.name,
        lastName: result.value.lastName,
        email: result.value.email,
        departamento: result.value.departamento,
        telefono: result.value.telefono,
      });
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
        <span>
          <button className={styles.primary_btn} onClick={volverEmpleados}>
            Volver
          </button>
        </span>
        <h1>
          Informacion: {empleado.name} {empleado.lastName}
        </h1>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardtop}>
              <img src={perfil} alt="" className={styles.img} />
              <div>
                <h2 className={styles.color_primary}>
                  <strong>
                    {empleado.name} {empleado.lastName}
                  </strong>
                </h2>
                <p>{empleado.departamento}</p>
              </div>
            </div>
            <div className={styles.cardmid}>
              <h3>Informacion</h3>
              <p>
                <strong>Correo:</strong> {empleado.email}
              </p>
              <p>
                <strong>Telefono:</strong> {empleado.telefono}
              </p>
            </div>
            <div className={styles.cardbottom}>
              <div className={styles.actions}>
                <button className={styles.primary_btn} onClick={editarEmpleado}>
                  Editar
                </button>
                <button
                  className={styles.primary_btn}
                  onClick={deleteEmepleado}
                >
                  Eliminar
                </button>
              </div>
              <div>
                <button
                  className={styles.secondary_btn}
                  onClick={handleAgregarTarea}
                >
                  Agregar tarea
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.task_container}>

        </div>
      </div>
    </div>
  );
};

export default InfoEmpleado;
