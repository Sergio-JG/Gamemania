package com.tfg.restservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.restservice.dto.ReviewDTO;
import com.tfg.restservice.dtoconverter.ReviewDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Game;
import com.tfg.restservice.model.Review;
import com.tfg.restservice.model.User;
import com.tfg.restservice.repository.GameRepository;
import com.tfg.restservice.repository.ReviewRepository;
import com.tfg.restservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class ReviewController {

	private final ReviewRepository reviewRepository;
	private final ReviewDTOConverter reviewDTOConverter;

	private final UserRepository userRepository;
	private final GameRepository gameRepository;
	/**
	 * Obtenemos todos los reviewos
	 *
	 * @return
	 */
	@GetMapping("/review")
	public ResponseEntity<Object> obtainAll() {
		List<Review> result = reviewRepository.findAll();
		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<ReviewDTO> dtoList = result.stream().map(reviewDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Obtenemos un reviewo en base a su ID
	 *
	 * @param id
	 * @return Null si no encuentra el reviewo
	 */
	@GetMapping("/review/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {

		Optional<Review> result = reviewRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Review review = result.get();
			ReviewDTO reviewDTO = reviewDTOConverter.convertToDto(review);
			return ResponseEntity.ok(reviewDTO);
		}
	}

	/**
	 * Insertamos un nuevo reviewoX
	 *
	 * @param nuevo
	 * @return reviewo insertado
	 */

	@PostMapping("/review")
	public ResponseEntity<Object> newReview(@RequestBody ReviewDTO reviewData) {

		Review newReview = reviewDTOConverter.convertToEntity(reviewData);
		Optional<User> reviewUserOptional = userRepository.findById(reviewData.getUserId());

		if (reviewUserOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		newReview.setUser(reviewUserOptional.get());

		Game reviewGame = gameRepository.findById(reviewData.getGameId())
				.orElseThrow(() -> new NotFoundException(reviewData.getGameId()));
		newReview.setGame(reviewGame);

		reviewRepository.save(newReview);

		ReviewDTO reviewDTO = reviewDTOConverter.convertToDto(newReview);

		return ResponseEntity.status(HttpStatus.CREATED).body(reviewDTO);
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/review/{id}")
	public ResponseEntity<Object> actualizarReview(@PathVariable UUID id, @RequestBody ReviewDTO reviewDTO) {
		Review existingReview = reviewRepository.findById(id).orElseThrow(() -> new NotFoundException(id));

		existingReview.setReviewId(id);
		existingReview.setComment(reviewDTO.getComment());
		reviewRepository.save(existingReview);

		return ResponseEntity.ok(reviewDTOConverter.convertToDto(existingReview));
	}

	/**
	 *
	 * Borra un reviewo del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/review/{id}")
	public ResponseEntity<Object> borrarReviewo(@PathVariable UUID id) {
		Review review = reviewRepository.findById(id).orElseThrow(() -> new NotFoundException(id));

		reviewRepository.delete(review);
		return ResponseEntity.noContent().build();
	}

}