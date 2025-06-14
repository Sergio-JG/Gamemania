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

public class GameDTO {

	private UUID gameId;

	private String title;

	private BigDecimal price;

	private BigDecimal discountedPrice;

	private String description;

	private Date releaseDate;

	private int numberOfSales;

	private int stock;

	private int discount;

	private BigDecimal totalScore;

	private String image;

	private List<GenreDTO> genres;

	private List<PlatformDTO> platforms;

	private List<ReviewDTO> reviews;
}