import "./User.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
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
    setUsers(dataUser);
  };
  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div>
            <p> Nombre: {user.name}</p>
            <p> email: {user.email}</p>
            <p> Tarjeta: {user.card}</p>
            <p>
              {" "}
              Saldo: {user.balance}{" "}
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={() => navigate("/addBalance/" + user._id)}
              >
                Añadir Saldo
              </button>
            </p>
            <div className="botonesOpciones">
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={() => navigate("/modifyUser/" + user._id)}
              >
                Modificar datos
              </button>
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={() => navigate("/addCard/" + user._id)}
              >
                Añadir Tarjeta
              </button>
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={
                  () => navigate("/play/" + user._id) /*modicar back para esto*/
                }
              >
                Jugar
              </button>
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={() => navigate("/userGames/" + user._id)}
              >
                Historial de Partidas
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
