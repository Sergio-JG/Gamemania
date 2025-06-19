package com.tfg.restservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@SpringBootApplication
@EntityScan("com.tfg.restservice.model")

public class RestServiceApplication {

	public static void main(String[] args) {
		createDatabase();
		SpringApplication.run(RestServiceApplication.class, args);

		SpringApplication app = new SpringApplication(RestServiceApplication.class);
		ConfigurableApplicationContext context = app.run(args);

		String[] beans = context.getBeanDefinitionNames();
		for (String bean : beans) {
			if (bean.toLowerCase().contains("repository") || bean.toLowerCase().contains("entity")) {
				System.out.println(bean);
			}
		}
	}

	public static void createDatabase() {
		String url = "jdbc:postgresql://localhost:5432/postgres";
		String username = "admin";
		String password = "Admin";
		String databaseName = "gamemania";

		try (Connection conn = DriverManager.getConnection(url, username, password);
				Statement stmt = conn.createStatement()) {

			String checkDbSql = "SELECT 1 FROM pg_database WHERE datname = '" + databaseName + "';";
			var rs = stmt.executeQuery(checkDbSql);

			if (!rs.next()) {
				String createDbSql = "CREATE DATABASE " + databaseName + " " +
						"WITH OWNER = postgres " +
						"ENCODING = 'UTF8' " +
						"LC_COLLATE = 'Spanish_Spain.1252' " +
						"LC_CTYPE = 'Spanish_Spain.1252' " +
						"LOCALE_PROVIDER = 'libc' " +
						"TABLESPACE = pg_default " +
						"CONNECTION LIMIT = -1 " +
						"IS_TEMPLATE = False;";
				stmt.executeUpdate(createDbSql);
				String createExtensionSql = "CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";";
				stmt.executeUpdate(createExtensionSql);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
