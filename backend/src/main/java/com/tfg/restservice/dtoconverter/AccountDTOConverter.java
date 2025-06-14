package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.AccountDTO;
import com.tfg.restservice.model.Account;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class AccountDTOConverter {

	private final ModelMapper modelMapper;

	public AccountDTO convertToDto(Account account) {
		return modelMapper.map(account, AccountDTO.class);

	}

	public Account convertToEntity(AccountDTO accountDTO) {
		return modelMapper.map(accountDTO, Account.class);
	}

}