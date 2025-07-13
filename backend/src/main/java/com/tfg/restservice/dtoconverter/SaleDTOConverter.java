package com.tfg.restservice.dtoconverter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.SaleDTO;
import com.tfg.restservice.dto.SaleDetailDTO;
import com.tfg.restservice.model.Game;
import com.tfg.restservice.model.Sale;
import com.tfg.restservice.model.SaleDetail;
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
		Sale sale = new Sale();
		sale.setSaleId(Optional.ofNullable(saleDTO.getSaleId()).orElse(UUID.randomUUID()));
		sale.setSaleDate(saleDTO.getSaleDate());
		sale.setTotalAmount(saleDTO.getTotalAmount());

		List<SaleDetail> details = new ArrayList<>();
		if (saleDTO.getSaleDetail() != null) {
			for (SaleDetailDTO detailDTO : saleDTO.getSaleDetail()) {

				SaleDetail detail = new SaleDetail();
				detail.setSale(sale);
				detail.setQuantity(detailDTO.getQuantity());

				Game game = gameRepository.findById(detailDTO.getGameId()).orElse(null);
				detail.setGame(game);
				details.add(detail);
			}
		}

		sale.setSaleDetail(details);
		return sale;
	}

}
