import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../interfaces/GameInterface';
import { Chip } from '@mui/material';


const FakeGameList = () => {

  const [games] = useState<Game[]>([
    {
      gameId: "00000000-0000-0000-0000-000000000100",
      title: "The Legend of Zelda: Breath of the Wild",
      price: 59.99,
      discountedPrice: 53.99,
      description: "Explora Hyrule en mundo abierto.",
      releaseDate: "2017-03-03",
      numberOfSales: 15000000,
      stock: 3000,
      discount: 0,
      totalScore: 9.5,
      image: "TheLegendOfZeldaBreathOfTheWild.jpg",
      genres: [
        { genreId: "00000000-0000-0000-0000-000000000020", name: "Acción" }
      ],
      platforms: [
        { platformId: "00000000-0000-0000-0000-000000000010", name: "PC" }
      ],
      reviews: [
        {
          reviewId: "00000000-0000-0000-0000-000000000200",
          userId: "00000000-0000-0000-0000-000000000050",
          username: "john_doe",
          profilePic: "john_doe.jpg",
          gameId: "00000000-0000-0000-0000-000000000100",
          score: 4.5,
          comment: "Exciting Aventura!"
        }
      ]
    },
    {
      gameId: "00000000-0000-0000-0000-000000000101",
      title: "The Witcher 3: Wild Hunt",
      price: 39.99,
      discountedPrice: 31.99,
      description: "Sé Geralt en este épico RPG.",
      releaseDate: "2015-05-19",
      numberOfSales: 10000000,
      stock: 3000,
      discount: 0,
      totalScore: 9.8,
      image: "TheWitcher3WildHunt.jpg",
      genres: [
        { genreId: "00000000-0000-0000-0000-000000000023", name: "RPG" }
      ],
      platforms: [
        { platformId: "00000000-0000-0000-0000-000000000011", name: "PlayStation" }
      ],
      reviews: [
        {
          reviewId: "00000000-0000-0000-0000-000000000201",
          userId: "00000000-0000-0000-0000-000000000051",
          username: "alice_wonder",
          profilePic: "alice.jpg",
          gameId: "00000000-0000-0000-0000-000000000101",
          score: 4.2,
          comment: "Great RPG!"
        }
      ]
    },
    {
      gameId: "00000000-0000-0000-0000-000000000102",
      title: "Red Dead Redemption 2",
      price: 49.99,
      discountedPrice: 42.49,
      description: "Forajido en el salvaje oeste.",
      releaseDate: "2018-10-26",
      numberOfSales: 11000000,
      stock: 3000,
      discount: 0,
      totalScore: 9.7,
      image: "RedDeadRedemption2.jpg",
      genres: [
        { genreId: "00000000-0000-0000-0000-000000000020", name: "Acción" }
      ],
      platforms: [],
      reviews: []
    }
  ]);

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
      <Link to={`/${slugify(game.title)}`} state={{ gameId: game.gameId, fakegames: games }}>
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

  const truncateText = (text: string, maxLen = 30) =>
    text && text.length > maxLen ? `${text.slice(0, maxLen - 1)}…` : text;

  return (
    <>
      <div className="w-full px-2 sm:px-8 md:px-24 lg:px-32 pt-8 mb-12">
        <div className="mb-8 text-2xl sm:text-4xl tracking-tight font-extrabold text-start text-white font-['Roboto_Slab','Roboto',sans-serif]">
          Novedades
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.gameId} game={game} showDiscount={true} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FakeGameList;
