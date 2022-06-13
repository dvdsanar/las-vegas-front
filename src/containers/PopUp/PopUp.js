import { useDispatch, useSelector } from "react-redux";
import "./PopUp.css";

const PopUp = () => {
  const popupState = useSelector((state) => state.popup);

  return (
    <div>
      {popupState.visibility && (
        <div className="popup">
          <p>{popupState.text}</p>
        </div>
      )}
    </div>
  );
};

export default PopUp;
