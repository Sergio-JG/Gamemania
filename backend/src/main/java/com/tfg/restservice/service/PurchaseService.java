package com.tfg.restservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Purchase;
import com.tfg.restservice.repository.PurchaseRepository;

@Service
@Transactional
public class PurchaseService {

	private final PurchaseRepository purchaseRepository;

	public PurchaseService(PurchaseRepository purchaseRepository) {
		this.purchaseRepository = purchaseRepository;
	}

	public Purchase findById(UUID id) {
		return purchaseRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	public List<Purchase> findAll() {
		return purchaseRepository.findAll();
	}

	public Purchase save(Purchase purchase) {
		return purchaseRepository.save(purchase);
	}

	public ResponseEntity<Object> deletePurchase(Purchase purchase) {
		try {
			purchaseRepository.delete(purchase);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting purchase: " + e.getMessage());
		}
	}

}
