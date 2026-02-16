import { Link } from "react-router-dom"
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import token from "../assets/token.png";
import maleProfile from "../assets/male-profile.png";
import femaleProfile from "../assets/female-profile.png";
import { usePokemon } from "@/context/usePokemon";

const Header = () => {
  const {state} = usePokemon()
  return (
    <header className="relative w-full h-fit text-white text-xs">
        <section>
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/home" className="font-bold opacity-70 z-20">
              HOME
            </Link>
          </div>
          <section className="absolute flex flex-col items-end gap-2 top-4 right-4">
            <div className="flex flex-col gap-4 items-end pb-2">
              <div className="flex gap-2 ">
                <div className="flex flex-col items-end">
                  <span className="font-bold">{state.userStatus.userName}</span>
                  <span className="opacity-60 font-bold ">
                    {" "}
                    {state.userStatus.xp} XP
                  </span>
                </div>
                <img
                  src={
                    state.userStatus.gender === "feminino"
                      ? femaleProfile
                      : maleProfile
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.token}{" "}
                  </span>
                  <img src={token} alt="token" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.pokeball}{" "}
                  </span>
                  <img src={pokebola} alt="pokebola" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.energy}{" "}
                  </span>
                  <img src={energy} alt="energy" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.diamond}{" "}
                  </span>
                  <img src={diamond} alt="diamond" width={20} />
                </div>
              </div>
              <hr className="border-white w-screen opacity-20" />
            </div>
          </section>
        </section>
      </header>
  )
}

export default Header