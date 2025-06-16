package edu.pnu.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseDTO<T> {
	private String status;
	private String message;
	private T data;
}
