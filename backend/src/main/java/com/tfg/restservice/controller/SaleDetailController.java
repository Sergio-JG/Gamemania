package com.tfg.restservice.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.restservice.dto.SaleDetailDTO;
import com.tfg.restservice.dtoconverter.SaleDetailDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.SaleDetail;
import com.tfg.restservice.repository.SaleDetailRepository;
import com.tfg.restservice.service.DateService;
import com.tfg.restservice.service.GameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class SaleDetailController {

	private final SaleDetailRepository saleDetailService;
	private final SaleDetailDTOConverter saleDetailDTOConverter;

	private final DateService dateService;
	private final GameService gameService;

	/**
	 * Retrieve all sales detail.
	 *
	 * @return List of all sales detail or a not found message if empty.
	 */

	@GetMapping("/saledetail")
	public ResponseEntity<Object> obtenerTodos() {

		List<SaleDetail> result = saleDetailService.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado datos en el catálogo");
		} else {
			return ResponseEntity.ok(result);
		}
	}

	/**
	 * Retrieve a single sale detail by its ID.
	 *
	 * @param id The UUID of the sale detail.
	 * @return The sail detail DTO if found, otherwise a not found message.
	 */

	@GetMapping("/saledetail/{id}")
	public SaleDetail obtenerUno(@PathVariable UUID id) {

		return saleDetailService.findById(id).orElseThrow(() -> new NotFoundException(id));

	}

	/**
	 * Obtain sale details between two dates.
	 *
	 * @param startDate The start date in string format.
	 * @param endDate   The end date in string format.
	 * @return The sale detail DTO.
	 */

	@GetMapping("/saledetail/betweenDates")
	public ResponseEntity<List<SaleDetail>> getSaleDetailsBetweenDates(@RequestBody Map<String, String> dates) {

		try {
			dateService.fromStringToSQLDate(dates.get("startDate"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		try {
			dateService.fromStringToSQLDate(dates.get("endDate"));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		List<SaleDetail> sales = saleDetailService.findAll();
		return new ResponseEntity<>(sales, HttpStatus.OK);
	}

	/**
	 * Create a new sale detail.
	 *
	 * @param saleDetailData The sail detail data to create.
	 * @return The created sale detail DTO.
	 */

	@PostMapping("/saledetail")
	public ResponseEntity<SaleDetailDTO> newSaleDetail(@RequestBody SaleDetailDTO dto) {

		SaleDetail newDetail = saleDetailDTOConverter.convertToEntity(dto);
		newDetail.setGame(gameService.findById(dto.getGameId()));
		newDetail.setSubtotal(dto.getUnitPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));

		SaleDetail saved = saleDetailService.save(newDetail);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(saleDetailDTOConverter.convertToDto(saved));
	}

	/**
	 * Update an existing sale detail.
	 *
	 * @param sailDetailData The updated sail detail data.
	 * @param id             The UUID of the sale detail to update.
	 * @return The updated sale detail DTO if found, otherwise a not found message.
	 */

	@PutMapping("/saledetail/{id}")
	public SaleDetail editarSaleDetail(@RequestBody SaleDetailDTO editar, @PathVariable UUID id) {
		return saleDetailService.findById(id).map(p -> {
			return saleDetailService.save(p);
		}).orElseThrow(() -> new NotFoundException(id));
	}

	/**
	 * Delete an sale detail by its ID.
	 *
	 * @param id The UUID of the sale detail to delete.
	 * @return No content if deleted, otherwise a not found message.
	 */

	@DeleteMapping("/saledetail/{id}")
	public ResponseEntity<Object> borrarSaleDetail(@PathVariable UUID id) {
		SaleDetail sale = saleDetailService.findById(id).orElseThrow(() -> new NotFoundException(id));
		saleDetailService.delete(sale);
		return ResponseEntity.noContent().build();
	}

}