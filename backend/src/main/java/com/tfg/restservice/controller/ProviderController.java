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
	 * Obtain all provider
	 *
	 * @return
	 */

	@GetMapping("/provider")
	public ResponseEntity<Object> obtainAll() {
		List<Provider> result = providerRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		List<ProviderDTO> dtoList = result.stream().map(providerDTOConverter::convertToDto).toList();

		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Obtain provider via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
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
	 * Insert Provider
	 *
	 * @param New
	 * @return New Provider inserted
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
	 * Edit Provider
	 * 
	 * @param providerData
	 * @param id
	 * @return
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
	 *
	 * Delete Provider
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/provider/{id}")
	public ResponseEntity<Object> deleteProvider(@PathVariable UUID id) {

		Provider provider = providerRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		providerRepository.delete(provider);

		return ResponseEntity.noContent().build();
	}
}