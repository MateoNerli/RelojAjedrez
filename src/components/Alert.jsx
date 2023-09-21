import { useState, useEffect } from "react";

const Alert = ({ message, duration, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return show ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
      <div className="bg-green-500 text-white p-2.5 rounded-md">{message}</div>
    </div>
  ) : null;
};

export default Alert;
