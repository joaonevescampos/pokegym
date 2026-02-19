
import giovanni from "../assets/league/trainers4/giovanni.png";
import chairman from "../assets/league/trainers4/chairman.png";
import eternatus from "../assets/league/trainers4/eternatus.png";
import ghetsis from "../assets/league/trainers4/ghetsis.png";
import lysandre from "../assets/league/trainers4/lysandadre.png";
import ultra from "../assets/league/trainers4/ultra.png";
import creator from "../assets/league/trainers4/the-creator.png";
import volo from "../assets/league/trainers4/volo.png";

import gym1 from "../assets/arenas/fire-arena.png";
import gym2 from "../assets/arenas/psychic-arena.png";
import gym3 from "../assets/arenas/normal-arena.png";
import gym4 from "../assets/arenas/electric-arena.png";
import gym5 from "../assets/arenas/grass-arena2.png";
import gym6 from "../assets/arenas/elite-four-arena.png";
import gym7 from "../assets/arenas/cassino-arena.png";
import gym8 from "../assets/arenas/final-arena.png";

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
    image: ghetsis,
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
    image: lysandre,
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
    name: "chairman",
    image: chairman,
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
    image: volo,
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
    name: "ultra",
    image: ultra,
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
    image: eternatus,
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
    name: "creator",
    image: creator,
    cost: 100,
    winRate: 15,
    loseRate: 5,
    rewards: { pokeballs: 1000, diamond: 1000 },
    battleLevel: "impossível",
    xp: 10000,
    gym: gym8,
    pokemons: [
      { id: 493, name: "Arceus", type: "normal" },
      { id: 150, name: "Mewtwo", type: "psychic" },
      { id: 249, name: "Lugia", type: "psychic" },
      { id: 250, name: "Ho-Oh", type: "fire" },
      { id: 382, name: "Kyogre", type: "water" },
    ],
  },
];

