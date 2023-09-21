import { useState } from "react";
import { FaRedo, FaCog, FaPause, FaPlay } from "react-icons/fa";

function Controls({ onOpenModal, onPauseResume, onResetTimer }) {
  const [isPaused, setIsPaused] = useState(false);

  const handlePauseResumeClick = () => {
    setIsPaused((prevState) => !prevState);
    onPauseResume();
  };
  return (
    <div className="controles flex justify-center items-center">
      <div className="btn  m-2 border border-black center rounded-lg justify-center items-center">
        <button onClick={onOpenModal}>
          <FaCog className="m-2 inline" />
        </button>
      </div>
      <div className="btn m-2 border border-black rounded-lg">
        <button onClick={handlePauseResumeClick}>
          {isPaused ? (
            <FaPlay className="m-2 inline" />
          ) : (
            <FaPause className="m-2 inline" />
          )}
        </button>
      </div>
      <div className="btn m-2 border border-black rounded-lg">
        <button onClick={onResetTimer}>
          <FaRedo className="m-2 inline" />
        </button>
      </div>
    </div>
  );
}

export default Controls;
