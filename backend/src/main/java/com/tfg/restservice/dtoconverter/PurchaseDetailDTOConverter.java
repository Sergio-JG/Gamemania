package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.PurchaseDetailDTO;
import com.tfg.restservice.model.PurchaseDetail;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class PurchaseDetailDTOConverter {

	private final ModelMapper modelMapper;

	public PurchaseDetailDTO convertToDto(PurchaseDetail purchaseDetail) {

		PurchaseDetailDTO purchaseDetailDto = modelMapper.map(purchaseDetail, PurchaseDetailDTO.class);

		if (purchaseDetail.getGame() != null) {
			purchaseDetailDto.setGameName(purchaseDetail.getGame().getTitle());
			purchaseDetailDto.setGameId(purchaseDetail.getGame().getGameId());
			purchaseDetailDto.setUnitPrice(purchaseDetail.getGame().getPrice());
		}

		return purchaseDetailDto;
	}

	public PurchaseDetail convertToEntity(PurchaseDetailDTO purchaseDetailDTO) {
		return modelMapper.map(purchaseDetailDTO, PurchaseDetail.class);
	}

}