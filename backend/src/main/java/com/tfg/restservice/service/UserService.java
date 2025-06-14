package com.tfg.restservice.service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.User;
import com.tfg.restservice.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class UserService {

	private final UserRepository userRepository;

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findById(UUID userId) {
		return userRepository.findById(userId).orElse(null);
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	public void delete(User user) {
		userRepository.delete(user);
	}

	public boolean validate(String email, String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
		Optional<User> userOptional = userRepository.findByEmail(email);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			return PasswordHashingService.verifyPassword(password, user.getPassword());
		}
		return false;
	}

	public User findByUsername(String username) {
		Optional<User> userOptional = userRepository.findByUsername(username);
		if (userOptional.isPresent()) {
			return userOptional.get();

		}
		return null;
	}

	public User findByEmail(String email) {
		Optional<User> optionalUser = userRepository.findByEmail(email);
		if (optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			throw new NotFoundException("User not found for email: " + email);
		}
	}
}
