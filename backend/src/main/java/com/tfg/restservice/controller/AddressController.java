package com.tfg.restservice.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tfg.restservice.dto.AddressDTO;
import com.tfg.restservice.dtoconverter.AddressDTOConverter;
import com.tfg.restservice.model.Address;
import com.tfg.restservice.service.AddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AddressController {

	private final AddressDTOConverter addressDTOConverter;
	private final AddressService addressService;

	/**
	 * Obtener todas las direcciones
	 */
	@GetMapping("/address")
	public ResponseEntity<Object> obtainAll() {
		List<Address> result = addressService.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No addresses found");
		}

		List<AddressDTO> dtoList = result.stream()
				.map(addressDTOConverter::convertToDto)
				.collect(Collectors.toList());

		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Obtener dirección por ID
	 */
	@GetMapping("/address/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {
		Address address = addressService.findById(id);

		if (address == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Address not found with ID: " + id);
		}

		AddressDTO dto = addressDTOConverter.convertToDto(address);
		return ResponseEntity.ok(dto);
	}

	/**
	 * Insertar nueva dirección
	 */
	@PostMapping("/address")
	public ResponseEntity<Object> newAddress(@RequestBody AddressDTO addressData) {
		Address address = addressDTOConverter.convertToEntity(addressData);
		return ResponseEntity.status(HttpStatus.CREATED).body(addressService.save(address));
	}

	/**
	 * Actualizar una dirección completa
	 */
	@PutMapping("/address/{id}")
	public ResponseEntity<Object> editAddress(@RequestBody AddressDTO addressData, @PathVariable UUID id)
			throws NoSuchAlgorithmException, InvalidKeySpecException {

		Address existingAddress = addressService.findById(id);

		if (existingAddress == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address not found");
		}

		existingAddress.setStreet(addressData.getStreet());
		existingAddress.setCity(addressData.getCity());
		existingAddress.setState(addressData.getState());
		existingAddress.setPostalCode(addressData.getPostalCode());
		existingAddress.setCountry(addressData.getCountry());

		Address updatedAddress = addressService.save(existingAddress);
		return ResponseEntity.ok(updatedAddress);
	}

	/**
	 * Eliminar una dirección por ID
	 */
	@DeleteMapping("/address/{id}")
	public ResponseEntity<Object> deleteAddress(@PathVariable UUID id) {
		Address address = addressService.findById(id);

		if (address == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address not found");
		}

		addressService.delete(address);
		return ResponseEntity.noContent().build();
	}
}
