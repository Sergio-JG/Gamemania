package com.tfg.restservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tfg.restservice.model.Address;
import com.tfg.restservice.repository.AddressRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class AddressService {

	private final AddressRepository addressRepository;

	public List<Address> findAll() {
		return addressRepository.findAll();
	}

	public Address findById(UUID addressId) {
		return addressRepository.findById(addressId).orElse(null);
	}

	public Address save(Address address) {
		return addressRepository.save(address);
	}

	public void delete(Address address) {
		addressRepository.delete(address);
	}
}