package com.tfg.restservice.service;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class TokenService {

	public String generateToken() {

		byte[] tokenBytes = new byte[32];
		new SecureRandom().nextBytes(tokenBytes);
		return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

	}
}
