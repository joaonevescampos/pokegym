import { useEffect, useState } from "react";
import battleBack from "../assets/battle-background.png";

const BattleIntro = () => {
  const [isPreparing, setIsPreparing] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPreparing(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart(true);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!start && (
        <div className="absolute top-0 left-0 w-full h-full bg-black z-20">
          <img
            src={battleBack}
            alt="battle"
            className="absolute top-0 left-0 w-full h-full opacity-20 z-30 object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-1/2 text-white font-bold text-4xl">
            {isPreparing ? (
              <h2 className="animate-decreasing opacity-0">PREPARAR!</h2>
            ) : (
              <h2 className={!isPreparing && "animate-growing opacity-0"}>BATALHAR!</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BattleIntro;
