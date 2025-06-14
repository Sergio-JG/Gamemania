package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.AddressDTO;
import com.tfg.restservice.model.Address;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class AddressDTOConverter {

	private final ModelMapper modelMapper;

	public AddressDTO convertToDto(Address address) {
		return modelMapper.map(address, AddressDTO.class);

	}

	public Address convertToEntity(AddressDTO addressDTO) {
		return modelMapper.map(addressDTO, Address.class);
	}

}