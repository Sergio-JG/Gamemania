package com.tfg.restservice.controller;

import java.util.List;
import java.util.Optional;
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

import com.tfg.restservice.dto.SocialDTO;
import com.tfg.restservice.dtoconverter.SocialDTOConverter;
import com.tfg.restservice.error.NotFoundException;
import com.tfg.restservice.model.Social;
import com.tfg.restservice.repository.SocialRepository;

import io.micrometer.common.lang.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class SocialController {

	private final SocialRepository socialRepository;
	private final SocialDTOConverter socialDTOConverter;

	/**
	 * Obtain all social
	 *
	 * @return
	 */

	@GetMapping("/social")
	public ResponseEntity<Object> obtainAll() {
		List<Social> result = socialRepository.findAll();

		if (result.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		List<SocialDTO> dtoList = result.stream().map(socialDTOConverter::convertToDto).toList();

		return ResponseEntity.ok(dtoList);
	}

	/**
	 * Obtain social via ID
	 *
	 * @param id
	 * @return Null if not found
	 *
	 */

	@GetMapping("/social/{id}")
	public ResponseEntity<Object> obtainOne(@PathVariable UUID id) {

		Optional<Social> result = socialRepository.findById(id);

		if (result.isEmpty()) {
			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
		} else {
			Social social = result.get();
			SocialDTO socialDTO = socialDTOConverter.convertToDto(social);
			return ResponseEntity.ok(socialDTO);
		}
	}

	/**
	 * Insert Social
	 *
	 * @param New
	 * @return New Social inserted
	 */

	@PostMapping("/social")
	public ResponseEntity<Object> addSocial(@RequestBody SocialDTO socialData) {

		Social newSocial = new Social();

		newSocial.setDiscordTag(socialData.getDiscordTag());
		newSocial.setSteamUrl(socialData.getSteamUrl());
		newSocial.setTwitchUrl(socialData.getTwitchUrl());
		newSocial.setYoutubeUrl(socialData.getYoutubeUrl());

		return ResponseEntity.status(HttpStatus.CREATED).body(socialRepository.save(newSocial));
	}

	/**
	 * Edit Social
	 * 
	 * @param editar
	 * @param id
	 * @return
	 */

	@PutMapping("/social/{id}")
	public ResponseEntity<Object> updateSocial(@RequestBody SocialDTO socialData, @PathVariable @NonNull UUID id) {

		Optional<Social> result = socialRepository.findById(id);

		if (result.isEmpty()) {

			NotFoundException exception = new NotFoundException(id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());

		} else {

			Social newSocial = new Social();

			newSocial.setSocialId(id);
			newSocial.setDiscordTag(socialData.getDiscordTag());
			newSocial.setSteamUrl(socialData.getSteamUrl());
			newSocial.setTwitchUrl(socialData.getTwitchUrl());
			newSocial.setYoutubeUrl(socialData.getYoutubeUrl());

			return ResponseEntity.ok(socialRepository.save(newSocial));

		}
	}

	/**
	 *
	 * Delete Social
	 *
	 * @param id
	 * @return
	 *
	 */

	@DeleteMapping("/social/{id}")
	public ResponseEntity<Object> deleteSocial(@PathVariable UUID id) {

		Social social = socialRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
		socialRepository.delete(social);

		return ResponseEntity.noContent().build();
	}
}