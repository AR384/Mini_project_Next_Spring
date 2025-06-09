package edu.pnu.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
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
public class Members {
	@Id
	private String username;
	@Column(nullable = false)
	private String password;
	@Column(columnDefinition = "varchar(32)")
	private String nickname;
	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "varchar(32) default 'ROLE_MEMBER'")
	private Role role;
	@Column(columnDefinition = "boolean default true")
	private boolean enabled;
}
