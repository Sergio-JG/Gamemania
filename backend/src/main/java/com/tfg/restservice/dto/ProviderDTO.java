package com.tfg.restservice.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Getter
@Setter

public class ProviderDTO {

	private UUID providerId;

	private String name;

	private String address;

	private String phone;

	private String email;

	private List<AccountDTO> account;

}