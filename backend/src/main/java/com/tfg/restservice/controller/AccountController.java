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
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Account;
import com.tfg.restservice.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class AccountController {

	private final AccountRepository accountRepository;

	/**
	 * Obtain all Account
	 *
	 * @return
	 */

	@GetMapping("/account")
	public ResponseEntity<Object> obtainAll() {

		List<Account> result = accountRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		} else {
			return ResponseEntity.ok(result);
		}
	}

	/**
	 * Obtain Account via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/account/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable @NonNull UUID id) {

		Optional<Account> result = accountRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			return ResponseEntity.ok(result);
		}
	}

	/**
	 * Insert Account
	 *
	 * @param New
	 * @return New Account inserted
	 */

	@PostMapping("/account")
	public ResponseEntity<Object> addAccount(@RequestBody AccountDTO accountData) {

		Account newAccount = new Account();

		newAccount.setBankName(accountData.getBankName());
		newAccount.setAccountHolderName(accountData.getAccountHolderName());
		newAccount.setAccountNumber(accountData.getAccountNumber());
		newAccount.setBankAddress(accountData.getBankAddress());
		newAccount.setBankRoutingNumber(accountData.getBankRoutingNumber());
		newAccount.setAccountBalance(accountData.getAccountBalance());

		return ResponseEntity.status(HttpStatus.CREATED).body(accountRepository.save(newAccount));
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/account/{id}")
	public ResponseEntity<Object> editAccount(@RequestBody AccountDTO accountData, @PathVariable @NonNull UUID id) {

		Optional<Account> result = accountRepository.findById(id);

		if (result.isEmpty()) {

			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());

		} else {

			Account newAccount = new Account();

			newAccount.setAccountId(id);
			newAccount.setBankName(accountData.getBankName());
			newAccount.setAccountHolderName(accountData.getAccountHolderName());
			newAccount.setAccountNumber(accountData.getAccountNumber());
			newAccount.setBankAddress(accountData.getBankAddress());
			newAccount.setBankRoutingNumber(accountData.getBankRoutingNumber());
			newAccount.setAccountBalance(accountData.getAccountBalance());

			return ResponseEntity.status(HttpStatus.OK).body(accountRepository.save(newAccount));

		}
	}

	/**
	 *
	 * Borra un Account del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/account/{id}")
	public ResponseEntity<Object> deleteAccount(@PathVariable @NonNull UUID id) {

		Account account = accountRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		accountRepository.delete(account);

		return ResponseEntity.noContent().build();
	}
}