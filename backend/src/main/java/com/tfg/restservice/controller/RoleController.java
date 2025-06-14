package com.tfg.restservice.controller;

import java.util.List;
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

import com.tfg.restservice.dto.RoleDTO;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Role;
import com.tfg.restservice.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class RoleController  {

	private final RoleRepository roleRepository;
	// private final RoleDTOConverter roleDTOConverter;

	/**
	 * Obtenemos todos los roleos
	 *
	 * @return
	 */

	@GetMapping("/role")
	public ResponseEntity<Object> obtenerTodos() {

		List<Role> result = roleRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado datos en el catálogo");
		} else {
			return ResponseEntity.ok(result);
		}
	}

	/**
	 * Obtenemos un roleo en base a su ID
	 *
	 * @param id
	 * @return Null si no encuentra el roleo
	 */
	@GetMapping("/role/{id}")
	public Role obtenerUno(@PathVariable UUID id) {

		return roleRepository.findById(id).orElseThrow(() -> new NotFoundException(id));

	}

	/**
	 * Insertamos un nuevo roleoX
	 *
	 * @param nuevo
	 * @return roleo insertado
	 */

	@PostMapping("/role")
	public ResponseEntity<Role> newRole(@RequestBody Role newG) {

		Role newRole = new Role();

		return ResponseEntity.status(HttpStatus.CREATED).body(roleRepository.save(newRole));
	}

	/**
	 *
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/role/{id}")
	public Role editarRoleo(@RequestBody RoleDTO editar, @PathVariable UUID id) {

		return roleRepository.findById(id).map(p -> {

			return roleRepository.save(p);
		}).orElseThrow(() -> new NotFoundException(id));
	}

	/**
	 *
	 * Borra un roleo del catálogo en base a su id
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/role/{id}")
	public ResponseEntity<Object> borrarRoleo(@PathVariable UUID id) {
		Role role = roleRepository.findById(id).orElseThrow(() -> new NotFoundException(id));

		roleRepository.delete(role);
		return ResponseEntity.noContent().build();
	}

}