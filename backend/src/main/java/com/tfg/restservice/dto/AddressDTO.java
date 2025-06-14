package com.tfg.restservice.dto;

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

public class AddressDTO {

	private UUID addressId;

	private String streetAddress;

	private String city;

	private String state;

	private String postalCode;

	private String country;

}