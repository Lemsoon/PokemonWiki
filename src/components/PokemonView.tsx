import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "../scss/pokemonView.scss";

interface IPokemon {
  name: string;
  sprites: any;
}

const PokemonView: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [pokemonInfo, setPokemonInfo] = useState<IPokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit = 9;
  const baseURL = "https://pokeapi.co/api/v2/";

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokeURLResponse = await axios.get(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
      const pokeURLs: string[] = pokeURLResponse.data.results.map((result: any) => result.url);

      const pokemonRequests = pokeURLs.map((url: string) => axios.get(url));
      const pokemonDataResponses = await Promise.all(pokemonRequests);
      const pokemonData = pokemonDataResponses.map((response) => response.data);

      setPokemonInfo(pokemonData);
      setOffset(offset + limit);
    };
    fetchPokemonData();
  }, [searchTerm]);
  const getMoreData = async () => {
    const pokeURLResponse = await axios.get(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
    const pokeURLs: string[] = pokeURLResponse.data.results.map((result: any) => result.url);

    const pokemonRequests = pokeURLs.map((url: string) => axios.get(url));
    const pokemonDataResponses = await Promise.all(pokemonRequests);
    const pokemonData = pokemonDataResponses.map((response) => response.data);

    setPokemonInfo((prevData) => [...prevData, ...pokemonData]);
    setOffset(offset + limit);
  };

  console.log(pokemonInfo);

  return (
    <InfiniteScroll
      dataLength={pokemonInfo.length}
      next={getMoreData}
      hasMore={true}
      loader={<p>Loading more data!</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <main className="main">
        <div>
          {pokemonInfo.map((pokemon) => (
            <article key={pokemon.name} className="pokemon-container">
              <div className="main-info">
                <h1>{pokemon.name}</h1>
                <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
              </div>
            </article>
          ))}
        </div>
      </main>
    </InfiniteScroll>
  );
};
export default PokemonView;
