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
	 * Obtenemos todos las ventas
	 *
	 * @return
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
	 * Obtenemos un saleo en base a su ID
	 *
	 * @param id
	 * @return Null si no encuentra el saleo
	 */
	@GetMapping("/saledetail/{id}")
	public SaleDetail obtenerUno(@PathVariable UUID id) {

		return saleDetailService.findById(id).orElseThrow(() -> new NotFoundException(id));

	}

	/**
	 * Obtenemos un saleo en base a su ID
	 *
	 * @param startDate La fecha de inicio
	 * @param endDate   La fecha de fin
	 * @return Una lista de ventas entre las dos fechas
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
	 * Insertamos un nuevo saleoX
	 *
	 * @param nuevo
	 * @return saleo insertado
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
	 *
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/saledetail/{id}")
	public SaleDetail editarSaleDetail(@RequestBody SaleDetailDTO editar, @PathVariable UUID id) {

		return saleDetailService.findById(id).map(p -> {

			return saleDetailService.save(p);
		}).orElseThrow(() -> new NotFoundException(id));
	}

	/**
	 *
	 * Borra un saleo del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/saledetail/{id}")
	public ResponseEntity<Object> borrarSaleDetail(@PathVariable UUID id) {
		SaleDetail sale = saleDetailService.findById(id).orElseThrow(() -> new NotFoundException(id));

		saleDetailService.delete(sale);
		return ResponseEntity.noContent().build();
	}

}