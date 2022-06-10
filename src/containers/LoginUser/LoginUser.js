import { useNavigate } from "react-router-dom";
import "./LoginUser.css";
// import { Link } from "react-router-dom";
// import store from "../../store/store.js";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CLOSE_POPUP, USER_LOGGED, POPUP } from "../../store/types";

const LoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      const formData = {
        email: e.target[0].value,
        password: e.target[1].value,
      };

      let loginUser = await fetch(
        "https://las-vegas-roulette.herokuapp.com/users/login",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      loginUser = await loginUser.json();

      if (loginUser) {
        localStorage.setItem("token", loginUser.token);
        localStorage.setItem("id", loginUser.id);
        localStorage.setItem("rol", loginUser.rol);
        if (localStorage.getItem("rol") == "admin") {
          dispatch(actionCreator(USER_LOGGED));
          navigate("/allusers");
        } else {
          dispatch(actionCreator(USER_LOGGED));
          dispatch(
            actionCreator(POPUP, "Te has logeado correctamente. Bienvenido")
          );
          setTimeout(() => dispatch(actionCreator(CLOSE_POPUP)), 3000);
          navigate("/user");
        }
      } else {
        alert("Usuario y contraseña incorrecto. ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginUsuario">
      <h2 className="h2login">LOGIN DE USUARIO</h2>
      <form onSubmit={(e) => formSubmit(e)} className="formUsuario">
        <label className="labelUsuario" htmlFor="email">
          Email
        </label>
        <input className="inputUsuario" type="email" id="email" name="email" />
        <label className="labelUsuario" htmlFor="password">
          Contraseña
        </label>
        <input
          className="inputUsuario"
          type="password"
          id="password"
          name="password"
        />
        <input type="submit" value="Entrar" className="botonUsuario" />
      </form>
    </div>
  );
};

export default LoginUser;
