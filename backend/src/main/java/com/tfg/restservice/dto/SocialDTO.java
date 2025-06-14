package com.tfg.restservice.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Getter
@Setter

public class SocialDTO {

	private UUID socialId;

	private String steamUrl;

	private String twitchUrl;

	private String youtubeUrl;

	private String discordTag;

}