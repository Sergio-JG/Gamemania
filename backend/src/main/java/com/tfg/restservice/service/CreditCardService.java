package com.tfg.restservice.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tfg.restservice.model.CreditCard;
import com.tfg.restservice.repository.CreditCardRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CreditCardService {

    private final CreditCardRepository creditCardRepository;

    public CreditCardService(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    public CreditCard getCreditCardByUserId(UUID userId) {
        return creditCardRepository.findByUserUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Credit card not found for user " + userId));
    }
}
