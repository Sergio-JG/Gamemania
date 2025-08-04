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

import com.tfg.restservice.dto.SaleCreateDTO;
import com.tfg.restservice.dto.SaleDTO;
import com.tfg.restservice.dto.SaleDetailDTO;
import com.tfg.restservice.dtoconverter.SaleDTOConverter;
import com.tfg.restservice.model.Game;
import com.tfg.restservice.model.Sale;
import com.tfg.restservice.model.SaleDetail;
import com.tfg.restservice.model.User;
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

	/**
	 * Retrieve all sales.
	 *
	 * @return List of all sales or a not found message if empty.
	 */

	@GetMapping("/sale")
	public ResponseEntity<List<SaleDTO>> obtainAll() {
		List<Sale> result = saleService.findAll();
		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		List<SaleDTO> dtoList = result.stream().map(saleDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Retrieve a single sale by its ID.
	 *
	 * @param id The UUID of the sale.
	 * @return The sale DTO if found, otherwise a not found message.
	 */

	@GetMapping("/sale/{id}")
	public ResponseEntity<SaleDTO> getSaleById(@PathVariable UUID id) {
		Sale sale = saleService.findById(id);
		SaleDTO saleDTO = saleDTOConverter.convertToDto(sale);
		return ResponseEntity.ok(saleDTO);
	}

	/**
	 * Retrieve a list of sales by its userID.
	 *
	 * @param id The UUID of the user.
	 * @return The list of sales DTO if found, otherwise a not found message.
	 */

	@GetMapping("/sale/byUser/{userId}")
	public ResponseEntity<List<SaleDTO>> getSalesByUserId(@PathVariable UUID userId) {
		List<Sale> result = saleService.findByUserUserId(userId);
		List<SaleDTO> dtoList = result.stream().map(saleDTOConverter::convertToDto).toList();
		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Create a new sale.
	 *
	 * @param saleData The sale data to create.
	 * @return The created sale DTO.
	 */

	@PostMapping("/sale")
	public ResponseEntity<?> addSale(@RequestBody SaleCreateDTO saleCreateDTO) {

		Sale newSale = new Sale();

		newSale.setSaleDate(saleCreateDTO.getSaleDate());

		User user = userService.findById(saleCreateDTO.getUserId());

		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("User not found with ID: " + saleCreateDTO.getUserId());
		} else {
			newSale.setUser(user);
		}

		newSale.setUser(user);
		newSale.setSaleDate(saleCreateDTO.getSaleDate());

		BigDecimal totalAmount = BigDecimal.ZERO;

		List<SaleDetail> details = new ArrayList<>();
		newSale.setSaleDetail(details);

		for (SaleDetailDTO detailDTO : saleCreateDTO.getSaleDetail()) {
			Game game = gameService.findById(detailDTO.getGameId());

			if (game == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(null);
			}

			SaleDetail detail = new SaleDetail();
			detail.setSale(newSale);
			detail.setGame(game);
			detail.setQuantity(detailDTO.getQuantity());

			BigDecimal subtotal = game.getPrice().multiply(BigDecimal.valueOf(detail.getQuantity()));
			detail.setSubtotal(subtotal);

			details.add(detail);
			totalAmount = totalAmount.add(subtotal);
		}

		newSale.setSaleDetail(details);

		newSale.setTotalAmount(totalAmount);
		Sale savedSale = saleService.save(newSale);
		SaleDTO createdDTO = saleDTOConverter.convertToDto(savedSale);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdDTO);
	}

	/**
	 * Delete a sale by its ID.
	 *
	 * @param id The UUID of the sale to delete.
	 * @return No content if deleted, otherwise a not found message.
	 */

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
