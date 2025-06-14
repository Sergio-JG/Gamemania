import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { Genre } from "../../interfaces/GameInterface";

interface GenreSelectorProps {
    genres: Genre[];
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ genres }) => {
    const [selectedGenre, setSelectedGenre] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedGenre(event.target.value);
    };

    return (
        <FormControl variant="filled" sx={{ marginX: 2, minWidth: 120 }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
                labelId="genre-select-label"
                id="genre-select"
                value={selectedGenre}
                onChange={handleChange}
                label="Genre"
            >
                {genres.map((genre) => (
                    <MenuItem key={genre.genreId} value={genre.name}>
                        {genre.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GenreSelector;