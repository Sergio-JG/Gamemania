package com.tfg.restservice.dtoconverter;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.PurchaseDTO;
import com.tfg.restservice.model.Game;
import com.tfg.restservice.model.Purchase;
import com.tfg.restservice.repository.GameRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PurchaseDTOConverter {

	private final ModelMapper modelMapper;
	private final PurchaseDetailDTOConverter purchaseDetailDTOConverter;
	private final GameRepository gameRepository;

	public PurchaseDTO convertToDto(Purchase purchase) {
		PurchaseDTO purchaseDTO = modelMapper.map(purchase, PurchaseDTO.class);

		purchaseDTO.setFirstName(purchase.getProvider().getName());

		purchaseDTO.setPurchaseDetail(purchase.getPurchaseDetail().stream()
				.map(purchaseDetailDTOConverter::convertToDto).collect(Collectors.toList()));

		return purchaseDTO;
	}

	public Purchase convertToEntity(PurchaseDTO purchaseDTO) {
		Purchase purchase = modelMapper.map(purchaseDTO, Purchase.class);

		if (purchaseDTO.getPurchaseDetail() != null) {
			purchase.getPurchaseDetail().forEach(detail -> {
				detail.setPurchase(purchase);
				Game game = gameRepository.findById(detail.getGame().getGameId()).orElse(null);
				detail.setGame(game);
			});
		}

		return purchase;
	}
}