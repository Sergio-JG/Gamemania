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

public class SaleDTO {

	private UUID saleId;

	private UUID userId;

	private String firstName;

	private String secondName;

	private Date saleDate;

	private List<SaleDetailDTO> saleDetail;

	private BigDecimal totalAmount;

}