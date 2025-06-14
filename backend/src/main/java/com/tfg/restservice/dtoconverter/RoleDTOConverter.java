package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.RoleDTO;
import com.tfg.restservice.model.Role;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class RoleDTOConverter {

	private final ModelMapper modelMapper;

	public RoleDTO convertToDto(Role role) {
		return modelMapper.map(role, RoleDTO.class);

	}

	public Role convertToEntity(RoleDTO roleDTO) {
		return modelMapper.map(roleDTO, Role.class);
	}

}