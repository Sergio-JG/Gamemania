package com.tfg.restservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tfg.restservice.model.Provider;
import com.tfg.restservice.repository.ProviderRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class ProviderService {

	private final ProviderRepository providerRepository;

	public ProviderService(ProviderRepository providerRepository) {
		this.providerRepository = providerRepository;
	}

	public List<Provider> findAll() {
		return providerRepository.findAll();
	}

	public Provider findById(UUID providerId) {
		return providerRepository.findById(providerId).orElse(null);
	}

	public Provider save(Provider provider) {
		return providerRepository.save(provider);
	}

	public void delete(UUID providerId) {
		providerRepository.deleteById(providerId);
	}
}
