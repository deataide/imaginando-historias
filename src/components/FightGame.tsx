import { Character } from "@/types/characters.type";
import { useState, useEffect } from "react";

type FightInput = {
  redTeam: Character[];
  blueTeam: Character[];
  rounds: number;
  onResetGame: () => void;
};

type HandleFight = {
  team: "red" | "blue";
};

export default function FightGame({
  redTeam,
  blueTeam,
  rounds,
  onResetGame,
}: FightInput) {
  const [round, setRound] = useState<number>(1);
  const [winner, setWinner] = useState<string | null>(null);

  const [redIndex, setRedIndex] = useState(0);
  const [redPoints, setRedPoints] = useState(0);

  const [blueIndex, setBlueIndex] = useState(0);
  const [bluePoints, setBluePoints] = useState(0);

  useEffect(() => {
    if (round > rounds) {
      if (redPoints > bluePoints) {
        setWinner("Time Vermelho");
      } else if (bluePoints > redPoints) {
        setWinner("Time Azul");
      } else {
        setWinner("Empatou");
      }
    }
  }, [round]);

  const handleReset = () => {
    setRedIndex(0);
    setBlueIndex(0);
    setBluePoints(0);
    setRedPoints(0);
    setRound(1);
    setWinner(null);
  };

  const handleFight = ({ team }: HandleFight) => {
    if (round <= rounds) {
      if (team === "red") {
        setRedPoints((prevPoints) => prevPoints + 1);
      } else if (team === "blue") {
        setBluePoints((prevPoints) => prevPoints + 1);
      }

      setRedIndex((prevIndex) => prevIndex + 1);
      setBlueIndex((prevIndex) => prevIndex + 1);
      setRound((prevRound) => prevRound + 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg">
      {round <= rounds ? (
        <div className="flex flex-col md:flex-row md:justify-around w-full">
          <div
            className="flex flex-col items-center cursor-pointer mb-4 md:mb-0"
            onClick={() => handleFight({ team: "red" })}
          >
            <div className="relative w-48 h-64 md:w-72 md:h-96 overflow-hidden border-solid border-4 border-primary hover:border-8 transition-all duration-300">
              <img
                className="w-full h-full object-cover"
                src={`${redTeam[redIndex]?.thumbnail?.path}/portrait_uncanny.${redTeam[redIndex]?.thumbnail?.extension}`}
                alt={redTeam[redIndex]?.name}
              />
            </div>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleFight({ team: "blue" })}
          >
            <div className="relative w-48 h-64 md:w-72 md:h-96 overflow-hidden border-solid border-4 border-secondary hover:border-8 transition-all duration-300">
              <img
                className="w-full h-full object-cover"
                src={`${blueTeam[blueIndex]?.thumbnail?.path}/portrait_uncanny.${blueTeam[blueIndex]?.thumbnail?.extension}`}
                alt={blueTeam[blueIndex]?.name}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 flex flex-col">
          <h1 className=" font-bold text-dark mt-4 text-4xl">
            Vencedor: {winner}!
          </h1>
          <button
            onClick={handleReset}
            className="mt-4 bg-support hover:bg-cyan-500 text-light px-4 py-2 rounded"
          >
            Jogar Novamente
          </button>
          <button
            onClick={onResetGame}
            className="mt-4 bg-support hover:bg-cyan-500 text-light px-4 py-2 rounded"
          >
            Resetar Jogo
          </button>
        </div>
      )}
      <div className="text-center mt-4">
        <span className="text-4xl font-bold text-dark">
          Round {round > rounds ? rounds : round}
        </span>
      </div>
      <div className="flex justify-center mt-4 gap-8">
        <div className="border-4 border-solid border-red-800 h-20 w-20 md:h-32 md:w-32 bg-primary flex items-center justify-center text-4xl md:text-7xl">
          <span className="font-bold text-light">{redPoints}</span>
        </div>
        <div className="border-4 border-solid border-blue-800 h-20 w-20 md:h-32 md:w-32 bg-secondary flex items-center justify-center text-4xl md:text-7xl">
          <span className="font-bold text-light">{bluePoints}</span>
        </div>
      </div>
    </div>
  );
}
