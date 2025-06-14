package com.tfg.restservice.dto;

import java.math.BigDecimal;
import java.sql.Date;
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

public class PurchaseDTO {

	private UUID purchaseId;

	private UUID providerId;

	private String firstName;

	private Date purchaseDate;

	private List<PurchaseDetailDTO> purchaseDetail;

	private BigDecimal totalAmount;

}