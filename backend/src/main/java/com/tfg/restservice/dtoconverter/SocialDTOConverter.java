package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.SocialDTO;
import com.tfg.restservice.model.Social;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class SocialDTOConverter {

	private final ModelMapper modelMapper;

	public SocialDTO convertToDto(Social customer) {
		return modelMapper.map(customer, SocialDTO.class);

	}

	public Social convertToEntity(SocialDTO customerDTO) {
		return modelMapper.map(customerDTO, Social.class);
	}

}