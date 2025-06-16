package edu.pnu.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.ApiResponseDTO;
import edu.pnu.domain.ImageProcessResultDTO;
import edu.pnu.domain.ImagePermitRequestDTO;
import edu.pnu.domain.ImagePermitResponseDTO;
import edu.pnu.domain.ImageUploadRequestDTO;
import edu.pnu.domain.ImageUploadResponseDTO;
import edu.pnu.service.ImagePermisionService;
import edu.pnu.service.ImageProcessService;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
public class PythonController {
	@Autowired
	private ImageProcessService imageProcessService;
	@Autowired
	private ImagePermisionService imagePermisionService;
	/* 추후 /member/imgToPython으로 변경필요  @RequestMapping(" /member" ) auth객체도 필요할듯?*/
	
	//프론트에서 이미지 받기
	@PostMapping("/api/inference") 
	public Mono<ResponseEntity<ApiResponseDTO<ImageUploadResponseDTO>>> arriveImageFromFront(@ModelAttribute ImageUploadRequestDTO imageUploadRequestDTO) throws IOException{
		log.info("Next.js 로부터 이미지 업로드 요청 도착 - username: {}, 파일명: {}, 크기: {} bytes",
		        imageUploadRequestDTO.getUsername(),
		        imageUploadRequestDTO.getImage().getOriginalFilename(),
		        imageUploadRequestDTO.getImage().getSize());
		return  imageProcessService.sendImageToFastApi(imageUploadRequestDTO); //메세지받는것 까지는 동기 처리
	}

	//처리결과 조회 
	@GetMapping("/api/inference/{jobid}/result")
	public Mono<ResponseEntity<ApiResponseDTO<ImageProcessResultDTO>>> getImageResult(@PathVariable String jobid) {
		log.info("Next.js 로 결과 이미지 반환");
		return imageProcessService.getImageFromFastApi(jobid);
	}
	
	//이미지처리승인
	@PostMapping("/api/inference/{jobid}/permission")
	public Mono<ResponseEntity<ApiResponseDTO<ImagePermitResponseDTO>>>arrivepermitFromFront(@PathVariable String jobid,@RequestBody ImagePermitRequestDTO body){
		log.info("Next.js 로 부터 이미지 승인");
		return imagePermisionService.postImagepermit(jobid ,body);
	}
	
}
