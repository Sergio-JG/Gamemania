package com.tfg.restservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@SpringBootApplication
@EntityScan("com.tfg.restservice.model")

public class RestServiceApplication {

	public static void main(String[] args) {
		System.out.println("A");
		// createDatabase();
		SpringApplication.run(RestServiceApplication.class, args);
	}

	public static void createDatabase() {
		String url = "jdbc:mysql://localhost:3306/";
		String username = "root";
		String password = "root";
		String databaseName = "gamemania";

		try (Connection conn = DriverManager.getConnection(url, username, password);
				Statement stmt = conn.createStatement()) {
			String sql = "CREATE DATABASE IF NOT EXISTS " + databaseName;
			stmt.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
