import { useState } from "react";
import "./Modal.css";

function Modal(props) {
  let [seconds, setSeconds] = useState(0);
  let [increment, setIncrement] = useState(0);
  let [isDisabled, setIsDisabled] = useState(true);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  //Funcion para cerrar el modal
  const closeModal = () => {
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal_oculta");

    modal.classList.remove("modal__is-open");
    modalOverlay.classList.remove("modal_activa");
    props.modalState(false);
  };

  //Funcion para manejar el input del nombre del jugador 1
  const handlePlayer1NameChange = (e) => {
    setPlayer1Name(e.target.value);
  };

  //Funcion para manejar el input del nombre del jugador 2
  const handlePlayer2NameChange = (e) => {
    setPlayer2Name(e.target.value);
  };

  //Funcion para guardar el tiempo
  const customTimer = () => {
    props.modificarTimers(seconds, increment);
    props.ModificarNombre(player1Name, player2Name); // Actualiza los nombres en App
    closeModal();
    setIsDisabled(true);
    document.querySelector(".modal-timer-input input").value = "";
    document.querySelector(".modal-increment-input input").value = "";
  };

  // Función para filtrar el input del timer que sea solo números y tenga ':' en el medio
  const timerInput = document.querySelector(".modal-timer-input input");

  timerInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (!/^\d{0,2}(:\d{0,2})?$/.test(value)) {
      e.target.value = value.replace(/[^0-9:]/g, "");
      return;
    }

    if (value.length === 2 && !value.includes(":")) {
      e.target.value = value + ":";
    }
  });

  //Funcion para manejar el input del timer
  const handleInputChange = (e) => {
    let value = e.target.value;

    if (value.length !== 5) {
      setIsDisabled(true);
      return;
    }

    let min = value.slice(0, 2);
    let sec = value.slice(3, 6);
    let total = Number(min) * 60 + Number(sec);

    setSeconds(total);
    setIsDisabled(false);
  };

  //Funcion para filtrar el input del incremento que sea solo numeros
  const incrementInput = document.querySelector(".modal-increment-input input");

  incrementInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (!/^[0-9]*$/.test(value)) {
      e.target.value = value.replace(/[^0-9]/g, "");
      return;
    }
  });

  console.log(player1Name, player2Name);

  return (
    <div className="modal_oculta fixed inset-0 flex items-center justify-center w-full h-screen">
      <div className="modal max-w-7xl w-4/5 max-h-full bg-white rounded-xl p-5">
        <h1 className="justify-center text-center items-center text-3xl font-bold text-blue-500">
          Configuración
        </h1>
        <div className="modal-content relative p-2 flex flex-col justify-center items-center">
          <div className="modal-player-input my-0.5">
            <label className="text-lg flex align-center">
              Nombre del Jugador 1:
            </label>
            <input
              className="rounded-md text-base bg-blue-50 text-black p-2.5"
              type="text"
              placeholder="Nombre del Jugador 1"
              onChange={handlePlayer1NameChange}
              value={player1Name}
            />
          </div>
          <div className="modal-player-input  my-0.5">
            <label className="text-lg flex align-center">
              Nombre del Jugador 2:
            </label>
            <input
              className="rounded-md text-base bg-blue-50 text-black p-2.5"
              type="text"
              placeholder="Nombre del Jugador 2"
              onChange={handlePlayer2NameChange}
              value={player2Name}
            />
          </div>
        </div>
        <h3 className="justify-center  text-center items-center text-xl font-normal text-grey-500">
          Tiempo de partida
        </h3>
        <div className="modal-content  relative flex flex-col justify-center items-center ">
          <div className="modal-timer-input  my-0.5">
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
          <div className="modal-increment-input my-0.5">
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
