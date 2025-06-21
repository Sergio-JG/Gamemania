import CardMedia from '@mui/material/CardMedia';
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

  // Card component for reuse
  const GameCard = ({
    game,
    showDiscount = false,
  }: {
    game: Game;
    showDiscount?: boolean;
  }) => (
    <div className="relative flex flex-col bg-[#18181b] rounded-2xl shadow-md overflow-hidden h-full">
      {showDiscount && (
        <Chip
          label={`${game.discount}%`}
          size="medium"
          color="primary"
          variant="filled"
          style={{
            fontSize: 20,
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'black',
            zIndex: 10,
          }}
        />
      )}
      <Link to={`/game/${game.gameId}`}>
        <CardMedia
          style={{ borderRadius: 20 }}
          component="img"
          alt={game.title}
          height="200px"
          image={import.meta.env.VITE_GAME_IMAGES_URL + game.image}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="flex flex-col flex-1 justify-between p-4">
        <div className="flex justify-between items-center text-white">
          <Typography fontFamily={'Roboto'} variant="h5" className="!text-lg !font-bold">
            {truncateText(game.title, 30)}
          </Typography>
          <Typography fontFamily={'Roboto'} variant="h5" className="!text-lg !font-bold">
            {showDiscount
              ? `${(game.price - (game.price * ((game.discount ?? 0) / 100))).toFixed(2)}€`
              : `${game.price}€`}
          </Typography>
        </div>
        <div className="flex justify-between items-center pt-2">
          {game.stock === 0 ? (
            <Chip label="No disponible" color="error" variant="filled" />
          ) : (
            <Chip label="Disponible" color="info" variant="filled" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* LAST RELEASE */}
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 pt-8">
        <Typography variant="h4" color="white" fontFamily={'Roboto'} className="mb-5 !text-2xl sm:!text-3xl">
          Últimos lanzamientos
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lastReleasedGames.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>

      {/* FAKE ADD */}
      <div className="w-full flex justify-center my-8">
        <div className="bg-[#222] text-white px-6 py-6 rounded-xl min-w-[320px] text-center font-roboto text-lg sm:text-xl">
          <span role="img" aria-label="ad">
            📢
          </span>{' '}
          ¡Publicidad! Compra tus accesorios gamer aquí.
        </div>
      </div>

      {/* POPULAR */}
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 py-8">
        <Typography variant="h4" color="white" fontFamily={'Roboto'} className="mb-5 !text-2xl sm:!text-3xl">
          Más vendidos
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularGames.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>

      {/* FAKE ADD */}
      <div className="w-full flex justify-center my-8">
        <div className="bg-[#222] text-white px-6 py-6 rounded-xl min-w-[320px] text-center font-roboto text-lg sm:text-xl">
          <span role="img" aria-label="ad">
            🎮
          </span>{' '}
          ¡Publicidad! Descubre los mejores teclados mecánicos.
        </div>
      </div>

      {/* DISCOUNTED */}
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 pb-8">
        <Typography variant="h4" color="white" fontFamily={'Roboto'} className="mb-5 !text-2xl sm:!text-3xl">
          Juegos en oferta
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {discountedGames.map((game, index) => (
            <GameCard key={index} game={game} showDiscount />
          ))}
        </div>
      </div>
    </>
  );
};

export default GameList;
