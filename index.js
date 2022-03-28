const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2";
const SUB_URL = "/pokemon";

const getPokemonWithClassicPromises = () => {
  const [, , firstPokemon] = process.argv;
  const URL = `${BASE_URL}${SUB_URL}/${firstPokemon}`;

  axios
    .get(URL)
    .then((result) => {
      return result.data;
    })
    .then(({ base_experience, id, sprites }) => {
      console.log("> getPokemonWithClassicPromises fn: ", base_experience, id, sprites.front_default);
    })
    .catch((error) => {
      console.error("something went wrong: ", error.message);
    });
}

const getPokemonWithAsyncAwait = async () => {
  const [, , ...pokemons] = process.argv;

  for await (const pokemon of pokemons) {
    try {
      const URL = `${BASE_URL}${SUB_URL}/${pokemon}`;
      const result = await axios.get(URL);
      const { base_experience, id, sprites } = result.data;

      console.log("> getPokemonWithAsyncAwait fn: ", base_experience, id, sprites.front_default);
    } catch (error) {
      console.error("something went wrong: ", error.message);
    }
  }
};

getPokemonWithClassicPromises();
getPokemonWithAsyncAwait();
