/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { CircularProgress, Stack, Typography, Button } from '@mui/material';
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import RadarChart from 'react-svg-radar-chart';
import Api from '../../api/axios';
import { Header } from '../../components/Header';
import PokemonList from '../../components/PokemonList';
import Loader from '../../components/Loader'
import SearchBar from '../../components/SearchBar';
import styles from './Home.module.css';
import Link from 'next/link';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Home = () => {
  const AsyncImage = (props: any) => {
    const [loadedSrc, setLoadedSrc] = useState(null);
    useEffect(() => {
      setLoadedSrc(null);
      if (props.src) {
        const handleLoad = () => {
          setLoadedSrc(props.src);
        };
        const image = new Image();
        image.addEventListener('load', handleLoad);
        image.src = props.src;
        return () => {
          image.removeEventListener('load', handleLoad);
        };
      }
    }, [props.src]);
    if (loadedSrc === props.src) {
      return <img {...props} />;
    } else {
      return (
        <>
          <Stack className={styles.ProgressImg}>
            <CircularProgress size={'10rem'} sx={{ color: 'rgb(122, 122, 193)' }} />
            <Loader loading={true} ></Loader>
          </Stack>
        </>
      );
    }
  };

  const [fullLoaded, setFullLoaded] = useState(false);
  const [pokemon, setPokemon]: any = useState([]);

  const [pokemonIndex, setPokemonIndex]: any = useState(1);

  useEffect(() => {
    const fetchPokemon = async (index: number) => {
      await Api.get(`/pokemon/${index}`)
        .then((response) => {
          setPokemon((pokemon: any) => [...pokemon, response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const asyncLoop = async () => {
      for (let i = 1; i < 152; i++) {
        await fetchPokemon(i);
      }
      setFullLoaded(true);
    };
    asyncLoop();
  }, []);

  
  const findPokemonSuggestions = (query: string): Promise<{ id: number; name: string }[]> => {
    return new Promise((resolve) => {
      const matchingPokemons = pokemon
        .filter(({ name, id } = pokemon) => name.toLowerCase().includes(query.toLowerCase()))
        .map(({ name, id } = pokemon) => ({ id, name }));
  
      // Artificial timeout for demonstration purposes
      setTimeout(() => {
        console.log(matchingPokemons);
        resolve(matchingPokemons);
      }, 200);
    });
  };
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>();
  
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    handleSearch();
  };
  
  const handleSearch = () => {
    findPokemonSuggestions(searchTerm)
      .then((result) => {
        console.log(result)
        setSearchResults(result);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching Pokemon suggestions:', error);
      });
  };

  const [filters, setFilters] = useState<any>();
  const [filteredPokemon, setFilteredPokemon] = useState<any>();

  const [mew, setMew] = useState(false);

  return (
    <>
      <Header setMew={setMew} setPokemonIndex={setPokemonIndex} />
      <Stack className={styles.Container}>+

        <Stack className={styles.Menu}>
          <Stack className={styles.MenuLeft}>
            <Stack className={styles.menuLeftCard}>
              <Stack className={styles.listTitle}>
                {/* <Stack className={styles.backgroundTitle}>
                  <Stack className={styles.title}>
                    <Typography sx={{ fontSize: '1.5rem' }}>Select Pokemon</Typography>
                  </Stack>
                </Stack> */}
                <Stack className={styles.backgroundTitle}>
                  <Stack className={styles.title} style={{ fontSize: '1.5rem' }}>

                    <Stack className={styles.inputWrapper}>

                      <input className={styles.inputText} type="text" value={searchTerm} onChange={(e) => handleInputChange(e.target.value)} placeholder='Select Pokemon' />
                      <Button className={styles.searchButton} onClick={handleSearch}>Search</Button>
                    </Stack>

                    {searchResults && <Stack className={styles.searchList} tabIndex={0}>
                      {searchResults.map((result: any, index: any) => {
                        return (
                          <li key={index} className={styles.selectedSearch}>
                            <Link href={`/pokemon/${result.id}`}>
                              {result.name}
                            </Link>
                          </li>
                        );
                      })}
                    </Stack>}
                  </Stack>
                </Stack>
                <Stack className={styles.filterBox}>
                  {/* <Input type={dropdown}> */}
                  <Typography>Filter</Typography>
                  {/* </Input> */}
                </Stack>
              </Stack>
              <Stack className={styles.listPokemon}>
                <Stack className={styles.pokemons}>
                  <PokemonList
                    pokemon={pokemon}
                    setPokemon={setPokemon}
                    pokemonIndex={pokemonIndex}
                    setPokemonIndex={setPokemonIndex}
                    mew={mew}
                    setMew={setMew}
                  />
                </Stack>
              </Stack>
              <Stack className={styles.listFooter}></Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {!fullLoaded ? (
        <Stack className={styles.Progress}>
          <CircularProgress size={'10rem'} sx={{ color: 'rgb(219, 75, 106)' }} />
        </Stack>
      ) : null}
    </>
  );
};

export default Home;
