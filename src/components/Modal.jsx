import { useState } from "react";
import "./Modal.css";

function Modal(props) {
  let [seconds, setSeconds] = useState(0);
  let [increment, setIncrement] = useState(0);
  let [isDisabled, setIsDisabled] = useState(true);

  //Funcion para cerrar el modal
  const closeModal = () => {
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal_oculta");

    modal.classList.remove("modal__is-open");
    modalOverlay.classList.remove("modal_activa");
    props.modalState(false);
  };

  //Funcion para guardar el tiempo
  const customTimer = () => {
    props.modificarTimers(seconds, increment);
    closeModal();
    setIsDisabled(true);
    document.querySelector(".modal-timer-input input").value = "";
    document.querySelector(".modal-increment-input input").value = "";
  };

  // Función para filtrar el input del timer que sea solo números y tenga ':' en el medio
  const filterTimer = (e) => {
    const timerInput = document.querySelector(".modal-timer-input input");
    const inputValue = timerInput.value;

    // Si el evento es 'input' o 'paste', verifica el contenido actual del input
    if (e.type === "input" || e.type === "paste") {
      if (!/^(\d{0,2}:\d{0,2}|\d{0,2})$/.test(inputValue)) {
        timerInput.value = inputValue.replace(/[^0-9:]/g, "");
      }
      return;
    }

    // Si el evento es una pulsación de tecla
    if (!/[0-9]/.test(Number(e.key)) || e.key === " ") {
      e.preventDefault();
      return false;
    }

    let value = inputValue;
    if (inputValue.length === 2) {
      value = inputValue + ":";
    }

    timerInput.value = value;
  };

  // Función para manejar el input del timer
  const handleInputChange = (e) => {
    let value = e.target.value;

    if (value.length !== 5) {
      setIsDisabled(true);
      return;
    }

    let min = value.slice(0, 2);
    let sec = value.slice(3, 5);
    let total = Number(min) * 60 + Number(sec);

    setSeconds(total);
    setIsDisabled(false);
  };

  // Función para filtrar el input del incremento que sea solo números
  const filterIncrement = (e) => {
    const incrementInput = document.querySelector(
      ".modal-increment-input input"
    );
    const inputValue = incrementInput.value;

    // Si el evento es 'input' o 'paste', verifica el contenido actual del input
    if (e.type === "input" || e.type === "paste") {
      incrementInput.value = inputValue.replace(/\D/g, "");
      return;
    }

    // Si el evento es una pulsación de tecla
    if (!/[0-9]/.test(Number(e.key)) || e.key === " ") {
      e.preventDefault();
      return false;
    }

    let value = inputValue;
    incrementInput.value = value;
  };

  return (
    <div className="modal_oculta w-full h-full flex justify-center items-center">
      <div className="modal fixed max-w-7xl w-4/5 max-h-full h-3/4 bg-white rounded-xl p-5">
        <h1 className="justify-center text-center items-center text-3xl font-bold text-blue-500">
          Configuración
        </h1>
        <h3 className="justify-center  text-center items-center text-xl font-normal text-grey-500">
          Tiempo de partida
        </h3>

        <div className="modal-content  h-3/5 relative flex flex-col justify-center items-center ">
          <div className="modal-timer-input p-4 my-0.5">
            <label className="text-lg flex align-center">Timer: </label>
            <input
              className="rounded-md  text-base bg-blue-50 text-black p-2.5"
              type="text"
              onChange={handleInputChange}
              onKeyPressCapture={filterTimer}
              placeholder="00:00"
              maxLength="5"
            />
          </div>
          <div className="modal-increment-input p-4 my-0.5">
            <label className="text-lg flex align-center">Incremento: </label>
            <input
              className="rounded-md  text-base bg-blue-50 text-black p-2.5"
              type="text"
              placeholder="00"
              maxLength="2"
              onKeyPressCapture={filterIncrement}
              onChange={(e) => {
                setIncrement(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="modal-actions cursor-pointer text-xl font-blod tracking-wider  p-3.5   w-full  h-20 border-t border-gray-200 flex align-center justify-between  ">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            id="modal-close-button "
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            id="modal-save-button"
            onClick={customTimer}
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
