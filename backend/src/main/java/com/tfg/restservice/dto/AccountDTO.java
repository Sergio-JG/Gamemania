package com.tfg.restservice.dto;

import java.math.BigDecimal;
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

public class AccountDTO {

	private UUID accountId;

	private String bankName;

	private String accountNumber;

	private String accountHolderName;

	private String bankAddress;

	private String bankRoutingNumber;

	private BigDecimal accountBalance;

}
