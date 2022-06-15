import "./AddCard.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CLOSE_POPUP, POPUP } from "../../store/types";

const AddCard = () => {
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
        card: e.target[0].value,
      };

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
        dispatch(actionCreator(POPUP, "Has añadido una tarjeta nueva"));
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
        <label htmlFor="card" className="labelModificar">
          Añade o modifica tu tarjeta
        </label>
        <input
          className="inputModificarUsuario"
          type="text"
          id="card"
          name="card"
          defaultValue={users.card}
        />
        <input type="submit" value="SEND" className="botonModificarUsuario" />
      </form>
    </div>
  );
};

export default AddCard;
