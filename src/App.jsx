import { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/Clock.jsx";
import Modal from "./components/Modal.jsx";

function App() {
  const [timeControl, setTimeControl] = useState(300);
  const [increment, setIncrement] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [player1Name, setPlayer1Name] = useState("Jugador 1");
  const [player2Name, setPlayer2Name] = useState("Jugador 2");

  //Abrir y cerrar la modal
  useEffect(() => {
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal_oculta");

    if (isModalOpen) {
      modal.classList.add("modal_open");
      modalOverlay.classList.add("modal_activa");
    } else {
      modal.classList.remove("modal_open");
      modalOverlay.classList.remove("modal_activa");
    }
  });

  const modalState = (bool) => {
    if (!bool) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const modificarTimers = (timerModal, incrementModal) => {
    setTimeControl(Number(timerModal));
    setIncrement(Number(incrementModal));
  };

  const ModificarNombre = (nombre1, nombre2) => {
    setPlayer1Name(nombre1);
    setPlayer2Name(nombre2);
  };
  console.log("player1Name:", player1Name);
  console.log("player2Name:", player2Name);

  return (
    <div className="App">
      <Modal
        modalState={modalState}
        modificarTimers={modificarTimers}
        isOpen={isModalOpen}
        ModificarNombre={ModificarNombre}
        player1Name={player1Name}
        player2Name={player2Name}
      />

      <div id="main">
        <Clock
          timeControl={timeControl}
          increment={increment}
          player1Name={player1Name}
          player2Name={player2Name}
        />
      </div>
    </div>
  );
}

export default App;
