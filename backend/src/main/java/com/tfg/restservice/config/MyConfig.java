package com.tfg.restservice.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfig {

	@Bean
	ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Configuration
	static class CorsConfig implements WebMvcConfigurer {
		@Override
		public void addCorsMappings(@NonNull CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("http://localhost:5173")
					.allowedMethods("*")
					.allowCredentials(true);
		}
	}
}
