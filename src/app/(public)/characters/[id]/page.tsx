import { Character } from "@/types/characters.type";
import { detailCharacter } from "@/utils/api";

interface CharacterPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = params;

  let character;
  try {
    const response = await detailCharacter(id);
    character = response.results[0];
  } catch (error) {
    console.error("Failed to fetch character details:", error);
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        Erro Ao Carregar Detalhes
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        Personagem Não Encontrado
      </div>
    );
  }

  const { thumbnail, name, description }: Character = character;

  return (
    <div className="bg-slate-200 flex items-center justify-center min-h-screen">
      <div className="flex flex-col lg:flex-row border-solid border-8 border-primary bg-slate-100 shadow-2xl">
        <div className="lg:w-2/5 w-full">
          <img
            width={400}
            height={400}
            className="w-full"
            src={`${thumbnail?.path}/portrait_uncanny.${thumbnail?.extension}`}
            alt={name}
          />
        </div>
        <div className="max-w-4xl mx-auto lg:w-3/5 p-8 text-left">
          <h1 className="text-3xl font-bold mb-4 text-dark">{name}</h1>
          <p className="text-sm text-dark">
            {description || "Descrição não disponível"}
          </p>
        </div>
      </div>
    </div>
  );
}
