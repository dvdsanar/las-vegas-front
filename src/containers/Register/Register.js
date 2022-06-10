import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionCreator from "../../store/actionTypes";
import { CLOSE_POPUP, POPUP } from "../../store/types";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      const formData = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };

      const postUser = await fetch(
        "https://las-vegas-roulette.herokuapp.com/users",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newUser = await postUser.json();

      if (newUser) {
        dispatch(actionCreator(POPUP, "Usuario creado. Bienvenido"));
        setTimeout(() => dispatch(actionCreator(CLOSE_POPUP)), 3000);
        navigate("/login");
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };

  return (
    <div className="crearUsuario">
      <h2 className="h2registro">REGISTRO DE USUARIO</h2>
      <form onSubmit={(e) => formSubmit(e)} className="formCrearUsuario">
        <label className="labelCrearUsuario" htmlFor="name">
          Nombre
        </label>
        <input
          className="inputCrearUsuario"
          type="text"
          id="name"
          name="name"
        />
        <label className="labelCrearUsuario" htmlFor="email">
          Email
        </label>
        <input
          className="inputCrearUsuario"
          type="email"
          id="email"
          name="email"
          placeholder="ejemplo@dominio.com"
        />
        <label className="labelCrearUsuario" htmlFor="password">
          Contraseña
        </label>
        <input
          className="inputCrearUsuario"
          type="password"
          id="password"
          name="password"
        />
        <input className="buttonNewUser" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
