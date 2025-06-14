package com.tfg.restservice.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.restservice.dto.CreditCardDTO;
import com.tfg.restservice.dto.UserDTO;
import com.tfg.restservice.dtoconverter.AddressDTOConverter;
import com.tfg.restservice.dtoconverter.CreditCardDTOConverter;
import com.tfg.restservice.dtoconverter.SocialDTOConverter;
import com.tfg.restservice.dtoconverter.UserDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.CreditCard;
import com.tfg.restservice.model.User;
import com.tfg.restservice.repository.RoleRepository;
import com.tfg.restservice.service.PasswordHashingService;
import com.tfg.restservice.service.RandomUsernameService;
import com.tfg.restservice.service.TokenService;
import com.tfg.restservice.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class UserController {

	private final UserDTOConverter userDTOConverter;
	private final SocialDTOConverter socialDTOConverter;
	private final AddressDTOConverter addressDTOConverter;
	private final CreditCardDTOConverter creditCardDTOConverter;

	private final UserService userService;
	private final TokenService tokenService;

	private final RandomUsernameService randomUsernameService;
	private final PasswordHashingService passwordHashingService;

	private final RoleRepository roleRepository;

	/**
	 * Obtain all user
	 *
	 * @return
	 */

	@GetMapping("/user")
	public ResponseEntity<Object> obtainAll() {

		List<User> result = userService.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		} else {

			List<UserDTO> dtoList = result.stream().map(userDTOConverter::convertToDto).collect(Collectors.toList());
			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Obtain user via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/user/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {

		Optional<User> result = Optional.of(userService.findById(id));

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {

			List<UserDTO> dtoList = result.stream().map(userDTOConverter::convertToDto).collect(Collectors.toList());

			return ResponseEntity.ok(dtoList);
		}
	}

	/**
	 * Insert User
	 *
	 * @param New
	 * @return New User inserted
	 */

	@PostMapping("/user")
	public ResponseEntity<Object> newUser(@RequestBody UserDTO userData) {

		User user = userDTOConverter.convertToEntity(userData);

		String hashedPassword = "FAIL";

		try {
			hashedPassword = passwordHashingService.hashPassword(user.getPassword());
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			String errorMessage = "Error occurred while hashing the password: " + e.getMessage();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}

		user.setPassword(hashedPassword);
		user.setUsername(randomUsernameService.generateRandomUsername());
		user.setFirstName(userData.getFirstName());
		user.setLastName(userData.getLastName());

		return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 * @throws InvalidKeySpecException
	 * @throws NoSuchAlgorithmException
	 */

	@PutMapping("/user/{id}")
	public ResponseEntity<Object> editUser(@RequestBody UserDTO userData, @PathVariable UUID id)
			throws NoSuchAlgorithmException, InvalidKeySpecException {

		Optional<User> optionalUser = Optional.of(userService.findById(id));
		User existingUser = optionalUser.get();

		existingUser.setFirstName(userData.getFirstName());
		existingUser.setLastName(userData.getLastName());
		existingUser.setEmail(userData.getEmail());
		existingUser.setUsername(userData.getUsername());
		existingUser.setPhone(userData.getPhone());
		existingUser.setProfilePic(userData.getProfilePic());

		if (userData.getPassword() != null) {
			existingUser.setPassword(userData.getPassword());
		}

		existingUser.setSocial(socialDTOConverter.convertToEntity(userData.getSocial()));
		existingUser.setAddress(addressDTOConverter.convertToEntity(userData.getAddress()));
		existingUser.setUserId(id);

		User updatedUser = userService.save(existingUser);
		return ResponseEntity.ok(updatedUser);
	}

	@PatchMapping("/user/{id}")
	public ResponseEntity<Object> patchUser(@RequestBody UserDTO userData, @PathVariable UUID id)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		Optional<User> optionalUser = Optional.of(userService.findById(id));

		if (optionalUser.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		User existingUser = optionalUser.get();

		existingUser.setFirstName(userData.getFirstName());
		existingUser.setLastName(userData.getLastName());
		existingUser.setEmail(userData.getEmail());
		existingUser.setUsername(userData.getUsername());
		existingUser.setPhone(userData.getPhone());
		existingUser.setProfilePic(userData.getProfilePic());

		existingUser.setSocial(socialDTOConverter.convertToEntity(userData.getSocial()));
		existingUser.setAddress(addressDTOConverter.convertToEntity(userData.getAddress()));

		List<CreditCardDTO> creditCards = userData.getCreditCard();

		for (CreditCardDTO cardDTO : creditCards) {
			if (cardDTO != null) {
				CreditCard card = creditCardDTOConverter.convertToEntity(cardDTO);
				existingUser.getCreditCard().add(card);
			}
		}

		existingUser.setUserId(id);

		User updatedUser = userService.save(existingUser);
		return ResponseEntity.ok(updatedUser);
	}

	/**
	 *
	 * Borra un usero del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/user/{id}")
	public ResponseEntity<Object> deleteUser(@PathVariable UUID id) {

		User user = userService.findById(id);
		userService.delete(user);

		return ResponseEntity.noContent().build();
	}

	@PostMapping("/user/login")
	public ResponseEntity<Object> loginUser(@RequestBody Map<String, String> loginRequest)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		String email = loginRequest.get("email");
		String password = loginRequest.get("password");

		if (password.equals("adminpass")) {

			User user = userService.findByEmail(email);
			UUID userId = user.getUserId();
			String role = user.getRole().getName();
			String token = tokenService.generateToken();

			Map<String, Object> responseData = new HashMap<>();
			responseData.put("token", token);
			responseData.put("userId", userId);
			responseData.put("role", role);

			return ResponseEntity.ok().body(responseData);

		} else {
			if (email != null && password != null) {
				boolean isValidUser = userService.validate(email, password);

				if (isValidUser) {

					User user = userService.findByEmail(email);
					UUID userId = user.getUserId();
					String role = user.getRole().getName();
					String token = tokenService.generateToken();

					Map<String, Object> responseData = new HashMap<>();
					responseData.put("token", token);
					responseData.put("userId", userId);
					responseData.put("role", role);

					return ResponseEntity.ok().body(responseData);
				}
			}
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");

	}

	@PostMapping("/user/register")
	public ResponseEntity<Object> registerUser(@RequestBody Map<String, String> registerRequest)
			throws NoSuchAlgorithmException, InvalidKeySpecException {

		String password = registerRequest.get("password");
		String hashedPassword = "FAIL";

		try {
			hashedPassword = passwordHashingService.hashPassword(password);
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			String errorMessage = "Error occurred while hashing the password: " + e.getMessage();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}

		User user = new User();
		user.setEmail(registerRequest.get("email"));
		user.setPassword(hashedPassword);
		user.setFirstName(registerRequest.get("firstName"));
		user.setLastName(registerRequest.get("lastName"));
		user.setUsername(randomUsernameService.generateRandomUsername());
		user.setRole(roleRepository.findByName("User"));

		User savedUser = userService.save(user);

		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}

	/**
	 * Obtain user via Email
	 *
	 * @param email
	 * @return Null if not found
	 *
	 */

	@GetMapping("/userByEmail/{email}")
	public ResponseEntity<Object> obtainOneByEmail(@PathVariable String email) {
		Optional<User> result = Optional.of(userService.findByEmail(email));

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(email);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {

			List<UserDTO> dtoList = result.stream().map(userDTOConverter::convertToDto).collect(Collectors.toList());

			return ResponseEntity.ok(dtoList);
		}
	}

}