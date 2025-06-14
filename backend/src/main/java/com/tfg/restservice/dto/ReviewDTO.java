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

public class ReviewDTO {

	private UUID reviewId;

	private UUID userId;
	private String username;
	private String profilePic;

	private UUID gameId;

	private BigDecimal score;
	private String comment;
}
