package com.tfg.restservice.model;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "review")
@Getter
@Setter
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "review_id")
	@NonNull
	private UUID reviewId;

	@Column(name = "score", precision = 3, scale = 1)
	private BigDecimal score;

	@Column(name = "comment", columnDefinition = "TEXT")
	private String comment;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	@JsonProperty("username")
	public String getUsername() {
		return user != null ? user.getUsername() : null;
	}

	@JsonProperty("profilePic")
	public String getProfilePic() {
		return user != null ? user.getProfilePic() : null;
	}

	@ManyToOne
	@JoinColumn(name = "game_id")
	@JsonIgnore
	private Game game;
}
