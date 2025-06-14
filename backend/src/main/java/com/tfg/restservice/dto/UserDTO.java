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

public class UserDTO {

	private UUID userId;

	private String firstName;

	private String lastName;

	private String email;

	private String username;

	private String phone;

	private String profilePic;

	private String password;

	private UUID socialId;
	private SocialDTO social;

	private UUID roleId;
	private RoleDTO role;

	private UUID addressId;
	private AddressDTO address;

	private List<CreditCardDTO> creditCard;

}
