import silver from "../assets/league/trainers2/silver.png";
import wallace from "../assets/league/trainers2/wallace.png";
import cynthia from "../assets/league/trainers2/cynthia.png";
import steven from "../assets/league/trainers2/steven.png";
import alder from "../assets/league/trainers2/alder.png";
import leon from "../assets/league/trainers2/leon.png";
import red from "../assets/league/trainers2/red.png";

import gym1 from "../assets/arenas/rock-arena2.png";
import gym2 from "../assets/arenas/water-arena.png";
import gym3 from "../assets/arenas/ghost-arena.png";
import gym4 from "../assets/arenas/normal2-arena.png";
import gym5 from "../assets/arenas/circle-arena.png";
import gym6 from "../assets/arenas/fire-arena.png";
import gym7 from "../assets/arenas/grass-arena.png";
import gym8 from "../assets/arenas/sky-arena.png";

const mewtwo = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png"

export const trainers2 = [
  {
    trainer: "Silver",
    name: "silver",
    image: silver,
    cost: 20,
    winRate: 65,
    loseRate: 45,
    rewards: { pokeballs: 10, diamond: 1 },
    battleLevel: "médio 1",
    xp: 2500,
    gym: gym1,
    pokemons: [
      { id: 160, name: "Feraligatr", type: "water" },
      { id: 248, name: "Tyranitar", type: "rock" },
      { id: 197, name: "Umbreon", type: "dark" },
      { id: 212, name: "Scizor", type: "bug" },
      { id: 229, name: "Houndoom", type: "fire" },
    ],
  },
  {
    trainer: "Wallace",
    name: "wallace",
    image: wallace,
    cost: 21,
    winRate: 60,
    loseRate: 40,
    rewards: { pokeballs: 15, diamond: 2 },
    battleLevel: "médio 2",
    xp: 2800,
    gym: gym2,
    pokemons: [
      { id: 130, name: "Gyarados", type: "water" },
      { id: 272, name: "Ludicolo", type: "water" },
      { id: 121, name: "Starmie", type: "water" },
      { id: 226, name: "Mantine", type: "water" },
      { id: 134, name: "Vaporeon", type: "water" },
    ],
  },
  {
    trainer: "Cynthia",
    name: "cynthia",
    image: cynthia,
    cost: 22,
    winRate: 55,
    loseRate: 45,
    rewards: { pokeballs: 20, diamond: 3 },
    battleLevel: "médio 3",
    xp: 3100,
    gym: gym3,
    pokemons: [
      { id: 445, name: "Garchomp", type: "dragon" },
      { id: 448, name: "Lucario", type: "fighting" },
      { id: 282, name: "Gardevoir", type: "psychic" },
      { id: 407, name: "Roserade", type: "grass" },
      { id: 423, name: "Gastrodon", type: "water" },
    ],
  },
  {
    trainer: "Steven",
    name: "steven",
    image: steven,
    cost: 23,
    winRate: 50,
    loseRate: 35,
    rewards: { pokeballs: 20, diamond: 4 },
    battleLevel: "médio 4",
    xp: 3400,
    gym: gym4,
    pokemons: [
      { id: 376, name: "Metagross", type: "steel" },
      { id: 306, name: "Aggron", type: "steel" },
      { id: 227, name: "Skarmory", type: "steel" },
      { id: 384, name: "Rayquaza", type: "dragon" },
      { id: 303, name: "Mawile", type: "steel" },
    ],
  },
  {
    trainer: "Alder",
    name: "alder",
    image: alder,
    cost: 24,
    winRate: 45,
    loseRate: 32,
    rewards: { pokeballs: 20, diamond: 5 },
    battleLevel: "dificil 1",
    xp: 3700,
    gym: gym5,
    pokemons: [
      { id: 637, name: "Volcarona", type: "bug" },
      { id: 628, name: "Braviary", type: "normal" },
      { id: 485, name: "Heatran", type: "fire" },
      { id: 530, name: "Excadrill", type: "ground" },
      { id: 248, name: "Tyranitar", type: "rock" },
    ],
  },
  {
    trainer: "Leon",
    name: "leon",
    image: leon,
    cost: 25,
    winRate: 40,
    loseRate: 30,
    rewards: { pokeballs: 20, diamond: 10 },
    battleLevel: "dificil 2",
    xp: 4000,
    gym: gym6,
    pokemons: [
      { id: 6, name: "Charizard", type: "fire" },
      { id: 815, name: "Cinderace", type: "fire" },
      { id: 812, name: "Rillaboom", type: "grass" },
      { id: 809, name: "Inteleon", type: "water" },
      { id: 887, name: "Dragapult", type: "dragon" },
    ],
  },
  {
    trainer: "Red",
    name: "red",
    image: red,
    cost: 26,
    winRate: 35,
    loseRate: 25,
    rewards: { pokeballs: 30, diamond: 20 },
    battleLevel: "insano",
    xp: 4300,
    gym: gym7,
    pokemons: [
      { id: 25, name: "Pikachu", type: "electric" },
      { id: 3, name: "Venusaur", type: "grass" },
      { id: 6, name: "Charizard", type: "fire" },
      { id: 9, name: "Blastoise", type: "water" },
      { id: 143, name: "Snorlax", type: "normal" },
    ],
  },
  {
    trainer: "Mewtwo",
    name: "mewtwo",
    image: mewtwo,
    cost: 30,
    winRate: 30,
    loseRate: 20,
    rewards: { pokeballs: 40, diamond: 30 },
    battleLevel: "mítico",
    xp: 4600,
    gym: gym8,
    pokemons: [
      { id: 150, name: "Mewtwo", type: "psychic" },
      { id: 384, name: "Rayquaza", type: "dragon" },
      { id: 249, name: "Lugia", type: "psychic" },
      { id: 250, name: "Ho-Oh", type: "fire" },
      { id: 483, name: "Dialga", type: "steel" },
    ],
  },
];
