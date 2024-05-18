"use client";
import { useState, useEffect } from "react";
import {
  RemoveHero,
  getHeroTeams,
  removeHero,
  resetTeams,
} from "../../../utils/handleLocalStorage";
import FightGame from "@/components/FightGame";
import { Character } from "@/types/characters.type";
import { Trash } from "lucide-react";
import { Toaster, toast } from "sonner";

type Teams = {
  red: Character[];
  blue: Character[];
};

export default function Fight() {
  const [teams, setTeams] = useState<Teams | null>(null);
  const [rounds, setRounds] = useState<number | null>(null);
  const [startGame, setStartGame] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchedTeams = getHeroTeams();
      setTeams(fetchedTeams);
    }
  }, []);

  const startGameHandler = () => {
    if (rounds && rounds > 0) {
      setStartGame(true);
    } else {
      toast(
        "Selecione a mesma quantidade de personagens para os dois times(Mínimo: 1, Máximo: 5)."
      );
    }
  };

  useEffect(() => {
    if (teams) {
      if (teams.red.length === teams.blue.length) {
        setRounds(teams.red.length);
      } else {
        setRounds(null);
      }
    }
  }, [teams]);

  const handleCharacter = (id: number | null, team: "red" | "blue") => {
    if (id && team) {
      const removeCharacter: RemoveHero = { id, team };
      const removedHero = removeHero(removeCharacter);
      toast(removedHero);

      setTeams(getHeroTeams());
    }

    const updatedTeams = getHeroTeams();
    setTeams(updatedTeams);
  };

  const handleResetGame = () => {
    resetTeams();
    setTeams(getHeroTeams());
    setRounds(null);
    setStartGame(false);
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center flex-col text-light p-8">
      <Toaster />
      <div className="flex flex-col md:flex-row gap-8 p-2 justify-center">
        <div>
          {teams?.red.length != 0 && (
            <h2 className="text-primary text-2xl font-bold mb-2 text-center">
              Time Vermelho
            </h2>
          )}
          <ul className="flex justify-center">
            {teams?.red.map((character) => (
              <li
                key={character.id}
                className="border-4 border-solid border-primary h-32 relative"
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${character?.thumbnail?.path}/portrait_uncanny.${character?.thumbnail?.extension}`}
                  alt={character?.name}
                />
                {!startGame && (
                  <Trash
                    className="absolute top-0 right-0 cursor-pointer text-primary hover:bg-primary hover:text-light"
                    onClick={() =>
                      character.id && handleCharacter(character.id, "red")
                    }
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {teams?.blue.length != 0 && (
            <h2 className="text-secondary text-2xl font-bold mb-2 text-center">
              Time Azul
            </h2>
          )}
          <ul className="flex justify-center">
            {teams?.blue.map((character) => (
              <li
                key={character.id}
                className="border-4 border-solid border-secondary h-32 relative"
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${character?.thumbnail?.path}/portrait_uncanny.${character?.thumbnail?.extension}`}
                  alt={character?.name}
                />
                {!startGame && (
                  <Trash
                    className="absolute top-0 right-0 cursor-pointer text-primary hover:bg-primary hover:text-light"
                    onClick={() =>
                      character.id && handleCharacter(character.id, "blue")
                    }
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {startGame ? (
        <FightGame
          blueTeam={teams?.blue || []}
          redTeam={teams?.red || []}
          rounds={rounds || 0}
          onResetGame={handleResetGame}
        />
      ) : (
        <button
          onClick={startGameHandler}
          className="mt-4 bg-support text-light px-4 py-2 rounded"
        >
          Começar Jogo
        </button>
      )}
    </div>
  );
}
