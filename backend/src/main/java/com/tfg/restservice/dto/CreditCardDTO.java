package com.tfg.restservice.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CreditCardDTO {

	private UUID creditCardId;

	private String cardNumber;

	private String cardHolderName;

	private String expirationDate;

	private String cvv;

	private String billingAddress;

	private UUID userId;

}