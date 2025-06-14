package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.CreditCardDTO;
import com.tfg.restservice.model.CreditCard;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class CreditCardDTOConverter {

	private final ModelMapper modelMapper;

	public CreditCardDTO convertToDto(CreditCard creditCard) {
		return modelMapper.map(creditCard, CreditCardDTO.class);

	}

	public CreditCard convertToEntity(CreditCardDTO creditCardDTO) {
		return modelMapper.map(creditCardDTO, CreditCard.class);
	}

}