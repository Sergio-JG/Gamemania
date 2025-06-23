import { Chip, Container, Divider, Grid, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
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

          <div className="mb-8 text-2xl sm:text-4xl tracking-tight font-extrabold text-start text-white font-['Roboto_Slab','Roboto',sans-serif]">
            {game?.title}
          </div>

          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <img
                src={import.meta.env.VITE_GAME_IMAGES_URL + game?.image}
                alt="Carousel Image"
                style={{
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  border: 'solid 0.5px gray',
                  borderRadius: 25,
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  flex: 1,
                  display: 'block'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <List
                sx={{
                  border: 'solid 0.5px gray',
                  padding: 5,
                  borderRadius: 6,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <ListItem>
                  <span className="text-white text-base font-medium">Desarrollador: Nintendo</span>
                </ListItem>
                <ListItem>
                  <span className="text-white text-base font-medium">Distribuidor: Nintendo</span>
                </ListItem>
                <ListItem>
                  <span className="text-white text-base font-medium">Fecha de lanzamiento: 3 marzo 2017</span>
                </ListItem>
                <ListItem>
                  <span className="text-white text-base font-medium">Género:</span>
                  {game?.genres.map((genre: Genre) => {
                    const genreColor = genreColors[genre.name as GenreType];
                    return (
                      <span key={genre.genreId} style={{ paddingInlineStart: 10 }}>
                        <Chip sx={{ bgcolor: genreColor, color: 'white' }} label={genre.name} style={{ marginRight: '5px' }} />
                      </span>
                    );
                  })}
                </ListItem>
                <ListItem>
                  <span className="text-white text-base font-medium">Plataformas:</span>
                  {game?.platforms.map((platform: Platform) => {
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

          <Grid sx={{ padding: 2, margin: 2 }}>
            <div className="text-white text-2xl font-bold mb-2">Descripción</div>
            <div className="text-white text-base">{game?.description}</div>
          </Grid>

          <Divider />

          <Grid sx={{ padding: 2, margin: 2 }}>
            <div className="text-white text-2xl font-bold mb-2">Reviews</div>
            {game?.reviews?.length === 0 && (
              <div className=" text-white text-base">No hay reviews para este juego.</div>
            )}
            {game?.reviews?.map((review: Review, idx: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={idx}
                sx={{
                  border: 'solid 0.5px gray',
                  borderRadius: 5,
                  padding: 2,
                  marginLeft: 2,
                  marginTop: 2,
                  background: 'rgb(41, 41, 31)',
                }}
              >
                <Grid container sx={{ paddingY: 1, alignItems: 'center' }}>
                  <img
                    width="40px"
                    style={{ borderRadius: 25 }}
                    src={import.meta.env.VITE_USER_IMAGES_URL + 'default.jpg'}
                    alt="User"
                  />
                  <span className="text-white px-2 text-base font-semibold">{review.username}</span>
                  <StarRating score={review.score} />
                </Grid>
                <div className="text-white py-2 text-base">{review.comment}</div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default GameDetail;

