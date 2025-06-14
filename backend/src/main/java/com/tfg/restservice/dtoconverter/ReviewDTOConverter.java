package com.tfg.restservice.dtoconverter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.tfg.restservice.dto.ReviewDTO;
import com.tfg.restservice.model.Review;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class ReviewDTOConverter {

	private final ModelMapper modelMapper;

	public ReviewDTO convertToDto(Review review) {
		return modelMapper.map(review, ReviewDTO.class);

	}

	public Review convertToEntity(ReviewDTO reviewDTO) {
		return modelMapper.map(reviewDTO, Review.class);
	}

}