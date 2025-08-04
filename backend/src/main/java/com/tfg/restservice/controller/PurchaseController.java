package com.tfg.restservice.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
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

import com.tfg.restservice.dto.PurchaseDTO;
import com.tfg.restservice.dto.PurchaseDetailDTO;
import com.tfg.restservice.dtoconverter.PurchaseDTOConverter;
import com.tfg.restservice.model.Purchase;
import com.tfg.restservice.model.PurchaseDetail;
import com.tfg.restservice.service.GameService;
import com.tfg.restservice.service.ProviderService;
import com.tfg.restservice.service.PurchaseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class PurchaseController {

	private final PurchaseService purchaseService;
	private final PurchaseDTOConverter purchaseDTOConverter;

	private final GameService gameService;
	private final ProviderService providerService;

	/**
	 * Retrieve all accounts.
	 *
	 * @return List of all accounts or a not found message if empty.
	 */

	@GetMapping("/purchase")
	public ResponseEntity<List<PurchaseDTO>> obtainAll() {
		List<Purchase> result = purchaseService.findAll();
		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<PurchaseDTO> dtoList = result.stream().map(purchaseDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Retrieve a single purchase by its ID.
	 *
	 * @param id The UUID of the purchase.
	 * @return The purchase DTO if found, otherwise a not found message.
	 */

	@GetMapping("/purchase/{id}")
	public ResponseEntity<PurchaseDTO> getPurchaseById(@PathVariable UUID id) {
		Purchase purchase = purchaseService.findById(id);
		PurchaseDTO purchaseDTO = purchaseDTOConverter.convertToDto(purchase);
		return ResponseEntity.ok(purchaseDTO);
	}

	/**
	 * Create a new purchase.
	 *
	 * @param purchaseData The purchase data to create.
	 * @return The created purchase DTO.
	 */

	@PostMapping("/purchase")
	public ResponseEntity<PurchaseDTO> addPurchase(@RequestBody PurchaseDTO purchaseDTO) {
		Purchase newPurchase = purchaseDTOConverter.convertToEntity(purchaseDTO);
		newPurchase.setProvider(providerService.findById(purchaseDTO.getProviderId()));

		BigDecimal totalAmount = BigDecimal.ZERO;
		List<PurchaseDetail> purchaseDetails = new ArrayList<>();

		for (PurchaseDetailDTO detailDTO : purchaseDTO.getPurchaseDetail()) {
			PurchaseDetail detail = new PurchaseDetail();
			detail.setGame(gameService.findById(detailDTO.getGameId()));
			detail.setQuantity(detailDTO.getQuantity());
			detail.setSubtotal(detailDTO.getSubtotal());
			detail.setPurchase(newPurchase);

			purchaseDetails.add(detail);
			totalAmount = totalAmount.add(detail.getSubtotal());
		}

		newPurchase.setPurchaseDetail(purchaseDetails);
		newPurchase.setTotalAmount(totalAmount);

		newPurchase = purchaseService.save(newPurchase);

		PurchaseDTO createdPurchaseDTO = purchaseDTOConverter.convertToDto(newPurchase);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPurchaseDTO);
	}

	/**
	 * Delete a purchase by its ID.
	 *
	 * @param id The UUID of the purchase to delete.
	 * @return No content if deleted, otherwise a not found message.
	 */

	@DeleteMapping("/purchase/{id}")
	public ResponseEntity<Object> deletePurchase(@PathVariable UUID id) {
		try {
			Purchase purchase = purchaseService.findById(id);

			if (purchase == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Purchase with ID " + id + " not found");
			}

			purchaseService.deletePurchase(purchase);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting purchase: " + e.getMessage());
		}
	}

}