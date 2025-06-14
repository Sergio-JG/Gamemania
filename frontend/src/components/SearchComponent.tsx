import { useEffect, useState, useRef } from 'react';
import { Grid, InputBase, IconButton, Stack, ListItem, Paper } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import GameInterface from '../interfaces/GameInterface';


const SearchComponent: React.FC = () => {

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<GameInterface[]>([]);
    const [games, setGames] = useState<GameInterface[]>([]);
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);

        const filteredResults = games.filter((game: GameInterface) =>
            game.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
        setShowResults(!!searchQuery);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/game');
                if (!response.ok) {
                    throw new Error('ERROR');
                }
                const result = await response.json();
                setGames(result);
            } catch (error) {
                console.error('ERROR fetching data:', error);
            }
        };

        fetchData();

        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Grid item xs={4} style={{ position: 'sticky' }}>
            <InputBase
                sx={{ padding: '10px', fontSize: '1rem', border: '1px solid yellow', borderRadius: '4px', background: 'white' }}
                placeholder="Search games..."
                style={{ width: '100%' }}
                onChange={handleSearch}
                value={query}
                endAdornment={
                    <IconButton>
                        <Search />
                    </IconButton>
                }
            />

            {showResults && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, width: '100%' }}>
                    <Paper style={{ animation: 'fadeIn 1s', borderRadius: '4px', borderTop: 'none' }}>
                        <Stack spacing={2}>
                            {results.map((game: GameInterface) => (
                                <ListItem key={game.gameId}>
                                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/game/${game.gameId}`}>{game.title}</Link>
                                </ListItem>
                            ))}
                        </Stack>
                    </Paper>
                </div>
            )}
        </Grid>
    );
};

export default SearchComponent;