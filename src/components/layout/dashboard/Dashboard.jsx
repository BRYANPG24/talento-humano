import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import styles from "./dashboard.module.css";
import logo from "../../../assets/logo.png";
import productividadMain from "../../../assets/productividad_main.png";
import perfil from "../../../assets/perfil.png";
import administrative from "../../../assets/administrative.png";
import areaSocial from "../../../assets/social_area.png";
import { useToast } from "../../../hooks/useToast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const toEmpleados = () => {
    navigate("/empleados");
  }

  const toAreaSocial = () => {
    navigate("/areasocial");
  }

  const noAbiableFunction = () => {
    toast('warning', "Esta funcion no esta disponible");
  }

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas seguro de cerrar sesion?",
      showCancelButton: true,
      confirmButtonText: `Cerrar Sesion`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
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

  return (
    <div className={styles.body}>
      <main>
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
          <h1>Resumen</h1>
          <div className={styles.menu_context}>
            <div className={styles.card}>
              <h3>Resumen principal</h3>
              <img
                src={productividadMain}
                alt=""
                className={styles.card_icon}
              />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi maxime nesciunt dolores dicta odio, cessitatibus quo
              </p>
              <button className={styles.primary_btn} onClick={noAbiableFunction}>Ver mas</button>
            </div>
            <div className={styles.card}>
              <h3>Jefes de areas</h3>
              <img src={perfil} alt="" className={styles.card_icon} />
              <p>
                Descipcion o informacion de los jefes de areas y temas sobre la
                productividad
              </p>
              <button className={styles.primary_btn} onClick={toEmpleados}>Ver mas</button>
            </div>
            <div className={styles.card}>
              <h3>Administracion de empleados</h3>
              <img src={administrative} alt="" className={styles.card_icon} />
              <p>
                Detalles sobre los empleados y sus actividades en la empresa
              </p>
              <button className={styles.primary_btn} onClick={toEmpleados}>Ver mas</button>
            </div>
            <div className={styles.card}>
              <h3>Area Social</h3>
              <img src={areaSocial} alt="" className={styles.card_icon} />
              <p>
                Informacion sobre el area social de la empresa y actividades
              </p>
              <button className={styles.primary_btn} onClick={toAreaSocial}>Ver mas</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
