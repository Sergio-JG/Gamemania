package com.tfg.restservice.error;

import java.util.UUID;

public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = -7968612470626223303L;

	public NotFoundException(UUID id) {
		super(" Cannot found resource with id -> " + id);
	}

	public NotFoundException(String string) {
		super(" Cannot found resource with id -> " + string);
	}
}
