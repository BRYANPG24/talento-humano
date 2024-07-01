import styles from './areaSocial.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
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
import logo from "../../../assets/logo.png";
import { useToast } from "../../../hooks/useToast";
const AreaSocial = () => {
  const [descuento, setDescuento] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSetDescuento = () => {
    Swal.fire({
      title: "Agrega un descuento",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof result.value == "string" && isNaN(result.value)) {
          toast("error", "El descuento debe ser un numero");
          return;
        }
        setDescuento(result.value);
        toast("success", "Descuento agregado correctamente");
      }
    })
  }
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
        <h1>Area Social</h1>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.card_content}>
              <h2>Noticias</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel porttitor nunc. Sed nec nunc ac nisi ultrices varius. Nullam
                nec dui nec nunc ac nisi ultrices varius. Nullam nec dui nec
                nunc ac nisi ultrices varius.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_content}>
              <h2>Eventos</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel porttitor nunc. Sed nec nunc ac nisi ultrices varius. Nullam
                nec dui nec nunc ac nisi ultrices varius. Nullam nec dui nec
                nunc ac nisi ultrices varius.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_content}>
              <h2>Actividades</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel porttitor nunc. Sed nec nunc ac nisi ultrices varius. Nullam
                nec dui nec nunc ac nisi ultrices varius. Nullam nec dui nec
                nunc ac nisi ultrices varius.
              </p>
            </div>
          </div>
          <div className={styles.calendar_container}>
            <h2>Calendario</h2>
            {/* Fecha de hoy usando Date de javasciprt */}
            <p><strong>Junio del 2023</strong></p>
            <div className={styles.calendar}>
              <div className={styles.calendar_day}>
                <p>1</p>
              </div>
              <div className={styles.calendar_day}>
                <p>2</p>
              </div>
              <div className={styles.calendar_day}>
                <p>3</p>
              </div>
              <div className={styles.calendar_day}>
                <p>4</p>
              </div>
              <div className={styles.calendar_day}>
                <p>5</p>
              </div>
              <div className={styles.calendar_day}>
                <p>6</p>
              </div>
              <div className={styles.calendar_day}>
                <p>7</p>
              </div>
              <div className={styles.calendar_day}>
                <p>8</p>
              </div>
              <div className={styles.calendar_day}>
                <p>9</p>
              </div>
              <div className={styles.calendar_day}>
                <p>10</p>
              </div>
              <div className={styles.calendar_day}>
                <p>11</p>
              </div>
              <div className={styles.calendar_day}>
                <p>12</p>
              </div>
              <div className={styles.calendar_day}>
                <p>13</p>
              </div>
              <div className={styles.calendar_day}>
                <p>14</p>
              </div>
              <div className={styles.calendar_day}>
                <p>15</p>
              </div>
              <div className={styles.calendar_day}>
                <p>16</p>
              </div>
              <div className={styles.calendar_day}>
                <p>17</p>
              </div>
              <div className={styles.calendar_day}>
                <p>18</p>
              </div>
              <div className={styles.calendar_day}>
                <p>19</p>
              </div>
              <div className={styles.calendar_day}>
                <p>20</p>
              </div>
              <div className={styles.calendar_day}>
                <p>21</p>
              </div>
              <div className={styles.calendar_day}>
                <p>22</p>
              </div>
              <div className={styles.calendar_day}>
                <p>23</p>
              </div>
              <div className={styles.calendar_day}>
                <p>24</p>
              </div>
              <div className={styles.calendar_day}>
                <p>25</p>
              </div>
              <div className={styles.calendar_day}>
                <p>26</p>
              </div>
              <div className={styles.calendar_day}>
                <p>27</p>
              </div>
              <div className={styles.calendar_day}>
                <p>28</p>
              </div>
              <div className={styles.calendar_day}>
                <p>29</p>
              </div>
              <div className={styles.calendar_day}>
                <p>30</p>
              </div>
              <div className={styles.calendar_day}>
                <p>31</p>
              </div>
            </div>
          </div>
          <div className={styles.desc_input}>
            <h2>Porcentaje de descuento para celebracion</h2>
            <div className={styles.input_box}>
              {descuento}
              <button className={styles.primary_btn} onClick={handleSetDescuento}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AreaSocial