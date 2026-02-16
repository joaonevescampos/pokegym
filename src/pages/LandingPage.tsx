import charizardImage from "../assets/charizard.png";
import ivysaurImage from "../assets/bulbasaur.png";
import bgPokeball from "../assets/pokeball-background.png";
import pokeball from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import token from "../assets/token.png";
import pokemonCover from "../assets/background-home.png";
import Button from "../components/Button";

const LandingPage = () => {
  return (
    <main className="relative flex flex-col justify-center items-center h-full text-white overflow-x-hidden">
      <section className="relative max-lg:flex-none flex items-center justify-center h-70 max-lg:h-130 w-full max-lg:overflow-hidden">
        <img
          src={pokemonCover}
          alt="pokeball"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
        />
        <img
          src={bgPokeball}
          alt="pokeball"
          className="absolute bottom-12 left-0 max-lg:w-52 z-10"
        />
        <img
          src={charizardImage}
          alt="charizard"
          className="absolute top-0 left-0 w-60 max-lg:w-50 z-10"
        />
        <img
          src={ivysaurImage}
          alt="ivysaur"
          className="absolute bottom-0 max-lg:top-85 -right-10 max-lg:-right-10 w-50 max-lg:w-50 z-50"
        />
        <div className="flex flex-col gap-8 items-center justify-center p-8 max-w-200 max-lg:max-w-100">
          <h1 className="text-5xl pt-8 font-extrabold">POKEGYM</h1>
          <p className="text-xl font-medium text-center">
            Se aventure nessa jornada! Seja produtivo e veja seus pokemons
            evoluirem junto com você.
          </p>
        </div>
      </section>
      <section className=" flex flex-col gap-8 items-center py-12 max-lg:px-4 h-full w-full z-0">
        <h2 className="text-xl font-bold">Como jogar?</h2>
        <div className="flex flex-col gap-4 max-w-200 text-sm">
          <p>
            1 - Inicialmente você escolhe um pokemon para compor seu time
            inicial.
          </p>

          <p>
            2 - Crie sua lista de tarefas do dia e conclua cada uma delas para
            treinar seu pokémon e ganhar recomepensas.
          </p>

          <p>
            3 - Após concluir todas tarefas do dia, seu pokémon escolhido vai
            ficar mais forte ganhar HP e você ganha XP. Assim, ele vai subindo
            de level e com o tempo podem evoluir para sua segunda e terceira
            forma.
          </p>

          <p>
            4 - Depois de evoluir seu pokemon, você receberá 3 pokebolas para
            capturar até 3 novos pokémons. Para capturar um novo pokémon você
            deve ganhar uma batalha contra ele. São 4 níveis de batalha a
            depender a força do pokémon. Caso não consiga ganhar, você pode
            continuar treinando seu pokémon até receber mais pokebolas para
            tentar novamente.
          </p>

          <p>
            Dica: pokémon num nível mais alto batalhando e ter mais pokemons
            capturados, tem mais chances de ganhar as batalhas! Além disso, você
            pode capturar pokemons mais fracos selecionando o filtro - fácil.
          </p>
        </div>
        <h2 className="text-xl font-bold text-center">
          Onde encontrar, para que serve e onde usar itens?
        </h2>
        <div className="flex flex-col gap-4 max-w-200 text-sm bg-linear-to-br from-blue-900 to-purple-600 p-4 rounded-2xl">
          <strong>
            Existem 3 itens no jogo: pokebolas, energias e diamantes.
          </strong>

          <div className="flex gap-4 ">
            <img
              src={pokeball}
              alt="pokeball"
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col gap-2">
              <p>
                <strong>Para que servem?</strong> Capturar pokémons.
              </p>
              <p>
                <strong>Como consigo?</strong> Treinando pokémons.
              </p>
              <p>
                <strong>Como usar?</strong> Quando tiver pelo menos uma
                pokebola, você poderá batalhar contra um pokémon a sua escolha e
                poderá capturá-lo.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img
              src={energy}
              alt="energia"
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col gap-2">
              <p>
                <strong>Para que servem?</strong> Curar pokémons ou trocar por
                pokebola ou diamante.
              </p>
              <p>
                <strong>Como consigo?</strong> Capturando pokémons.
              </p>
              <p>
                <strong>Como usar?</strong> Ao treinar um pokémon, ele
                automaticamente entra em estado e exaustão. Você pode usar uma
                energia para revigorá-lo. Você pode ir na "loja" para trocá-los.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img
              src={diamond}
              alt="diamond"
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col gap-2">
              <p>
                <strong>Para que servem?</strong> Invocar pokemons especiais.
              </p>
              <p>
                <strong>Como consigo?</strong> Treinando um pokémon até o nível
                máximo: 10.
              </p>
              <p>
                <strong>Como usar?</strong> Em "pokemons especiais" você pode
                usar diamantes para invocá-los e usar suas habilidades.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img src={token} alt="diamond" className="w-16 h-16 object-cover" />
            <div className="flex flex-col gap-2">
              <p>
                <strong>Para que servem?</strong> Batalhar na Liga pokémon.
              </p>
              <p>
                <strong>Como consigo?</strong> Treinando um pokémon. Aumentar de
                level, evoluir e chegar no nível máximo ganha mais fichas de
                batalha.
              </p>
              <p>
                <strong>Como usar?</strong> Em "Liga Pokémon" você usa fichas de
                batalha para competir.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-200 text-sm">
          <h2 className="text-xl font-bold text-center">
            Como treino meus pokémons?
          </h2>
          <p>
            Acesse "Meus pokemons", escolha um pokémon, crie seu checklist em
            marque todos como concluido. Irá aparecer um botão verde para
            finalizar o treinamento. Logo após, você ganha XP e HP e seu pokémon
            dormirá.
          </p>
          <p>
            <strong>XP</strong> - É a experiência que você jogador ganha ao
            treinar um pokémon. Quando seu pokémon muda de level, evolui ou
            chega no level máximo você ganha muito mais XP: 10, 30 e 100,
            respectivamente!
          </p>
          <p>
            <strong>HP</strong> - É a força que seu pokémon ganhar ao ser
            treinado. Quanto mais HP tiver, mais facilmente ganhará as batalhas
            de captura.
          </p>
        </div>
        <h2 className="text-xl font-bold">Como funcionam as batalhas?</h2>
        <div className="flex flex-col gap-4 max-w-200 text-sm bg-linear-to-br from-blue-900 to-purple-600 p-4 rounded-2xl">
          <strong>Existem 2 modos de batalha no jogo:</strong>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Contra equipe Rocket</h3>
            <p>
              Você pode batalhar contra a equipe Rocket com o objetivo de
              conseguir energia ou pokébola.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Contra um pokémon</h3>
            <p>
              Em "Capturar pokémon", você pode batalhar contra um pokémon para
              capturá-lo. Você ganha energia toda vez que captura um pokémon
              proporcionalmente ao seu nível de dificuldade:
            </p>
            <ul className="flex flex-col gap-2 font-bold items-center py-4">
              <li className="text-green-400">fácil: 1 energia;</li>
              <li className="text-yellow-400">médio: 3 energias;</li>
              <li className="text-red-300">difícil: 10 energias;</li>
              <li className="text-purple-300"> insano: 50 energias </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Liga Pokémon</h3>
            <p>
              Em "Liga Pokémon", você pode usar fichas de batalha para ganhar
              recompensas ao batalhar contra um treinador. Cada treinador tem um
              nível de dificuldade de batalha. Quanto mais difícil, mais
              recompensas pode ganhar!
            </p>
            <p>
              Você só pode batalhar, se tiver fichas o suficiente e pelo menos 5
              pokémons capturados. Cada treinador é liberado a medida que vai
              aumentando sua experiência no jogo - XP.
            </p>
          </div>
        </div>
        <h3 className="text-center font-bold text-xl">
          Para que servem os pokémons especiais?
        </h3>
        <p>
          Os pokémons especiais não são treináveis nem capturáveis, eles são
          invocados para que possa usar suas habilidades.
        </p>
        <p>
          Existem 3 pokémons: Snorlax, Victini e Celebi com suas respectivas
          habilidades: bloco de notas, sorteio e pomodoro
        </p>
        <p className="font-bold text-center">
          Mais dúvidas? Que tal ir jogando e aprendendo na prática? Vamos lá!
          Clique em "Começar"
        </p>
        <Button text="Começar" path="/set-informations" />
      </section>
    </main>
  );
};

export default LandingPage;
