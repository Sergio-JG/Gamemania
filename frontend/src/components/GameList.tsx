import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../interfaces/GameInterface';
import { Chip, CircularProgress } from '@mui/material';
import axios from 'axios';

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/game');
      if (response.status === 200) {
        const result = response.data;
        setGames(result);
      } else {
        throw new Error('ERROR fetching data:');
      }
    } catch (error) {
      console.error('ERROR fetching data:', error);
    } finally {
      setLoading(false);
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

  const slugify = (text: string): string =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

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
      <Link to={`/${slugify(game.title)}`} state={{ gameId: game.gameId }}>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center border border-yellow-50 rounded-lg p-8 w-full h-full">
        <Typography
          className="mt-4 text-lg font-semibold text-white"
          fontFamily="Roboto"
        >
          Cargando juegos... <span className="text-gray-400 text-base">(la instancia es gratis)</span>
        </Typography>
        <CircularProgress className="ms-2" color="primary" />
      </div>
    );
  }

  return (
    <>
      {/* LAST RELEASE */}
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 pt-8 mb-12">
        <div className="mb-8 text-2xl sm:text-4xl tracking-tight font-extrabold text-start text-white font-['Roboto_Slab','Roboto',sans-serif]">
          Últimos lanzamientos
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lastReleasedGames.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>

      {/* FAKE ADD */}
      <div className="w-full flex justify-center my-8">
        <div className="bg-[#222] text-white px-6 py-8 rounded-xl w-full max-w-5xl text-center font-roboto text-lg sm:text-2xl font-semibold shadow-lg">
          <span role="img" aria-label="ad" className="text-2xl">
            📢
          </span>{' '}
          ¡Publicidad! Compra tus accesorios gamer aquí.
        </div>
      </div>

      {/* POPULAR */}
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 py-8 mb-12">
        <div className="mb-8 text-2xl sm:text-4xl tracking-tight font-extrabold text-start text-white font-['Roboto_Slab','Roboto',sans-serif]">
          Más vendidos
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularGames.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>

      {/* FAKE ADD */}
      <div className="w-full flex justify-center my-8">
        <div className="bg-[#222] text-white px-6 py-8 rounded-xl w-full max-w-5xl text-center font-roboto text-lg sm:text-2xl font-semibold shadow-lg">
          <span role="img" aria-label="ad" className="text-2xl">
            🎮
          </span>{' '}
          ¡Publicidad! Descubre los mejores teclados mecánicos.
        </div>
      </div>

      {/* DISCOUNTED */}
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 pb-8">
        <div className="mb-8 text-2xl sm:text-4xl tracking-tight font-extrabold text-start text-white font-['Roboto_Slab','Roboto',sans-serif]">
          Juegos en oferta
        </div>
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
