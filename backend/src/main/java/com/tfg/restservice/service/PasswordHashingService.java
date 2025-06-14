package com.tfg.restservice.service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.stereotype.Service;

@Service
public class PasswordHashingService {

	private static final int ITERATIONS = 10000;
	private static final int KEY_LENGTH = 256;
	private static final int SALT_LENGTH = 16;

	public String hashPassword(String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
		byte[] salt = generateSalt();
		return hashPassword(password, salt);
	}

	public static boolean verifyPassword(String password, String hashedPassword)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		byte[] decodedHash = Base64.getDecoder().decode(hashedPassword);
		byte[] salt = extractSalt(decodedHash);
		return hashedPassword.equals(hashPassword(password, salt));
	}

	private static byte[] generateSalt() {
		SecureRandom secureRandom = new SecureRandom();
		byte[] salt = new byte[SALT_LENGTH];
		secureRandom.nextBytes(salt);
		return salt;
	}

	private static String hashPassword(String password, byte[] salt)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, ITERATIONS, KEY_LENGTH); 
		SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
		byte[] hash = factory.generateSecret(spec).getEncoded();

		byte[] combined = combineSaltAndHash(salt, hash);
		return Base64.getEncoder().encodeToString(combined);
	}

	private static byte[] extractSalt(byte[] combined) {
		byte[] salt = new byte[SALT_LENGTH];
		System.arraycopy(combined, 0, salt, 0, SALT_LENGTH); // Copy the first SALT_LENGTH bytes from the combined array
																// to the salt array
		return salt; // Return the extracted salt
	}

	private static byte[] combineSaltAndHash(byte[] salt, byte[] hash) {
		byte[] combined = new byte[salt.length + hash.length]; // Create a byte array to store the combined salt and
																// hash
		System.arraycopy(salt, 0, combined, 0, salt.length); // Copy the salt array to the beginning of the combined
																// array
		System.arraycopy(hash, 0, combined, salt.length, hash.length); // Copy the hash array to the remaining part of
																		// the combined array
		return combined; // Return the combined array
	}
}
