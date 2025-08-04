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

import com.tfg.restservice.dto.ProviderDTO;
import com.tfg.restservice.dtoconverter.ProviderDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Provider;
import com.tfg.restservice.repository.ProviderRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class ProviderController {

	private final ProviderRepository providerRepository;
	private final ProviderDTOConverter providerDTOConverter;

	/**
	 * Retrieve all providers.
	 *
	 * @return List of all provider or a not found message if empty.
	 */

	@GetMapping("/provider")
	public ResponseEntity<List<ProviderDTO>> getAllProviders() {
		List<Provider> providers = providerRepository.findAll();
		List<ProviderDTO> dtoList = providers.stream().map(providerDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Retrieve a single provider by its ID.
	 *
	 * @param id The UUID of the account.
	 * @return The providerDTO if found, otherwise a not found message.
	 */

	@GetMapping("/provider/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {

		Optional<Provider> result = providerRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Provider provider = result.get();
			ProviderDTO providerDTO = providerDTOConverter.convertToDto(provider);
			return ResponseEntity.ok(providerDTO);
		}
	}

	/**
	 * Create a new account.
	 *
	 * @param providerData The provider data to create.
	 * @return The created providerDTO.
	 */

	@PostMapping("/provider")
	public ResponseEntity<Object> addProvider(@RequestBody ProviderDTO providerData) {

		Provider newProvider = new Provider();

		newProvider.setName(providerData.getName());
		newProvider.setAddress(providerData.getAddress());
		newProvider.setPhone(providerData.getPhone());
		newProvider.setEmail(providerData.getEmail());

		return ResponseEntity.status(HttpStatus.CREATED).body(providerRepository.save(newProvider));
	}

	/**
	 * Update an existing account.
	 *
	 * @param providerData The updated provider data.
	 * @param id           The UUID of the provider to update.
	 * @return The updated providerDTO if found, otherwise a not found message.
	 */

	@PutMapping("/provider/{id}")
	public ResponseEntity<Object> updateProvider(@RequestBody ProviderDTO providerData, @PathVariable UUID id) {

		Optional<Provider> result = providerRepository.findById(id);

		if (result.isEmpty()) {

			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());

		} else {

			Provider newProvider = new Provider();

			newProvider.setProviderId(id);
			newProvider.setName(providerData.getName());
			newProvider.setAddress(providerData.getAddress());
			newProvider.setPhone(providerData.getPhone());
			newProvider.setEmail(providerData.getEmail());

			return ResponseEntity.ok(providerRepository.save(newProvider));

		}
	}

	/**
	 * Delete an provider by its ID.
	 *
	 * @param id The UUID of the provider to delete.
	 * @return No content if deleted, otherwise a not found message.
	 */

	@DeleteMapping("/provider/{id}")
	public ResponseEntity<Object> deleteProvider(@PathVariable UUID id) {

		Provider provider = providerRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		providerRepository.delete(provider);

		return ResponseEntity.noContent().build();
	}
}