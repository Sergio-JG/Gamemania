import { useEffect, useState, useRef } from 'react';
import { Grid, InputBase, IconButton, Stack, ListItem, Paper, useMediaQuery } from '@mui/material';
import Search from '@mui/icons-material/Search.js';
import { Link } from 'react-router-dom';
import GameInterface from '../interfaces/GameInterface';
import { useTheme } from '@mui/material/styles';

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<GameInterface[]>([]);
    const [games, setGames] = useState<GameInterface[]>([]);
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={12}
            style={{
                position: 'sticky',
                zIndex: 10,
                margin: isMobile ? '8px 0' : '0',
                width: '100%',
            }}
            ref={searchRef}
        >
            <InputBase
                sx={{
                    padding: isMobile ? '8px' : '10px',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    border: '1px solid #bdbdbd',
                    borderRadius: '4px',
                    background: '#f5f5f5',
                    color: '#333',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
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
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        width: '100%',
                        maxHeight: isMobile ? 200 : 300,
                        overflowY: 'auto',
                    }}
                >
                    <Paper
                        style={{
                            animation: 'fadeIn 1s',
                            borderRadius: '4px',
                            borderTop: 'none',
                            background: '#eeeeee',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Stack spacing={1}>
                            {results.map((game: GameInterface) => (
                                <ListItem
                                    key={game.gameId}
                                    sx={{
                                        padding: isMobile ? '6px 8px' : '8px 16px',
                                        '&:hover': {
                                            background: '#e0e0e0',
                                        },
                                    }}
                                >
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#333',
                                            fontWeight: 500,
                                        }}
                                        to={`/game/${game.gameId}`}
                                    >
                                        {game.title}
                                    </Link>
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