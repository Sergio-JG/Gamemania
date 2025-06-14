package com.tfg.restservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tfg.restservice.model.Game;
import com.tfg.restservice.repository.GameRepository;

@Service
public class GameService {

	private final GameRepository gameRepository;

	public GameService(GameRepository gameRepository) {
		this.gameRepository = gameRepository;
	}

	public List<Game> findAll() {
		return gameRepository.findAll();
	}

	public Game findById(UUID gameId) {
		return gameRepository.findById(gameId).orElse(null);
	}

	public Game save(Game game) {
		return gameRepository.save(game);
	}

	public void delete(UUID gameId) {
		gameRepository.deleteById(gameId);
	}
}
