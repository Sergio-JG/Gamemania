package com.tfg.restservice.dtoconverter;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.SaleDTO;
import com.tfg.restservice.model.Game;
import com.tfg.restservice.model.Sale;
import com.tfg.restservice.repository.GameRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SaleDTOConverter {

	private final ModelMapper modelMapper;
	private final SaleDetailDTOConverter saleDetailDTOConverter;
	private final GameRepository gameRepository;

	public SaleDTO convertToDto(Sale sale) {
		SaleDTO saleDTO = modelMapper.map(sale, SaleDTO.class);

		saleDTO.setFirstName(sale.getUser().getFirstName());
		saleDTO.setSecondName(sale.getUser().getLastName());

		saleDTO.setSaleDetail(
				sale.getSaleDetail().stream().map(saleDetailDTOConverter::convertToDto).collect(Collectors.toList()));

		return saleDTO;
	}

	public Sale convertToEntity(SaleDTO saleDTO) {
		Sale sale = modelMapper.map(saleDTO, Sale.class);

		if (saleDTO.getSaleDetail() != null) {
			sale.getSaleDetail().forEach(detail -> {
				detail.setSale(sale);
				Game game = gameRepository.findById(detail.getGame().getGameId()).orElse(null);
				detail.setGame(game);
			});
		}

		return sale;
	}
}
