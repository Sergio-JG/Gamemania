package com.tfg.restservice.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "sale")

@Getter
@Setter

public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "sale_id")
	@NonNull
	private UUID saleId;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "sale_date")
	private Date saleDate;

	@JsonManagedReference
	@OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SaleDetail> saleDetail;

	@Column(name = "total_amount", precision = 10, scale = 2)
	private BigDecimal totalAmount;

}
