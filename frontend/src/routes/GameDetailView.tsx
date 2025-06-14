import { Chip, Container, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Game, Genre, Platform, Review } from '../interfaces/GameInterface';
import axios from 'axios';
import StarRating from '../components/StarRating';
import BuyCard from '../components/selector/BuyCard';

const GameDetail = () => {

  type GenreType = 'Acción' | 'Aventura' | 'Rol' | 'Estrategia' | 'Simulación' | 'Deportes' | 'Puzzle' | 'Carreras' | 'Peleas' | 'Plataformas' | 'Disparos' | 'Survival' | 'Sandbox' | 'Horror' | 'MundoAbierto';

  const genreColors: Record<GenreType, string> = {
    Acción: "red",
    Aventura: "blue",
    Rol: "purple",
    Estrategia: "green",
    Simulación: "orange",
    Deportes: "yellow",
    Puzzle: "cyan",
    Carreras: "magenta",
    Peleas: "maroon",
    Plataformas: "lime",
    Disparos: "olive",
    Survival: "teal",
    Sandbox: "navy",
    Horror: "brown",
    MundoAbierto: "indigo"
  };

  type PlatformType = 'PC' | 'PlayStation' | 'Xbox' | 'NintendoSwitch' | 'Mobile' | 'VR' | 'Mac' | 'Linux';

  const platformColors: Record<PlatformType, string> = {
    PC: "gray",
    PlayStation: "blue",
    Xbox: "green",
    NintendoSwitch: "red",
    Mobile: "orange",
    VR: "purple",
    Mac: "silver",
    Linux: "olive"
  };

  const { id } = useParams();
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/game/${id}`);
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
    fetchGameDetails();
  }, [id]);

  return (
    <>
      <Header />
      <main style={{ background: 'rgb(41, 41, 41)' }}>
        <Container sx={{ paddingY: 10 }}>

          <Typography fontFamily="Roboto" variant="h2" color={'white'} gutterBottom>{game?.title}</Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src={import.meta.env.VITE_GAME_IMAGES_URL + game?.image} alt="Carousel Image" width='100%' style={{ border: 'solid 0.5px gray', borderRadius: 25 }} />
            </Grid>
            <Grid item xs={6}>
              <List sx={{ border: 'solid 0.5px gray', padding: 5, borderRadius: 6 }}>
                <ListItem> <Typography color={'white'}> Desarrollador:	Nintendo </Typography></ListItem>
                <ListItem> <Typography color={'white'}> Distribuidor:	Nintendo </Typography></ListItem>
                <ListItem> <Typography color={'white'}> Fecha de lanzamiento:	3 marzo 2017 </Typography></ListItem>
                <ListItem> <Typography color={'white'}> Género: </Typography>	{game?.genres.map((genre: Genre) => {
                  const genreColor = genreColors[genre.name as GenreType];
                  return (
                    <span style={{ paddingInlineStart: 10 }}>
                      <Chip sx={{ bgcolor: genreColor, color: 'white' }} key={genre.genreId} label={genre.name} style={{ marginRight: '5px' }} />
                    </span>
                  );
                })}
                </ListItem>
                <ListItem> <Typography color={'white'}> Plataformas: </Typography>{game?.platforms.map((platform: Platform) => {
                  const platformColor = platformColors[platform.name as PlatformType];
                  return (
                    <span key={platform.platformId} style={{ paddingInlineStart: 10 }}>
                      <Chip sx={{ bgcolor: platformColor, color: 'white' }} label={platform.name} style={{ marginRight: '5px' }} />
                    </span>
                  );
                })}
                </ListItem>
              </List>
            </Grid>
          </Grid>

          {game && <BuyCard game={game} />}

          <Divider />

          <Grid sx={{ padding: 2, marginY: 2 }}>
            <Typography color={'white'} variant="h4" gutterBottom> Descripción </Typography>
            <Typography color={'white'} variant="body1">{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}{game?.description}</Typography>
          </Grid>

          <Divider />

          <Grid sx={{ padding: 2, marginY: 2 }}>
            <Typography color={'white'} variant="h4" gutterBottom> Reviews </Typography>
            <Grid container>
              {game?.reviews?.map((review: Review) => (
                <Grid item xs={4} sx={{ border: 'solid 0.5px gray', borderRadius: 5, padding: 2, marginY: 2, marginInlineEnd: 2, background: 'rgb(41, 41, 31)' }}>
                  <Grid container sx={{ paddingY: 1, alignItems: 'center' }}>
                    <img width='40px' style={{ borderRadius: 25 }} src={import.meta.env.VITE_USER_IMAGES_URL + 'default.jpg'}></img>
                    <Typography color='white' sx={{ paddingX: 2, paddingInlineEnd: 10 }} variant="body1">{review.username}</Typography>
                    <StarRating score={review.score} />
                  </Grid>
                  <Typography color='white' sx={{ paddingY: 2 }} variant="body1">{review.comment}</Typography>
                </Grid>
              ))}
            </Grid>

          </Grid>

        </Container>
      </main >
      <Footer />
    </>
  );
};

export default GameDetail;
