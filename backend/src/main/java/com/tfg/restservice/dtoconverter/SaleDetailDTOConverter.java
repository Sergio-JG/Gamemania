package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.SaleDetailDTO;
import com.tfg.restservice.model.SaleDetail;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class SaleDetailDTOConverter {

	private final ModelMapper modelMapper;

	public SaleDetailDTO convertToDto(SaleDetail saleDetail) {

		SaleDetailDTO saleDetailDto = modelMapper.map(saleDetail, SaleDetailDTO.class);

		if (saleDetail.getGame() != null) {
			saleDetailDto.setGameName(saleDetail.getGame().getTitle());
			saleDetailDto.setGameId(saleDetail.getGame().getGameId());
			saleDetailDto.setUnitPrice(saleDetail.getGame().getPrice());
		}

		return saleDetailDto;
	}

	public SaleDetailDTO convertToEntity(SaleDetailDTO saleDTO) {
		return modelMapper.map(saleDTO, SaleDetailDTO.class);
	}

}