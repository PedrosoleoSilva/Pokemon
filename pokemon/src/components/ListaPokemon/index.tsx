import axios from "axios";
import { useEffect, useState } from "react";
import './ListaPokemon.css';


interface PokemonProps {
    name: string,
    url: string,
    base_experience: string,
    sprites: {
        front_default: string,

    };
};
const Pokemon = ({ data }: { data: PokemonProps }) => {
    const [details, setDetails] = useState<PokemonProps | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(data.url);
                setDetails(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do Pokémon:", error);
            }
        };
        fetchDetails();
    }, [data.url]);

    return (
        <div className="card">
            <img src={details?.sprites.front_default} alt={data.name} />
            <div>
                <p>{data.name}</p>
                <div className="container-exp">
                    <p className="corExp">EXP<p>{details?.base_experience}</p></p>
                </div>
            </div>
        </div>
    );
};

const ListaPokemon = () => {
    const [pokemon, setPokemon] = useState<PokemonProps[]>([]);

    const fetchPokemon = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
            const ordenadorSorte = [...response.data.results];

            ordenadorSorte.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setPokemon(ordenadorSorte);
        } catch (error) {
            console.error("Erro ao buscar Pokémon:", error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return (
        <div>
            <div className="container-texto">
                <h1>Pokemons</h1>
            </div>
            <div className="container">
                {pokemon.map((item) => (
                    <div key={item.name} >
                        <Pokemon key={item.name} data={item} />
                    </div>
                ))}
            </div>
        </div>

    );
};


export default ListaPokemon;
