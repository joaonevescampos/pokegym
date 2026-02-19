
import lance from "../assets/league/trainers3/lance.png";
import diantha from "../assets/league/trainers3/diantha.png";
import iris from "../assets/league/trainers3/iris.png";
import kukui from "../assets/league/trainers3/kukui.png";
import geeta from "../assets/league/trainers3/geeta.png";
import mustard from "../assets/league/trainers3/mustard.png";
import n from "../assets/league/trainers3/n.png";

import gym1 from "../assets/arenas/fire-arena2.png";
import gym2 from "../assets/arenas/ghost-arena.png";
import gym3 from "../assets/arenas/normal2-arena.png";
import gym4 from "../assets/arenas/electric-arena.png";
import gym5 from "../assets/arenas/grass-arena2.png";
import gym6 from "../assets/arenas/fire-arena.png";
import gym7 from "../assets/arenas/ghost-arena.png";
import gym8 from "../assets/arenas/elite-four-arena.png";

const arceus = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/493.png"

export const trainers3 = [
  {
    trainer: "Lance",
    name: "lance",
    image: lance,
    cost: 20,
    winRate: 48,
    loseRate: 38,
    rewards: {pokeballs: 20, diamond: 7},
    battleLevel: "dificil 1",
    xp: 5000,
    gym: gym1,
    pokemons: [
      { id: 149, name: "Dragonite", type: "dragon" },
      { id: 130, name: "Gyarados", type: "water" },
      { id: 373, name: "Salamence", type: "dragon" },
      { id: 334, name: "Altaria", type: "dragon" },
      { id: 384, name: "Rayquaza", type: "dragon" },
    ],
  },
  {
    trainer: "Diantha",
    name: "diantha",
    image: diantha,
    cost: 21,
    winRate: 46,
    loseRate: 36,
    rewards: { pokeballs: 20, diamond: 9 },
    battleLevel: "dificil 2",
    xp: 5300,
    gym: gym2,
    pokemons: [
      { id: 282, name: "Gardevoir", type: "psychic" },
      { id: 609, name: "Chandelure", type: "ghost" },
      { id: 407, name: "Roserade", type: "grass" },
      { id: 681, name: "Aegislash", type: "steel" },
      { id: 697, name: "Tyrantrum", type: "rock" },
    ],
  },
  {
    trainer: "Iris",
    name: "iris",
    image: iris,
    cost: 22,
    winRate: 44,
    loseRate: 34,
    rewards: { pokeballs: 20, diamond: 12 },
    battleLevel: "dificil 3",
    xp: 5600,
    gym: gym3,
    pokemons: [
      { id: 612, name: "Haxorus", type: "dragon" },
      { id: 635, name: "Hydreigon", type: "dark" },
      { id: 637, name: "Volcarona", type: "bug" },
      { id: 706, name: "Goodra", type: "dragon" },
      { id: 445, name: "Garchomp", type: "dragon" },
    ],
  },
  {
    trainer: "Kukui",
    name: "kukui",
    image: kukui,
    cost: 23,
    winRate: 42,
    loseRate: 32,
    rewards: { pokeballs: 20, diamond: 15 },
    battleLevel: "dificil 4",
    xp: 5900,
    gym: gym4,
    pokemons: [
      { id: 724, name: "Decidueye", type: "grass" },
      { id: 727, name: "Incineroar", type: "fire" },
      { id: 730, name: "Primarina", type: "water" },
      { id: 745, name: "Lycanroc", type: "rock" },
      { id: 784, name: "Kommo-o", type: "dragon" },
    ],
  },
  {
    trainer: "Geeta",
    name: "geeta",
    image: geeta,
    cost: 24,
    winRate: 40,
    loseRate: 30,
    rewards: { pokeballs: 20, diamond: 18 },
    battleLevel: "dificil 5",
    xp: 6200,
    gym: gym5,
    pokemons: [
      { id: 970, name: "Glimmora", type: "rock" },
      { id: 937, name: "Kingambit", type: "dark" },
      { id: 1007, name: "Koraidon", type: "fighting" },
      { id: 991, name: "Iron Treads", type: "ground" },
      { id: 888, name: "Zacian", type: "fairy" },
    ],
  },
  {
    trainer: "Mustard",
    name: "mustard",
    image: mustard,
    cost: 25,
    winRate: 35,
    loseRate: 25,
    rewards: { pokeballs: 20, diamond: 22 },
    battleLevel: "insano",
    xp: 6500,
    gym: gym6,
    pokemons: [
      { id: 68, name: "Machamp", type: "fighting" },
      { id: 892, name: "Urshifu", type: "fighting" },
      { id: 448, name: "Lucario", type: "fighting" },
      { id: 620, name: "Mienshao", type: "fighting" },
      { id: 237, name: "Hitmontop", type: "fighting" },
    ],
  },
  {
    trainer: "N",
    name: "n",
    image: n,
    cost: 26,
    winRate: 32,
    loseRate: 22,
    rewards: { pokeballs: 20, diamond: 25 },
    battleLevel: "mítico",
    xp: 6800,
    gym: gym7,
    pokemons: [
      { id: 643, name: "Reshiram", type: "dragon" },
      { id: 644, name: "Zekrom", type: "dragon" },
      { id: 646, name: "Kyurem", type: "dragon" },
      { id: 635, name: "Hydreigon", type: "dark" },
      { id: 571, name: "Zoroark", type: "dark" },
    ],
  },
  {
    trainer: "Arceus",
    name: "arceus",
    image: arceus,
    cost: 30,
    winRate: 27,
    loseRate: 17,
    rewards: { pokeballs: 50, diamond: 40 },
    battleLevel: "divino",
    xp: 7000,
    gym: gym8,
    pokemons: [
      { id: 493, name: "Arceus", type: "normal" },
      { id: 487, name: "Giratina", type: "ghost" },
      { id: 483, name: "Dialga", type: "steel" },
      { id: 484, name: "Palkia", type: "water" },
      { id: 150, name: "Mewtwo", type: "psychic" },
    ],
  },
];
