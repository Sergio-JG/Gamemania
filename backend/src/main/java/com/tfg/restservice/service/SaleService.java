package com.tfg.restservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Sale;
import com.tfg.restservice.repository.SaleRepository;

@Service
@Transactional
public class SaleService {

	private final SaleRepository saleRepository;

	public SaleService(SaleRepository saleRepository) {
		this.saleRepository = saleRepository;
	}

	public Sale findById(UUID id) {
		return saleRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	public List<Sale> findByUserUserId(UUID userId) {
		return saleRepository.findByUserUserId(userId);
	}

	public List<Sale> findAll() {
		return saleRepository.findAll();
	}

	public Sale save(Sale sale) {
		return saleRepository.save(sale);
	}

	public ResponseEntity<Object> deleteSale(Sale sale) {
		try {
			saleRepository.delete(sale);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting sale: " + e.getMessage());
		}
	}
}
