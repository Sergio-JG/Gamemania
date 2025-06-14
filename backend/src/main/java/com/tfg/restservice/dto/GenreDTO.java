package com.tfg.restservice.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data

@NoArgsConstructor
@AllArgsConstructor

public class GenreDTO {

	private UUID genreId;

	private String name;

}
