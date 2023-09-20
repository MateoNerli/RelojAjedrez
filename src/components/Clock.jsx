import { useState, useEffect, useRef } from "react";
import Controls from "./Controls";
import "./Clock.css";

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
    } else {
      state.toPlay === "Jug1"
        ? (runJug2Ref.current = setInterval(tickJug1Clock, 1000))
        : (runJug1Ref.current = setInterval(tickJug2Clock, 1000));
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

  return (
    <div key={props.timeControl}>
      <div className="clock ">
        <div
          className="w-screen jug flex justify-center items-center"
          onClick={passTurn}
          style={
            state.toPlay === "Jug1"
              ? { backgroundColor: "#006DF2" }
              : { background: "#797979" }
          }
        >
          <div className="">
            <h1 className="font-serif flex justify-center items-center text-3xl font-semibold tabular-nums  ">
              {formatTime(state.Jug2)}
            </h1>
            <p className="">Movimientos: {moves.Jug1}</p>
          </div>
        </div>
        <Controls
          className="cont"
          onOpenModal={openModal}
          onPauseResume={togglePause}
          onResetTimer={resetTimer}
        />
        <div
          className="w-screen jug flex justify-center items-center"
          onClick={passTurn}
          style={
            state.toPlay === "Jug2"
              ? { backgroundColor: "#006DF2" }
              : { background: "#797979" }
          }
        >
          <div className="">
            <h1 className="font-serif flex justify-center items-center text-3xl font-semibold tabular-nums  ">
              {formatTime(state.Jug1)}
            </h1>
            <p className="">Movimientos: {moves.Jug2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
