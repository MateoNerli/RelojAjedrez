import { useState, useEffect, useRef } from "react";
import Controls from "./Controls";
import "./Clock.css";
import Alert from "./Alert";
import AlertaFin from "./AlertaFin";

function Clock(props) {
  //Estado de como va a empezar el juego
  const [state, setState] = useState({
    gameStarted: false,
    gameFinished: false,
    paused: false,
    Jug1: props.timeControl,
    Jug2: props.timeControl,
    increment: props.increment,
    toPlay: "Jug1",
    turn: 1,
  });
  const { player1Name, player2Name } = props;
  const [clocksDisabled, setClocksDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //Para saber los movimentos de los jugadores
  const [moves, setMoves] = useState({
    Jug1: 0,

    Jug2: 0,
  });

  //Referencias para los intervalos para el reloj
  const runJug2Ref = useRef(null);
  const runJug1Ref = useRef(null);

  //Cuando el juego termina se limpian los intervalos
  useEffect(() => {
    if (state.Jug1 === 0 || state.Jug2 === 0) {
      clearInterval(runJug2Ref.current);
      clearInterval(runJug1Ref.current);
      setState((prevState) => ({
        ...prevState,
        gameFinished: true,
      }));
    }
  }, [state.Jug1, state.Jug2]);

  //Cuando se cambia el tiempo o el incremento se resetea el juego
  useEffect(() => {
    if (props.timeControl !== state.Jug2) {
      setState((prevState) => ({
        ...prevState,
        Jug2: props.timeControl,
        Jug1: props.timeControl,
      }));
      resetTimer();
    }
  }, [props.timeControl, props.increment]);

  //Funciones para el reloj de los jugadores que dismiuya el tiempo
  const tickJug2Clock = () => {
    if (state.Jug1 > 0) {
      setState((prevState) => ({
        ...prevState,
        Jug1: prevState.Jug1 - 1,
      }));
    }
  };

  const tickJug1Clock = () => {
    if (state.Jug2 > 0) {
      setState((prevState) => ({
        ...prevState,
        Jug2: prevState.Jug2 - 1,
      }));
    }
  };

  //Funciones para el reloj de reinicar el juego y setear el estado
  const resetTimer = () => {
    clearInterval(runJug1Ref.current);
    clearInterval(runJug2Ref.current);
    setState((prevState) => ({
      ...prevState,
      gameStarted: false,
      gameFinished: false,
      Jug1: props.timeControl,
      Jug2: props.timeControl,
      increment: props.increment,
      toPlay: "Jug1",
      turn: 1,
      paused: false,
    }));
    setMoves({
      Jug1: 0,
      Jug2: 0,
    });
  };

  //Funcion para pausar el juego y luego se pueda reanudar
  const togglePause = () => {
    if (!state.gameStarted) return;

    if (!state.paused) {
      clearInterval(runJug2Ref.current);
      clearInterval(runJug1Ref.current);
      setClocksDisabled(true);
    } else {
      state.toPlay === "Jug1"
        ? (runJug2Ref.current = setInterval(tickJug1Clock, 1000))
        : (runJug1Ref.current = setInterval(tickJug2Clock, 1000));
      setClocksDisabled(false);
    }

    setState((prevState) => ({
      ...prevState,
      paused: !prevState.paused,
    }));
  };

  //Funcion para pasar el turno
  const passTurn = () => {
    const { gameStarted, toPlay } = state;

    if (!gameStarted) {
      setState((prevState) => ({
        ...prevState,
        gameStarted: true,
        toPlay: "Jug2",
        paused: false,
      }));

      runJug1Ref.current = setInterval(tickJug2Clock, 1000);
    } else if (toPlay === "Jug1") {
      setState((prevState) => ({
        ...prevState,
        toPlay: "Jug2",
        Jug2: prevState.Jug2 + prevState.increment,
        paused: false,
      }));

      setMoves((prevMoves) => ({
        ...prevMoves,
        Jug1: prevMoves.Jug1 + 1,
      }));

      runJug1Ref.current = setInterval(tickJug2Clock, 1000);
      clearInterval(runJug2Ref.current);
    } else {
      setState((prevState) => ({
        ...prevState,
        toPlay: "Jug1",
        Jug1: prevState.Jug1 + prevState.increment,
        turn: prevState.turn + 1,
        paused: false,
      }));

      setMoves((prevMoves) => ({
        ...prevMoves,
        Jug2: prevMoves.Jug2 + 1,
      }));

      runJug2Ref.current = setInterval(tickJug1Clock, 1000);
      clearInterval(runJug1Ref.current);
    }
  };

  //Funcion para darle formato al tiempo
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  //Funcion para abrir el modal
  const openModal = () => {
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal_oculta");
    modal.classList.add("modal_open");
    modalOverlay.classList.add("modal_activa");
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const resetGame = () => {
    resetTimer();
    setShowAlert(false); // Close the alert
  };

  useEffect(() => {
    if (state.gameStarted) {
      setShowAlert(true);
    }
  }, [state.gameStarted]);

  //quiero mostrar los nombres de los jugadores
  useEffect(() => {}, [props.player1Name, props.player2Name]);

  console.log(props.player1Name);
  return (
    <div key={props.timeControl}>
      <div className="clock">
        <div className="clock-container">
          <div
            className={`jug flex justify-center items-center ${
              state.toPlay === "Jug1"
                ? clocksDisabled
                  ? "pointer-events-none bg-gray-300"
                  : "pointer-events-auto bg-blue-600"
                : "pointer-events-none bg-gray-300"
            }`}
            onClick={passTurn}
          >
            <div className="flex flex-col justify-center items-center full-height">
              <p className="transform rotate-180">{player1Name}</p>
              <p className="transform rotate-180">Movimientos: {moves.Jug1}</p>
              <h1 className="font-serif text-3xl font-semibold tabular-nums transform rotate-180">
                {formatTime(state.Jug2)}
              </h1>
            </div>
          </div>
        </div>
        <Controls
          className="cont"
          onOpenModal={openModal}
          onPauseResume={togglePause}
          onResetTimer={resetTimer}
        />
        <div className="clock-container">
          <div
            className={`jug flex justify-center items-center ${
              state.toPlay === "Jug2"
                ? clocksDisabled
                  ? "pointer-events-none bg-gray-300"
                  : "pointer-events-auto bg-blue-600"
                : "pointer-events-none bg-gray-300"
            }`}
            onClick={passTurn}
          >
            <div className="flex flex-col justify-center items-center full-height">
              <h1 className="font-serif flex justify-center items-center text-3xl font-semibold tabular-nums">
                {formatTime(state.Jug1)}
              </h1>
              <p className="">Movimientos: {moves.Jug2}</p>
              <p className="">{player2Name}</p>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert
          message="¡El juego ha comenzado!"
          duration={1000}
          onClose={handleAlertClose}
        />
      )}

      {state.gameFinished && (
        <AlertaFin
          winner={state.Jug1 === 0 ? player2Name : player1Name}
          onRestartGame={resetGame}
        />
      )}
    </div>
  );
}

export default Clock;
