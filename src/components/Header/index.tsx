import { Grid, Stack, Typography } from '@mui/material';
import styles from './Header.module.css';
import { CgPokemon } from 'react-icons/cg';
import { GiHandBag } from 'react-icons/gi';
import { AiOutlineIdcard } from 'react-icons/ai'
import { FaWifi, FaShoppingBag } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Header = (props: any) => {
  const handleMewClick = () => {
    props.setMew(true);
    toast(' A Wild Mew appared!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    });
    props.setPokemonIndex(151);
  }
  return (
    <>
      <Stack className={styles.Container}>
        <Stack className={styles.HeaderLeft}>
          <CgPokemon className={styles.icon} />
          <Typography
            className={styles.nickName}>
            POKEdex</Typography>
        </Stack>
        <Stack className={styles.HeaderCenter}>
          <Stack className={styles.HeaderItem}>
            <FaShoppingBag className={styles.icon} />
          </Stack>
          <Stack className={styles.HeaderItem}>
            <AiOutlineIdcard className={styles.icon} />
          </Stack>
          <Stack className={styles.HeaderItem}>
            <FaWifi className={styles.icon} />
          </Stack>
          <Stack className={styles.HeaderItem}>
            <IoMdSettings className={styles.icon} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
