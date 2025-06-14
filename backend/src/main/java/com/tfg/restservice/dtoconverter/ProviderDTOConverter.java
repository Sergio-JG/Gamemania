package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.ProviderDTO;
import com.tfg.restservice.model.Provider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class ProviderDTOConverter {

	private final ModelMapper modelMapper;

	public ProviderDTO convertToDto(Provider provider) {
		return modelMapper.map(provider, ProviderDTO.class);

	}

	public Provider convertToEntity(ProviderDTO providerDTO) {
		return modelMapper.map(providerDTO, Provider.class);
	}

}