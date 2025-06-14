package com.tfg.restservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.restservice.dto.GameDTO;
import com.tfg.restservice.dtoconverter.GameDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Game;
import com.tfg.restservice.repository.GameRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class GameController {

	private final GameRepository gameRepository;
	private final GameDTOConverter gameDTOConverter;

	/**
	 * Obtain all game
	 *
	 * @return
	 */

	@GetMapping("/game")
	public ResponseEntity<Object> obtainAll() {
		List<Game> result = gameRepository.findAll();
		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<GameDTO> dtoList = result.stream().map(gameDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Obtain game via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/game/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable @NonNull UUID id) {

		Optional<Game> result = gameRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Game game = result.get();
			GameDTO gameDTO = gameDTOConverter.convertToDto(game);
			return ResponseEntity.ok(gameDTO);
		}
	}

	/**
	 * Insert Game
	 *
	 * @param New
	 * @return New Game inserted
	 */

	@PostMapping("/game")
	public ResponseEntity<Object> addGame(@RequestBody GameDTO gameData) {

		Game newGame = gameDTOConverter.convertToEntity(gameData);
		newGame.setImage("default.jpg");
		return ResponseEntity.status(HttpStatus.CREATED).body(gameRepository.save(newGame));
	}

	/**
	 * Edit Game
	 * 
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/game/{id}")
	public ResponseEntity<Object> updateGame(@RequestBody GameDTO gameData, @PathVariable UUID id) {

		Optional<Game> result = gameRepository.findById(id);

		if (result.isEmpty()) {

			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());

		} else {

			Game newGame = new Game();

			newGame.setGameId(id);
			newGame.setTitle(gameData.getTitle());
			newGame.setPrice(gameData.getPrice());
			newGame.setDescription(gameData.getDescription());
			newGame.setReleaseDate(gameData.getReleaseDate());
			newGame.setNumberOfSales(gameData.getNumberOfSales());
			newGame.setStock(gameData.getStock());
			newGame.setTotalScore(gameData.getTotalScore());

			return ResponseEntity.ok(gameRepository.save(newGame));

		}
	}

	/**
	 *
	 * Delete Game
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/game/{id}")
	public ResponseEntity<Object> deleteGame(@PathVariable UUID id) {

		Game game = gameRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		gameRepository.delete(game);

		return ResponseEntity.noContent().build();
	}
}