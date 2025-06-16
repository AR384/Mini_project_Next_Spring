package edu.pnu.domain;


import org.springframework.web.multipart.MultipartFile;

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
public class ImageUploadRequestDTO {
	private MultipartFile image;
	private String username;
}
