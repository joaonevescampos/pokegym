import brock from "../assets/league/brock.png";
import misty from "../assets/league/misty.png";
import surge from "../assets/league/surge.png";
import erika from "../assets/league/erika.png";
import koga from "../assets/league/koga.png";
import sabrina from "../assets/league/sabrina.png";
import blaine from "../assets/league/blaine.png";
import giovanni from "../assets/league/giovanni.png";
import lorelei from "../assets/league/lorelei.png";
import bruno from "../assets/league/bruno.png";
import agatha from "../assets/league/agatha.png";
import lance from "../assets/league/lance.png";
import gary from "../assets/league/gary.png";

import gym1 from "../assets/gym/gym-1.png";
import gym2 from "../assets/gym/gym-2.png";
import gym3 from "../assets/gym/gym-3.png";
import gym4 from "../assets/gym/gym-4.png";
import gym5 from "../assets/gym/gym-5.png";
import gym6 from "../assets/gym/gym-6.png";
import gym7 from "../assets/gym/gym-7.png";
import gym8 from "../assets/gym/gym-8.png";
import gym9 from "../assets/gym/gym-9.png";

export const trainers4 = [
  {
    trainer: "Giovanni",
    name: "giovanni",
    image: giovanni,
    cost: 20,
    winRate: 45,
    loseRate: 25,
    rewards: { pokeballs: 20, diamond: 10 },
    battleLevel: "dificil 2",
    xp: 7500,
    gym: gym1,
    pokemons: [
      { id: 150, name: "Mewtwo", type: "psychic" },
      { id: 34, name: "Nidoking", type: "poison" },
      { id: 112, name: "Rhydon", type: "ground" },
      { id: 89, name: "Muk", type: "poison" },
      { id: 51, name: "Dugtrio", type: "ground" },
    ],
  },
  {
    trainer: "Ghetsis",
    name: "ghetsis",
    // image: ghetsis,
    cost: 21,
    winRate: 42,
    loseRate: 32,
    rewards: { pokeballs: 20, diamond: 15 },
    battleLevel: "dificil 3",
    xp: 7800,
    gym: gym2,
    pokemons: [
      { id: 635, name: "Hydreigon", type: "dark" },
      { id: 646, name: "Kyurem", type: "dragon" },
      { id: 571, name: "Zoroark", type: "dark" },
      { id: 530, name: "Excadrill", type: "ground" },
      { id: 609, name: "Chandelure", type: "ghost" },
    ],
  },
  {
    trainer: "Lysandre",
    name: "lysandre",
    // image: lysandre,
    cost: 22,
    winRate: 40,
    loseRate: 30,
    rewards: { pokeballs: 30, diamond: 20 },
    battleLevel: "dificil 4",
    xp: 8100,
    gym: gym3,
    pokemons: [
      { id: 663, name: "Talonflame", type: "fire" },
      { id: 716, name: "Xerneas", type: "fairy" },
      { id: 715, name: "Noivern", type: "dragon" },
      { id: 697, name: "Tyrantrum", type: "rock" },
      { id: 668, name: "Pyroar", type: "fire" },
    ],
  },
  {
    trainer: "Chairman Rose",
    name: "chairman-rose",
    // image: rose,
    cost: 23,
    winRate: 38,
    loseRate: 28,
    rewards: { pokeballs: 30, diamond: 25 },
    battleLevel: "dificil 5",
    xp: 8400,
    gym: gym4,
    pokemons: [
      { id: 884, name: "Duraludon", type: "steel" },
      { id: 879, name: "Copperajah", type: "steel" },
      { id: 815, name: "Cinderace", type: "fire" },
      { id: 809, name: "Inteleon", type: "water" },
      { id: 812, name: "Rillaboom", type: "grass" },
    ],
  },
  {
    trainer: "Volo",
    name: "volo",
    // image: volo,
    cost: 24,
    winRate: 35,
    loseRate: 25,
    rewards: { pokeballs: 30, diamond: 30 },
    battleLevel: "insano",
    xp: 8700,
    gym: gym5,
    pokemons: [
      { id: 445, name: "Garchomp", type: "dragon" },
      { id: 487, name: "Giratina", type: "ghost" },
      { id: 646, name: "Kyurem", type: "dragon" },
      { id: 248, name: "Tyranitar", type: "rock" },
      { id: 130, name: "Gyarados", type: "water" },
    ],
  },
  {
    trainer: "Ultra Necrozma",
    name: "ultra-necrozma",
    // image: necrozma,
    cost: 25,
    winRate: 32,
    loseRate: 22,
    rewards: { pokeballs: 30, diamond: 35 },
    battleLevel: "mítico",
    xp: 9000,
    gym: gym6,
    pokemons: [
      { id: 800, name: "Necrozma", type: "psychic" },
      { id: 791, name: "Solgaleo", type: "steel" },
      { id: 792, name: "Lunala", type: "ghost" },
      { id: 718, name: "Zygarde", type: "dragon" },
      { id: 384, name: "Rayquaza", type: "dragon" },
    ],
  },
  {
    trainer: "Eternatus",
    name: "eternatus",
    // image: eternatus,
    cost: 26,
    winRate: 27,
    loseRate: 17,
    rewards: { pokeballs: 40, diamond: 50 },
    battleLevel: "divino",
    xp: 9300,
    gym: gym7,
    pokemons: [
      { id: 890, name: "Eternatus", type: "poison" },
      { id: 888, name: "Zacian", type: "fairy" },
      { id: 889, name: "Zamazenta", type: "fighting" },
      { id: 484, name: "Palkia", type: "water" },
      { id: 483, name: "Dialga", type: "steel" },
    ],
  },
  {
    trainer: "The Creator",
    name: "the-creator",
    // image: creator,
    cost: 100,
    winRate: 15,
    loseRate: 5,
    rewards: { pokeballs: 1000, diamond: 1000 },
    battleLevel: "impossível",
    xp: 10000,
    gym: gym9,
    pokemons: [
      { id: 493, name: "Arceus", type: "normal" },
      { id: 150, name: "Mewtwo", type: "psychic" },
      { id: 249, name: "Lugia", type: "psychic" },
      { id: 250, name: "Ho-Oh", type: "fire" },
      { id: 382, name: "Kyogre", type: "water" },
    ],
  },
];

