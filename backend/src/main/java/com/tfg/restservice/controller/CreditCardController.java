package com.tfg.restservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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

import com.tfg.restservice.dto.CreditCardDTO;
import com.tfg.restservice.dtoconverter.CreditCardDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.CreditCard;
import com.tfg.restservice.model.User;
import com.tfg.restservice.repository.CreditCardRepository;
import com.tfg.restservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class CreditCardController {

	private final CreditCardRepository creditCardRepository;
	private final UserRepository userRepository;
	private final CreditCardDTOConverter creditCardDTOConverter;

	/**
	 * Obtain all CreditCard
	 *
	 * @return
	 */

	@GetMapping("/creditCard")

	public ResponseEntity<Object> obtainAll() {

		List<CreditCard> result = creditCardRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		} else {
			List<CreditCardDTO> dtoList = result.stream().map(creditCardDTOConverter::convertToDto)
					.collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Obtain CreditCard via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/creditCard/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable @NonNull UUID id) {
		Optional<CreditCard> result = creditCardRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			return ResponseEntity.ok(result);
		}
	}

	/**
	 * Insert CreditCard
	 *
	 * @param New
	 * @return New CreditCard inserted
	 */

	@PostMapping("/creditCard")
	public ResponseEntity<Object> addCreditCard(@RequestBody CreditCardDTO creditCardData) {

		if (creditCardData.getCardNumber() == null) {
			return ResponseEntity.status(HttpStatus.OK).body("No se ha realizado");
		}

		CreditCard newCreditCard = new CreditCard();

		newCreditCard.setCardNumber(creditCardData.getCardNumber());
		newCreditCard.setCardHolderName(creditCardData.getCardHolderName());
		newCreditCard.setExpirationDate(creditCardData.getExpirationDate());
		newCreditCard.setCvv(creditCardData.getCvv());
		newCreditCard.setBillingAddress(creditCardData.getBillingAddress());

		Optional<User> optionalUser = userRepository.findById(creditCardData.getUserId());
		User user = optionalUser.get();

		newCreditCard.setUser(user);

		return ResponseEntity.status(HttpStatus.CREATED).body(creditCardRepository.save(newCreditCard));
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/creditCard/{id}")
	public ResponseEntity<Object> editCreditCard(@RequestBody CreditCardDTO creditCardData,
			@PathVariable @NonNull UUID id) {

		Optional<CreditCard> result = creditCardRepository.findById(id);

		if (result.isEmpty()) {

			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());

		} else {

			CreditCard newCreditCard = new CreditCard();

			newCreditCard.setCreditCardId(id);
			newCreditCard.setCardNumber(creditCardData.getCardNumber());
			newCreditCard.setCardHolderName(creditCardData.getCardHolderName());
			newCreditCard.setExpirationDate(creditCardData.getExpirationDate());
			newCreditCard.setCvv(creditCardData.getCvv());
			newCreditCard.setBillingAddress(creditCardData.getBillingAddress());

			User user = userRepository.findById(creditCardData.getCreditCardId()).orElse(null);
			newCreditCard.setUser(user);

			return ResponseEntity.status(HttpStatus.OK).body(creditCardRepository.save(newCreditCard));

		}
	}

	/**
	 *
	 * Borra un CreditCard del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/creditCard/{id}")
	public ResponseEntity<Object> deleteCreditCard(@PathVariable @NonNull UUID id) {

		CreditCard creditCard = creditCardRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		creditCardRepository.delete(creditCard);

		return ResponseEntity.noContent().build();
	}
}