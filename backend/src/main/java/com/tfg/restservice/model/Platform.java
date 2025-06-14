package com.tfg.restservice.model;

import java.util.List;
import java.util.UUID;

import org.springframework.lang.NonNull;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
@Table(name = "platform")

@Getter
@Setter

public class Platform {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "platform_id")
	@NonNull
	private UUID platformId;

	@Column(name = "name")
	private String name;

	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "platforms")
	private List<Game> games;

}
