package com.tfg.restservice.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
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

import com.tfg.restservice.dto.AddressDTO;
import com.tfg.restservice.dtoconverter.AddressDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Address;
import com.tfg.restservice.service.AddressService;

import io.micrometer.common.lang.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class AddressController {

	private final AddressDTOConverter addressDTOConverter;
	private final AddressService addressService;

	/**
	 * Obtain all address
	 *
	 * @return
	 */

	@GetMapping("/address")
	public ResponseEntity<Object> obtainAll() {

		List<Address> result = addressService.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		} else {

			List<AddressDTO> dtoList = result.stream().map(addressDTOConverter::convertToDto)
					.collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Obtain address via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/address/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {

		Optional<Address> result = Optional.of(addressService.findById(id));

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {

			List<AddressDTO> dtoList = result.stream().map(addressDTOConverter::convertToDto)
					.collect(Collectors.toList());

			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Insert Address
	 *
	 * @param New
	 * @return New Address inserted
	 */

	@PostMapping("/address")
	public ResponseEntity<Object> newAddress(@RequestBody AddressDTO addressData) {

		Address address = addressDTOConverter.convertToEntity(addressData);

		addressData.setStreetAddress(addressData.getStreetAddress());
		addressData.setCity(addressData.getCity());
		addressData.setState(addressData.getState());
		addressData.setPostalCode(addressData.getPostalCode());
		addressData.setCountry(addressData.getCountry());

		return ResponseEntity.status(HttpStatus.CREATED).body(addressService.save(address));
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 * @throws InvalidKeySpecException
	 * @throws NoSuchAlgorithmException
	 */

	@PutMapping("/address/{id}")
	public ResponseEntity<Object> editAddress(@RequestBody AddressDTO addressData, @PathVariable @NonNull UUID id)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		Optional<Address> optionalAddress = Optional.of(addressService.findById(id));

		if (optionalAddress.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Address existingAddress = optionalAddress.get();

		existingAddress.setStreetAddress(addressData.getStreetAddress());
		existingAddress.setCity(addressData.getCity());
		existingAddress.setState(addressData.getState());
		existingAddress.setPostalCode(addressData.getPostalCode());
		existingAddress.setCountry(addressData.getCountry());
		existingAddress.setAddressId(id);

		Address updatedAddress = addressService.save(existingAddress);
		return ResponseEntity.ok(updatedAddress);
	}

	/**
	 *
	 * Borra un addresso del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/address/{id}")
	public ResponseEntity<Object> deleteAddress(@PathVariable UUID id) {

		Address address = addressService.findById(id);
		addressService.delete(address);

		return ResponseEntity.noContent().build();
	}
}