package com.tfg.restservice.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "game")

public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "game_id")
	@NonNull
	private UUID gameId;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "price", nullable = false, precision = 10, scale = 2)
	private BigDecimal price;

	@Column(name = "discountedPrice", nullable = false, precision = 10, scale = 2)
	private BigDecimal discountedPrice;

	@Column(name = "discount")
	private int discount;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "release_date")
	private Date releaseDate;

	@Column(name = "number_of_sales")
	private int numberOfSales;

	@Column(name = "stock")
	private int stock;

	@Column(name = "total_score", precision = 3, scale = 1)
	private BigDecimal totalScore;

	@Column(name = "image")
	private String image;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "game_platform", joinColumns = @JoinColumn(name = "game_id", referencedColumnName = "game_id"), inverseJoinColumns = @JoinColumn(name = "platform_id", referencedColumnName = "platform_id"))
	@JsonBackReference
	private List<Platform> platforms;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "game_genre", joinColumns = @JoinColumn(name = "game_id", referencedColumnName = "game_id"), inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "genre_id"))
	@JsonBackReference
	private List<Genre> genres;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "game")
	private List<Review> reviews;

}
