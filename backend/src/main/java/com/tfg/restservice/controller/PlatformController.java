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
	 * Obtain all platform
	 *
	 * @return
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
	 * Obtain platform via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
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
	 * Insert Platform
	 *
	 * @param New
	 * @return New Platform inserted
	 */

	@PostMapping("/platform")
	public ResponseEntity<Object> addPlatform(@RequestBody PlatformDTO platformData) {

		Platform newPlatform = new Platform();

		newPlatform.setName(platformData.getName());

		return ResponseEntity.status(HttpStatus.CREATED).body(platformRepository.save(newPlatform));
	}

	/**
	 * Edit Platform
	 * 
	 * @param platformData
	 * @param id
	 * @return
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
	 *
	 * Delete Platform
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/platform/{id}")
	public ResponseEntity<Object> deletePlatform(@PathVariable UUID id) {

		Platform platform = platformRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		platformRepository.delete(platform);

		return ResponseEntity.noContent().build();
	}
}