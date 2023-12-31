/* eslint-disable  */
import { Link, Stack, Typography } from '@mui/material';
import { useEffect, useState, memo } from 'react';
import styles from './PokemonList.module.css';

const PokemonList = (props: any) => {
  return (
    <>
      {
        props.pokemon.map((obj: any, id: any) => {
          return (
            <Stack
              key={id}
              id={id.toString()}
              className={styles.pokemonItem}
              sx={obj.name === 'mew' ? { display: props.mew ? 'normal' : 'none' } : { display: 'normal' }}
            >
              <Stack className={styles.pokemonImgOuter}>
                <Stack className={styles.pokemonImg}>
                  <img
                    alt=''
                    src={
                      obj.name != 'mr-mime'
                        ? `https://projectpokemon.org/images/normal-sprite/${obj.name.replace('-', '_')}.gif`
                        : `https://projectpokemon.org/images/normal-sprite/${obj.name.replace('-', '.')}.gif`
                    }
                  />
                </Stack>
                <Stack className={styles.pokemonName}>
                  <Typography sx={{ fontSize: '1.2rem' }}>{`${obj.name.at(0).toUpperCase()}${obj.name.slice(
                    1
                  )}`}</Typography>
                </Stack>
                <Stack className={styles.pokemonName}>
                  <Link href={`/pokemon/${id}`}>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      View details
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          );
        })}
    </>
  );
};

export default memo(PokemonList);