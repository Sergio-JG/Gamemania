import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../interfaces/GameInterface';

import { Chip } from '@mui/material';
import axios from 'axios';

const GameList = () => {

  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/game`);
      if (response.status === 200) {
        const result = response.data;
        setGames(result);
      } else {
        throw new Error('ERROR fetching data:');
      }
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const popularGames = useMemo(() => [...games].sort((a, b) => b.numberOfSales - a.numberOfSales), [games]);
  const lastReleasedGames = useMemo(() => [...games].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()), [games]);
  const discountedGames = useMemo(() => games.filter(game => game.discount != 0), [games]);

  return (
    <>
      {/* LAST  RELEASE */}
      <Grid item xs={12} sx={{ paddingX: 30, paddingTop: 5 }}>
        <Typography variant="h4" color="white" fontFamily={'Roboto'} style={{ marginBottom: 20 }}> Últimos lanzamientos </Typography>
        <Grid container spacing={12}>
          {lastReleasedGames.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    style={{ borderRadius: 25 }}
                    component="img"
                    alt={game.title}
                    height='200px'
                    image={import.meta.env.VITE_GAME_IMAGES_URL + game.image}
                  />
                </Link>
                <Grid sx={{ paddingTop: 2 }}>
                  <Grid container justifyContent="space-between" alignItems="center" color={'white'}>
                    <Typography fontFamily={'Roboto'} variant="h5">
                      {truncateText(game.title, 30)}

                    </Typography>
                    <Typography fontFamily={'Roboto'} variant="h5">{`${game.price}€`}</Typography>
                  </Grid>
                </Grid>
              </div>
              {game.stock === 0 ? (
                <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: 10 }}>
                  <Chip label="No disponible" color="error" variant="filled" />
                </Grid>
              ) : (
                <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: 10 }}>
                  <Chip label="Disponible" color="info" variant="filled" />
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* POPULAR */}
      <Grid item xs={12} sx={{ paddingX: 30, paddingY: 10 }}>
        <Typography variant="h4" color="white" fontFamily={'Roboto'} style={{ marginBottom: 20 }}> Más vendidos </Typography>
        <Grid container spacing={12}>
          {popularGames.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    style={{ borderRadius: 25 }}
                    component="img"
                    alt={game.title}
                    height='200px'
                    image={import.meta.env.VITE_GAME_IMAGES_URL + game.image}
                  />
                </Link>
                <Grid sx={{ paddingTop: 2 }}>
                  <Grid container justifyContent="space-between" alignItems="center" color={'white'}>
                    <Typography fontFamily={'Roboto'} variant="h5">
                      {truncateText(game.title, 30)}
                    </Typography>
                    <Typography fontFamily={'Roboto'} variant="h5">{`${game.price}€`}</Typography>
                  </Grid>
                </Grid>
              </div>
              {game.stock === 0 ? (
                <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: 10 }}>
                  <Chip label="No disponible" color="error" variant="filled" />
                </Grid>
              ) : (
                <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: 10 }}>
                  <Chip label="Disponible" color="info" variant="filled" />
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* DISCOUNTED */}
      <Grid item xs={12} sx={{ paddingX: 30, paddingBottom: 10 }}>
        <Typography variant="h4" color="white" fontFamily={'Roboto'} style={{ paddingBottom: 20 }}> Ultimos lanzamientos </Typography>
        <Grid container spacing={12}>
          {discountedGames.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div>
                <Chip label={`${game.discount}%`} size='medium' color='primary' variant='filled' style={{ fontSize: 20, position: 'absolute', marginInlineStart: 360, color: 'black' }} />
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    style={{ borderRadius: 25 }}
                    component="img"
                    alt={game.title}
                    height='200px'
                    image={import.meta.env.VITE_GAME_IMAGES_URL + game.image}
                  />
                </Link>
                <Grid sx={{ paddingTop: 2 }}>
                  <Grid container justifyContent="space-between" alignItems="center" color={'white'}>
                    <Typography fontFamily={'Roboto'} variant="h5">
                      {truncateText(game.title, 30)}
                    </Typography>
                    <Typography fontFamily={'Roboto'} variant="h5">
                      {`${(game.price - (game.price * ((game.discount ?? 0) / 100))).toFixed(2)}€`}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              {game.stock === 0 ? (
                <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: 10 }}>
                  <Chip label="No disponible" color="error" variant="filled" />
                </Grid>
              ) : (
                <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: 10 }}>
                  <Chip label="Disponible" color="info" variant="filled" />
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>

    </>

  );
}

export default GameList;