package com.tfg.restservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.restservice.model.Address;

public interface AddressRepository extends JpaRepository<Address, UUID> {

}