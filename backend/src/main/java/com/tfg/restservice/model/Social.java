
package com.tfg.restservice.model;

import java.util.UUID;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "social")

@Getter
@Setter

public class Social {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "social_id")
	@NonNull
	private UUID socialId;

	@OneToOne(mappedBy = "social", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumn(name = "user_id")
	@JsonBackReference
	private User user;

	@Column(name = "steam_url")
	private String steamUrl;

	@Column(name = "twitch_url")
	private String twitchUrl;

	@Column(name = "youtube_url")
	private String youtubeUrl;

	@Column(name = "discord_tag")
	private String discordTag;

}
