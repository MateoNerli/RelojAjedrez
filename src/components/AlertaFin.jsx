import "./fin.css";

const AlertaFin = ({ winner, onRestartGame }) => {
  return (
    <div className="game-result  flex flex-col bg-black rounded-3xl">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="text-lg font-medium tracking-tighter text-white lg:text-3xl">
              {winner === "Jug1" ? "¡Perdiste Jug1!" : "¡Perdiste Jug2!"}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8">
        <a
          aria-describedby="tier-starter"
          className="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white"
          href="#"
        >
          <button onClick={onRestartGame}>Volver a Jugar</button>
        </a>
      </div>
    </div>
  );
};

export default AlertaFin;
