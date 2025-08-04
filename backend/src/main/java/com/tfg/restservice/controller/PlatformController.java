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

import com.tfg.restservice.dto.PlatformDTO;
import com.tfg.restservice.dtoconverter.PlatformDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Platform;
import com.tfg.restservice.repository.PlatformRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class PlatformController {

	private final PlatformRepository platformRepository;
	private final PlatformDTOConverter platformDTOConverter;

	/**
	 * Retrieve all platforms.
	 *
	 * @return List of all platforms or a not found message if empty.
	 */

	@GetMapping("/platform")
	public ResponseEntity<Object> obtainAll() {
		List<Platform> result = platformRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		List<PlatformDTO> dtoList = result.stream().map(platformDTOConverter::convertToDto).toList();

		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Retrieve a single platform by its ID.
	 *
	 * @param id The UUID of the platform.
	 * @return The platform DTO if found, otherwise a not found message.
	 */

	@GetMapping("/platform/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {

		Optional<Platform> result = platformRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Platform platform = result.get();
			PlatformDTO platformDTO = platformDTOConverter.convertToDto(platform);
			return ResponseEntity.ok(platformDTO);
		}
	}

	/**
	 * Create a new platform.
	 *
	 * @param platformData The platform data to create.
	 * @return The created platform DTO.
	 */

	@PostMapping("/platform")
	public ResponseEntity<Object> addPlatform(@RequestBody PlatformDTO platformData) {
		Platform newPlatform = new Platform();
		newPlatform.setName(platformData.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body(platformRepository.save(newPlatform));
	}

	/**
	 * Update an existing platform.
	 *
	 * @param platformData The updated platform data.
	 * @param id           The UUID of the platform to update.
	 * @return The updated platform DTO if found, otherwise a not found message.
	 */

	@PutMapping("/platform/{id}")
	public ResponseEntity<Object> updatePlatform(@RequestBody PlatformDTO platformData, @PathVariable UUID id) {
		Optional<Platform> result = platformRepository.findById(id);
		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Platform newPlatform = new Platform();
			newPlatform.setPlatformId(id);
			newPlatform.setName(platformData.getName());
			return ResponseEntity.ok(platformRepository.save(newPlatform));
		}
	}

	/**
	 * Delete a platform by its ID.
	 *
	 * @param id The UUID of the platform to delete.
	 * @return No content if deleted, otherwise a not found message.
	 */

	@DeleteMapping("/platform/{id}")
	public ResponseEntity<Object> deletePlatform(@PathVariable UUID id) {
		Platform platform = platformRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		platformRepository.delete(platform);
		return ResponseEntity.noContent().build();
	}
}