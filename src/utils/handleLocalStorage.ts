import { Character } from "@/types/characters.type";

type Team = {
  red: Character[];
  blue: Character[];
};

type CharacterData = {
  character: Character;
  team: "red" | "blue";
};

export type RemoveHero = {
  id: number;
  team: "red" | "blue";
};

const MAX_TEAM_SIZE = 5;

const getTeamKey = (team: "red" | "blue") =>
  team === "blue" ? "blue-team" : "red-team";

export const setHeroOnLocalStorage = (
  character: CharacterData
): string | null => {
  const teamKey = getTeamKey(character.team);
  const teamString = localStorage.getItem(teamKey);
  const team: Character[] = teamString ? JSON.parse(teamString) : [];


  if (team.length >= MAX_TEAM_SIZE) {
    return `The ${character.team} team already full`;
  }

  const isDuplicate = team.some(
    (teamCharacter) => teamCharacter.id === character.character.id
  );

  if (isDuplicate) {
    return `Character with id ${character.character.name} is already in the ${character.team} team`;
  }

  team.push(character.character);
  localStorage.setItem(teamKey, JSON.stringify(team));
  return `Added to the ${character.team} team`;
};

export const removeHero = (heroToRemove: RemoveHero): string | null => {
  const teamKey = getTeamKey(heroToRemove.team);
  const teamString = localStorage.getItem(teamKey);

  if (teamString) {
    let team: Character[] = JSON.parse(teamString);
    team = team.filter((hero) => hero.id !== heroToRemove.id);
    localStorage.setItem(teamKey, JSON.stringify(team));

    return "Personagem Removido";
  }

  return "Personagem Não Encontrado";
};

export const getHeroTeams = (): Team => {
  const redTeamString = localStorage.getItem("red-team");
  const blueTeamString = localStorage.getItem("blue-team");

  const redTeam: Character[] = redTeamString ? JSON.parse(redTeamString) : [];
  const blueTeam: Character[] = blueTeamString
    ? JSON.parse(blueTeamString)
    : [];

  return { red: redTeam, blue: blueTeam };
};

export const resetTeams = () => {
  localStorage.removeItem("red-team");
  localStorage.removeItem("blue-team");
  return "Times Resetados";
};
