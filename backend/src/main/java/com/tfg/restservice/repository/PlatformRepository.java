package com.tfg.restservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.restservice.model.Platform;

public interface PlatformRepository extends JpaRepository<Platform, UUID> {

}