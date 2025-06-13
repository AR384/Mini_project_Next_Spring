package edu.pnu.domain;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@Entity는 DB 저장이 필요한 클래스에만
@Getter@Setter@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FastApiResultDTO {
	private String message;
	private String file;
	private String image_base64;
	private String status;
	private List<?> poly;
	private List<?> names;
}
