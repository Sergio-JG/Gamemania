package com.tfg.restservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.restservice.dto.GenreDTO;
import com.tfg.restservice.dtoconverter.GenreDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Genre;
import com.tfg.restservice.repository.GenreRepository;

import io.micrometer.common.lang.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class GenreController {

	private final GenreRepository genreRepository;
	private final GenreDTOConverter genreDTOConverter;

	/**
	 * Obtain all genre
	 *
	 * @return
	 */

	@GetMapping("/genre")
	public ResponseEntity<Object> obtainAll() {

		List<Genre> result = genreRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		} else {

			List<GenreDTO> dtoList = result.stream().map(genreDTOConverter::convertToDto).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Obtain genre via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/genre/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable @NonNull UUID id) {

		Optional<Genre> result = genreRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {

			Genre genre = result.get();
			GenreDTO genreDTO = genreDTOConverter.convertToDto(genre);
			return ResponseEntity.ok(genreDTO);
		}
	}

	/**
	 * Insert Genre
	 *
	 * @param New
	 * @return New Genre inserted
	 */

	@PostMapping("/genre")
	public ResponseEntity<Object> newGenre(@RequestBody GenreDTO newG) {

		Genre newGenre = new Genre();
		newGenre.setName(newG.getName());

		return ResponseEntity.status(HttpStatus.CREATED).body(genreRepository.save(newGenre));
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/genre/{id}")
	public ResponseEntity<Object> editGenre(@RequestBody Genre genreData, @PathVariable @NonNull UUID id) {

		Optional<Genre> result = genreRepository.findById(id);

		if (result.isEmpty()) {

			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());

		} else {

			Genre newGenre = new Genre();
			newGenre.setGenreId(id);
			newGenre.setName(genreData.getName());

			return ResponseEntity.ok(genreRepository.save(newGenre));
		}
	}

	/**
	 *
	 * Borra un genreo del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/genre/{id}")
	public ResponseEntity<Object> deleteGenre(@PathVariable @NonNull UUID id) {

		Genre genre = genreRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		genreRepository.delete(genre);

		return ResponseEntity.noContent().build();
	}
}