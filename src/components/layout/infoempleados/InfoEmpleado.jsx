import styles from "./infoempleado.module.css";
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
const InfoEmpleado = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
        <h1>Info empleados :D</h1>
      </div>
    </div>
  );
};

export default InfoEmpleado;
