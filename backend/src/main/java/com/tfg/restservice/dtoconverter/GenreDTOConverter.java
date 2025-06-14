package com.tfg.restservice.dtoconverter;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.GenreDTO;
import com.tfg.restservice.model.Genre;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class GenreDTOConverter {

	private final ModelMapper modelMapper;

	public GenreDTO convertToDto(Genre genre) {
		return modelMapper.map(genre, GenreDTO.class);

	}

	public Genre convertToEntity(List<GenreDTO> list) {
		return modelMapper.map(list, Genre.class);
	}

}