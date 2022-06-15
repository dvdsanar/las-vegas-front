import "./ModifyUser.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CLOSE_POPUP, POPUP } from "../../store/types";

const ModifyUser = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    const userRes = await fetch(
      "https://las-vegas-roulette.herokuapp.com/users?id=" +
        localStorage.getItem("id"),
      {
        headers: { token: localStorage.getItem("token") },
        method: "GET",
      }
    );
    const dataUser = await userRes.json();
    setUsers(dataUser[0]);
  };
  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };

      console.log(params.id);
      const patchUser = await fetch(
        "https://las-vegas-roulette.herokuapp.com/users/" + params.id,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (patchUser) {
        dispatch(actionCreator(POPUP, "Has modificado a tus datos"));
        setTimeout(() => dispatch(actionCreator(CLOSE_POPUP)), 3000);
        setTimeout(() => navigate("/user"), 4000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div className="modificarUsuario">
      <h1 className="h1ModificarUsuario">Modifica tus datos</h1>
      <form onSubmit={(e) => formSubmit(e)} className="formpatchUsuarios">
        <label htmlFor="name" className="labelModificar">
          Modifica tu nombre {users.nombre}
        </label>
        <input
          className="inputModificarUsuario"
          type="text"
          id="name"
          name="name"
          defaultValue={users.name}
        />
        <label htmlFor="email" className="labelModificar">
          Modifica tu correo electronico
        </label>
        <input
          className="inputModificarUsuario"
          type="email"
          id="email"
          name="email"
          defaultValue={users.email}
        />
        <label htmlFor="password" className="labelModificar">
          Modifica tu contraseña
        </label>
        <input
          className="inputModificarUsuario"
          type="password"
          id="password"
          name="password"
          defaultValue={users.password}
        />
        <input type="submit" value="SEND" className="botonModificarUsuario" />
      </form>
    </div>
  );
};

export default ModifyUser;
