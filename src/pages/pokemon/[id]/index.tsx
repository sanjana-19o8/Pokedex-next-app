/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Stack, Typography } from '@mui/material';
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import RadarChart from 'react-svg-radar-chart';
import Api from '../../../api/axios';
import { getTypeColor } from '../../../utils/getTypeColor';
import styles from './Pokemon.module.css';
import { useRouter } from 'next/router';
import { Header } from '../../../components/Header';
import BackToHome from '../../../components/BackToHome';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Pokemon() {
    const router = useRouter();
    const { id } = router.query;

    const [pokemon, setPokemon] = useState<any>();

    const [hp, setHP] = useState(45 / 200);
    const [attack, setAttack] = useState(49 / 200);
    const [defense, setDefense] = useState(49 / 200);
    const [specialAttack, setSpecialAttack] = useState(65 / 200);
    const [specialDefense, setSpecialDefense] = useState(65 / 200);
    const [speed, setSpeed] = useState(45 / 200);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    console.log(id);
                    const response = await Api.get(`/pokemon/${id}`);
                    const fetchedPokemon = response.data;

                    setPokemon(fetchedPokemon);

                    console.log(pokemon);

                    if (fetchedPokemon) {
                        if (id === '113') {
                            setHP(1);
                        } else {
                            setHP(fetchedPokemon.stats[0].base_stat / 200);
                        }

                        setAttack(fetchedPokemon.stats[1].base_stat / 200);
                        setDefense(fetchedPokemon.stats[2].base_stat / 200);
                        setSpecialAttack(fetchedPokemon.stats[3].base_stat / 200);
                        setSpecialDefense(fetchedPokemon.stats[4].base_stat / 200);
                        setSpeed(fetchedPokemon.stats[5].base_stat / 200);
                    }
                } else {
                    console.log('error reading id')
                }
            } catch (err) {
                console.error(err, 'Error fetching pokemon data');
            }
        };

        fetchData();
    }, [id]);



    const data = [
        {
            data: {
                HP: hp,
                Attack: attack,
                Defense: defense,
                SpecialAttack: specialAttack,
                SpecialDefense: specialDefense,
                Speed: speed,
            },
            meta: { color: 'rgb(11, 95, 173)' },
        },
    ];

    const captions = {
        HP: 'HP',
        Attack: 'Attack',
        Defense: 'Defense',
        SpecialAttack: 'Special Attack',
        SpecialDefense: 'Special Defense',
        Speed: 'Speed',
    };

    if (id && pokemon)
        return (
            <>
                <div className={styles.Body}>
                    <div className={styles.Blur}></div>


                    <Stack className={styles.Container}>
                    <BackToHome />
                        <Stack className={styles.Menu}>
                            <Stack className={styles.pokemonAvatarDiv}>
                                <Stack className={styles.pokemonAvatarImg}>
                                    <Stack className={styles.textDiv}>
                                        <Typography
                                            sx={{ fontSize: '1.6rem', fontWeight: '500' }}
                                            variant='h4'
                                            className={styles.pokemonName}
                                        >
                                            {pokemon != null
                                                ? `${pokemon.name.at(0).toUpperCase()}${pokemon.name.slice(1)}`
                                                : ''}
                                        </Typography>
                                    </Stack>
                                    <img
                                        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                                        alt={pokemon.name}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className={styles.pokemonInfoDiv}>
                                <Stack className={styles.pokemonInfoChart}>
                                    <RadarChart captions={captions} data={data} size={400} />
                                </Stack>
                                <Stack className={styles.pokemonInfoMisc}>
                                    {/* <Stack className={styles.pokemonInfoDesc}>
                    <Typography sx={{ color: 'rgba(226, 219, 199,0.9)', fontSize: '1rem', margin: '4px' }}>
                        {`${pokemonDesc}`}
                    </Typography>
                </Stack> */}
                                    <Stack className={styles.pokemonInfoTypes}>
                                        <Stack id='infoOne' className={styles.pokemonInfoTypeEach}>
                                            <Typography
                                                sx={{
                                                    textShadow: '1px 1px 2px black',
                                                    color: 'rgba(226, 219, 199,0.9)',
                                                    fontSize: '1.5rem',
                                                    display: 'normal',
                                                }}
                                            >
                                                {pokemon ? `${pokemon.types[0].type.name}` : ''}
                                            </Typography>
                                        </Stack>

                                        <Stack id='infoTwo' className={styles.pokemonInfoTypeEach}>
                                            <Typography
                                                sx={{
                                                    textShadow: '1px 1px 2px black',
                                                    color: 'rgba(226, 219, 199,0.9)',
                                                    fontSize: '1.5rem',
                                                    display: 'normal',
                                                }}
                                            >
                                                {pokemon && pokemon.types[1]
                                                    ? `${pokemon.types[1].type.name}`
                                                    : ''}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack className={styles.pokemonInfoGap}></Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <style jsx global>
                        {`
        .shape {
          transition: all 0.5s;
          fill-opacity: 0.5;
          cursor: pointer;
        }
        .shape:hover {
          fill-opacity: 0.65;
        }
        .scale {
          fill: rgba(126, 119, 99, 0.4);
          stroke: #25242499;
          stroke-width: 2px;
        }
        .axis {
          stroke: #25242499;
          stroke-width: 2px;
        }
        .caption {
          fill: rgba(226, 219, 199, 0.9);
          font-size: 1rem;
          font-weight: 300;
        }
        #infoOne {
          transition: all 0.2s;
          background: ${pokemon && pokemon.types
                                ? getTypeColor(pokemon.types[0].type.name)
                                : ''};
          height: 80%;
          width: 45%;
        }
        #infoTwo {
          background: ${pokemon && pokemon.types[1]
                                ? getTypeColor(pokemon.types[1].type.name)
                                : ''};
          transition: all 0.2s;
          height: ${pokemon && pokemon.types[1] ? '80%' : '0%'};
          width: ${pokemon && pokemon.types[1] ? '45%' : '0%'};
        }
      `}
                    </style>
                </div>
            </>
        )
}