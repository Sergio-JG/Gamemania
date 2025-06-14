package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.GameDTO;
import com.tfg.restservice.model.Game;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class GameDTOConverter {

	private final ModelMapper modelMapper;

	public GameDTO convertToDto(Game game) {
		return modelMapper.map(game, GameDTO.class);

	}

	public Game convertToEntity(GameDTO gameDTO) {
		return modelMapper.map(gameDTO, Game.class);
	}

}