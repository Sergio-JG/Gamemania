package com.tfg.restservice.service;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

@Service
public class RandomUsernameService {

	public String generateRandomUsername() {

		final String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
		final SecureRandom random = new SecureRandom();

		StringBuilder sb = new StringBuilder();
		int length = 8; // Set the desired length of the username

		for (int i = 0; i < length; i++) {
			int randomIndex = random.nextInt(characters.length());
			sb.append(characters.charAt(randomIndex));
		}

		return sb.toString();

	}
}