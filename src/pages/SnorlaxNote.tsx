import { Link } from "react-router-dom";

const SnorlaxNote = () => {
  return (
    <main className="p-4 h-screen">
      <div className="absolute flex items-end gap-2 top-4 left-4 text-white">
            <Link to="/home" className="text-sm  font-bold opacity-70">
              Pokegym
            </Link>
          </div>
      <div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/143.png"
          alt="snorlax"
          className="w-72 m-auto"
        />
        <h1 className="text-white font-bold text-2xl text-center py-4">Bloco de Notas</h1>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <textarea className="h-full w-full max-w-300 bg-white m-auto p-4 rounded-2xl" maxLength={5000} />
      </div>
    </main>
  );
};

export default SnorlaxNote;
