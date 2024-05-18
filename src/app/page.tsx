import Link from "next/link";
import Image from "next/image";
import Logo from "/public/static/icon.svg";

export default function Home() {
  return (
    <main className="bg-secondary flex flex-col items-center justify-center px-8 text-light lg:flex-row lg:justify-around">
      <div className="flex flex-col items-start justify-center min-h-screen p-12 lg:p-24">
        <Image
          src={Logo}
          width={50}
          height={50}
          alt="Imaginando Histórias"
          className="mb-4"
        />
        <div className="flex flex-col items-start">
          <h1 className="text-5xl font-bold leading-relaxed">
            Imaginando Histórias
          </h1>
          <h2 className="mt-4">
            O que é a nossa criança interior? A “criança interior” se refere à
            soma de todas as experiências e memórias que acumulamos durante
            nossa infância
          </h2>
          <div className="my-12 py-4">
            <Link href="/characters" legacyBehavior>
              <a className="bg-gradient-to-r from-primary via-secondary to-support hover:from-support hover:to-primary hover:via-secondary transition-transform ease-in-out duration-500 p-4 transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none inline-block text-center">
                Procurar Personagens
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-lg p-8 bg-primary rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-light mb-4">Como Jogar:</h1>
        <p className="text-base font-semibold leading-relaxed text-center mb-6">
          1. Escolha de um a cinco personagens para cada time, seja azul ou
          vermelho (quantidades iguais).
          <br />
          2. Compare seu time com um amigo com base nas histórias dos
          personagens.
          <br />
          3. Descubra quem será o campeão!
        </p>
        <h2 className="text-3xl font-bold text-light mb-2">Regras:</h2>
        <p className="text-base font-semibold leading-relaxed text-center mb-6">
          1. Cada herói só pode enfrentar um oponente.
          <br />
          2. Divirta-se!
        </p>
        <p className="text-base font-semibold text-center">
          Este jogo é uma oportunidade para exercitar a imaginação e desfrutar
          de discussões animadas sobre os personagens da Marvel.
        </p>
      </div>
    </main>
  );
}
