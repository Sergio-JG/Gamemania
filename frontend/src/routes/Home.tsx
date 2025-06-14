import Header from '../components/Header';
import Footer from '../components/Footer';
import GameList from '../components/GameList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Carousel from '../components/GamesCarrousel';

function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const storedIdLocal = localStorage.getItem('userId');
    const storedIdSession = sessionStorage.getItem('userId');
    const storedRoleLocal = localStorage.getItem('role');
    const storedRoleSession = sessionStorage.getItem('role');

    if ((storedIdLocal || storedIdSession) && (storedRoleLocal === 'Admin' || storedRoleSession === 'Admin')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <main style={{ background: 'rgb(41, 41, 41)' }}>
        <Grid item xs={12}>
          <Carousel></Carousel>
        </Grid>
        <GameList />
      </main>
      <Footer />
    </>
  );
}

export default Home;
