package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.PlatformDTO;
import com.tfg.restservice.model.Platform;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class PlatformDTOConverter {

	private final ModelMapper modelMapper;

	public PlatformDTO convertToDto(Platform platform) {
		return modelMapper.map(platform, PlatformDTO.class);

	}

	public Platform convertToEntity(PlatformDTO platformDTO) {
		return modelMapper.map(platformDTO, Platform.class);
	}

}