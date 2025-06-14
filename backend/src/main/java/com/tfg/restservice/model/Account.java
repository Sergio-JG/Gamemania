package com.tfg.restservice.model;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.lang.NonNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity

@Table(name = "account")

@Getter
@Setter

public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "account_id")
	@NonNull
	private UUID accountId;

	@ManyToOne
	@JoinColumn(name = "provider_id")
	private Provider provider;

	@Column(name = "account_holder_name")
	private String accountHolderName;

	@Column(name = "account_number")
	private String accountNumber;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "bank_address")
	private String bankAddress;

	@Column(name = "bank_routing_number")
	private String bankRoutingNumber;

	@Column(name = "account_balance")
	private BigDecimal accountBalance;
}