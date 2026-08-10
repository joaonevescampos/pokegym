import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import ChoosePokemon from "./pages/ChoosePokemon";
import MyPokemons from "./pages/MyPokemons";
import PokemonDetail from "./pages/PokemonDetail";
import ChoosePokemonBattle from "./pages/ChoosePokemonBattle";
import PokemonBattle from "./pages/PokemonBattle ";
import PokemonCataloge from "./pages/PokemonCataloge";
import PokemonEvolution from "./pages/PokemonEvolution";
import RocketTeamChoose from "./pages/RocketTeamChoose";
import RocketTeamBattle from "./pages/RocketTeamBattle";
import DashboardPage from "./pages/DashboardPage";
import SpecialPokemons from "./pages/SpecialPokemons";
import SetGameInfos from "./pages/SetGameInfos";
import Store from "./pages/Store";
import Seetings from "./pages/Seetings";
import SnorlaxNote from "./pages/SnorlaxNote";
import Pomodoro from "./pages/Pomodoro";
import ChoosePokemonLeague from "./pages/ChoosePokemonLeague";
import { PokemonLeague } from "./pages/PokemonLeague";
import PokemonBattleLeague from "./pages/PokemonBattleLeague";
import Roulette from "./pages/Roulette";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/choose-pokemon" element={<ChoosePokemon />} />
        <Route path="/my-pokemons" element={<MyPokemons />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
        <Route path="/capture-pokemon" element={<PokemonCataloge />} />
        <Route
          path="/pokemon-battle/:pokemonOponent"
          element={<ChoosePokemonBattle />}
        />
        <Route
          path="/pokemon-battle/:pokemonOponent/:pokemonChose"
          element={<PokemonBattle />}
        />
        <Route
          path="/pokemon-evolution/:pokemonName"
          element={<PokemonEvolution />}
        />

        <Route path="/rocket-team-battle" element={<RocketTeamChoose />} />
        <Route
          path="/rocket-team-battle/:pokemonName"
          element={<RocketTeamBattle />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/special-pokemons" element={<SpecialPokemons />} />
        <Route path="/set-informations" element={<SetGameInfos />} />
        <Route path="/store" element={<Store />} />
        <Route path="/seetings" element={<Seetings />} />
        <Route path="/snorlax-note" element={<SnorlaxNote />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/pokemon-league" element={<PokemonLeague />} />
        <Route
          path="/choose-pokemon-league/:league/:oponnent"
          element={<ChoosePokemonLeague />}
        />
        <Route
          path="pokemon-league-battle/:league/:oponnentName/:oponnentPokemons/:myPokemons"
          element={<PokemonBattleLeague />}
        />
        <Route path="/roulette" element={<Roulette />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
