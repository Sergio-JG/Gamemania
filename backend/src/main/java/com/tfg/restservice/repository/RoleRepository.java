package com.tfg.restservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.restservice.model.Role;

public interface RoleRepository extends JpaRepository<Role, UUID> {

	Role findByName(String name);

}