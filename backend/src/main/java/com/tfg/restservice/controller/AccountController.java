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

import com.tfg.restservice.dto.AccountDTO;
import com.tfg.restservice.dtoconverter.AccountDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Account;
import com.tfg.restservice.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class AccountController {

	private final AccountRepository accountRepository;
	private final AccountDTOConverter accountDTOConverter;

	/**
	 * Retrieve all accounts.
	 *
	 * @return List of all accounts or a not found message if empty.
	 */

	@GetMapping("/account")
	public ResponseEntity<Object> obtainAll() {
		List<Account> result = accountRepository.findAll();
		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		} else {
			List<AccountDTO> dtoList = result.stream().map(accountDTOConverter::convertToDto).toList();
			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Retrieve a single account by its ID.
	 *
	 * @param id The UUID of the account.
	 * @return The account DTO if found, otherwise a not found message.
	 */

	@GetMapping("/account/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable @NonNull UUID id) {
		Optional<Account> result = accountRepository.findById(id);
		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			AccountDTO dto = accountDTOConverter.convertToDto(result.get());
			return ResponseEntity.ok(dto);
		}
	}

	/**
	 * Create a new account.
	 *
	 * @param accountData The account data to create.
	 * @return The created account DTO.
	 */

	@PostMapping("/account")
	public ResponseEntity<Object> addAccount(@RequestBody AccountDTO accountData) {
		Account newAccount = accountDTOConverter.convertToEntity(accountData);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(accountDTOConverter.convertToDto(accountRepository.save(newAccount)));
	}

	/**
	 * Update an existing account.
	 *
	 * @param accountData The updated account data.
	 * @param id          The UUID of the account to update.
	 * @return The updated account DTO if found, otherwise a not found message.
	 */

	@PutMapping("/account/{id}")
	public ResponseEntity<Object> editAccount(@RequestBody AccountDTO accountData, @PathVariable @NonNull UUID id) {

		Optional<Account> result = accountRepository.findById(id);
		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Account newAccount = accountDTOConverter.convertToEntity(accountData);
			newAccount.setAccountId(id);
			return ResponseEntity.status(HttpStatus.OK)
					.body(accountDTOConverter.convertToDto(accountRepository.save(newAccount)));
		}
	}

	/**
	 * Delete an account by its ID.
	 *
	 * @param id The UUID of the account to delete.
	 * @return No content if deleted, otherwise a not found message.
	 */

	@DeleteMapping("/account/{id}")
	public ResponseEntity<Object> deleteAccount(@PathVariable @NonNull UUID id) {
		Account account = accountRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		accountRepository.delete(account);
		return ResponseEntity.noContent().build();
	}
}