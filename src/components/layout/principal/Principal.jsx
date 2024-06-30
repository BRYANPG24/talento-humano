import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import styles from "./principal.module.css";
import imgSlidre1 from "../../../assets/slider1.jpg";
import imgSlidre2 from "../../../assets/slider2.jpg";

const Principal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    Swal.fire({
      title: "Iniciar Sesion",
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Correo electronico" required>
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña" required>
      `,
      showCancelButton: true,
      confirmButtonText: "Iniciar Sesion",
      preConfirm: () => {
        return {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        };
      },
    }).then((result) => {
      console.log(result.value.email, result.value.password);
      const dataLocal = JSON.parse(localStorage.getItem("users"));
      const user = dataLocal.find((user) => user.email === result.value.email);
      if (user) {
        if (user.password === result.value.password) {
          toast("success", "Bienvenido", false);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard");
        } else {
          toast("error", "Contraseña incorrecta", false);
        }
      } else {
        toast("error", "Usuario no encontrado", false);
      }
    });
      
  };

  
  return (
    <div className={styles.body}>
      <header>
        <div>
          <h1>Talento humano</h1>
        </div>
        <div>
          <button className={styles.primary_btn} onClick={handleLogin}>
            Iniciar Sesion
          </button>
        </div>
      </header>
      <main>
        <div className={styles.slider}>
          <div className={styles.slide}>
            <img src={imgSlidre1} />
            <div className={styles.overlay}></div>
            <div className={styles.info}>
              <div className={styles.box}>
                <h3>Misión</h3>
                <p>
                  Nuestra misión es potenciar el talento humano para alcanzar su
                  máximo potencial.
                </p>
              </div>
              <div className={styles.box}>
                <h3>Visión</h3>
                <p>
                  Ser líderes en el desarrollo del talento humano a nivel
                  mundial.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.slide}>
            <img src={imgSlidre2} alt="Slide 2" />
            <div className={styles.overlay}></div>
            <div className={styles.info}>
              <div className={styles.box}>
                <h3>Valores</h3>
                <p>
                  Integridad, compromiso y excelencia en todo lo que hacemos.
                </p>
              </div>
              <div className={styles.box}>
                <h3>Objetivos</h3>
                <p>Fomentar un ambiente de trabajo inclusivo y colaborativo.</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="slider">
          <div className="slide" id="slide-1">
            <div className="card">
              <h3>Mision</h3>
              <p>
                Nuestra misión es potenciar el talento humano para alcanzar su
                máximo potencial.
              </p>
            </div>
            <div className="card">
              <h3>Vision</h3>
              <p>Ser lideres de desarrollo humano a nivel nacial</p>
            </div>
          </div>
          <div className="slide" id="slide-2">
            <div className="card">
              <h3>Valores</h3>
              <ul>
                <li>Respeto</li>
                <li>Responsabilidad</li>
                <li>Compromiso</li>
                <li>Integridad</li>
                <li>Trabajo en equipo</li>
              </ul>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Principal;
