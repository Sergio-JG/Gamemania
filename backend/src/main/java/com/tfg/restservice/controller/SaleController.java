package com.tfg.restservice.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.restservice.dto.SaleDTO;
import com.tfg.restservice.dtoconverter.SaleDTOConverter;
import com.tfg.restservice.model.Sale;
import com.tfg.restservice.model.SaleDetail;
import com.tfg.restservice.service.GameService;
import com.tfg.restservice.service.SaleService;
import com.tfg.restservice.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class SaleController {

	private final SaleService saleService;
	private final SaleDTOConverter saleDTOConverter;

	private final GameService gameService;
	private final UserService userService;

	@GetMapping("/sale")
	public ResponseEntity<List<SaleDTO>> obtainAll() {
		List<Sale> result = saleService.findAll();
		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<SaleDTO> dtoList = result.stream().map(saleDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	@GetMapping("/sale/{id}")
	public ResponseEntity<SaleDTO> getSaleById(@PathVariable UUID id) {
		Sale sale = saleService.findById(id);
		SaleDTO saleDTO = saleDTOConverter.convertToDto(sale);
		return ResponseEntity.ok(saleDTO);
	}

	@GetMapping("/sale/byUser/{userId}")
	public ResponseEntity<List<SaleDTO>> getSalesByUserId(@PathVariable UUID userId) {
		List<Sale> result = saleService.findByUserUserId(userId);
		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<SaleDTO> dtoList = result.stream().map(saleDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	@PostMapping("/sale")
	public ResponseEntity<SaleDTO> addSale(@RequestBody SaleDTO saleDTO) {

		Sale newSale = saleDTOConverter.convertToEntity(saleDTO);
		newSale.setUser(userService.findById(saleDTO.getUserId()));

		BigDecimal totalAmount = BigDecimal.ZERO;

		for (SaleDetail detail : newSale.getSaleDetail()) {
			detail.setSale(newSale);
			detail.setGame(gameService.findById(detail.getGame().getGameId()));
			BigDecimal subtotal = detail.getSubtotal().multiply(BigDecimal.valueOf(detail.getQuantity()));
			detail.setSubtotal(subtotal);
			totalAmount = totalAmount.add(subtotal);
		}

		newSale.setTotalAmount(totalAmount);
		newSale = saleService.save(newSale);

		SaleDTO createdSaleDTO = saleDTOConverter.convertToDto(newSale);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdSaleDTO);
	}

	@DeleteMapping("/sale/{id}")
	public ResponseEntity<Object> deleteSale(@PathVariable UUID id) {
		try {
			Sale sale = saleService.findById(id);

			if (sale == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sale with ID " + id + " not found");
			}

			saleService.deleteSale(sale);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting sale: " + e.getMessage());
		}
	}

}
