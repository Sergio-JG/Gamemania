package com.tfg.restservice.repository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.restservice.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, UUID> {

	List<Sale> findBySaleDateBetween(Date startDate, Date endDate);

	List<Sale> findByUserUserId(UUID userId);

}
