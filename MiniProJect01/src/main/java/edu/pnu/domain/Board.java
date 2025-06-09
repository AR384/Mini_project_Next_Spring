package edu.pnu.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString
@Entity@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String title;
	@Column(nullable = false)
	private String content;
	@Column(nullable = false)
	private String wirter;
	@Column(columnDefinition = "timestamp default current_timestamp" , updatable = false)
	private LocalDateTime createDate;
	@PrePersist
	protected void onCreate() {
		this.createDate = LocalDateTime.now();
	}
	
	

}
