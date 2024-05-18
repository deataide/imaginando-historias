import { Character } from "@/types/characters.type";
import Link from "next/link";
import { setHeroOnLocalStorage } from "../utils/handleLocalStorage";
import { Toaster, toast } from "sonner";

interface Props {
  character?: Character;
}

export default function CharacterCard({ character }: Props) {

  const handleBlueTeam = (character: Character) => {
    const setHeroReturn = setHeroOnLocalStorage({ character, team: "blue" });
    toast(setHeroReturn);
  };
  
  const handleRedTeam = (character: Character) => {
    const setHeroReturn = setHeroOnLocalStorage({ character, team: "red" });
    toast(setHeroReturn);
  };

  return (
    <div className="max-w-xs min-w-[200px] md:min-w-[250px] lg:min-w-[300px] rounded-2xl overflow-hidden shadow-xl bg-light h-full flex flex-col">
      <Toaster />
      <img
        className="w-full h-5/6 object-cover"
        src={`${character?.thumbnail?.path}/portrait_uncanny.${character?.thumbnail?.extension}`}
        alt={character?.name}
      />
      <div className="px-6 py-4 text-dark flex-1 flex flex-col justify-between">
        <div>
          <div className="font-bold text-xl mb-2 overflow-x-hidden text-nowrap">
            {character?.name}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Comics: {character?.comics?.available}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Series: {character?.series?.available}
            </span>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-4 items-center text-light font-bold">
          {character && (
            <button
              className="bg-secondary p-4 rounded-xl hover:bg-blue-900 w-full max-w-72"
              onClick={() => handleBlueTeam(character)}
            >
              Adicionar ao Time Azul
            </button>
          )}
          {character && (
            <button
              className="bg-primary p-4 rounded-xl hover:bg-red-900 w-full max-w-72"
              onClick={() => handleRedTeam(character)}
            >
              Adicionar ao Time Vermelho
            </button>
          )}

          <Link href={`characters/${character?.id}`} legacyBehavior>
            <a className="p-4 max-w-72 justify-center bg-support hover:bg-cyan-400 w-full rounded-lg">
              Ver mais
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
