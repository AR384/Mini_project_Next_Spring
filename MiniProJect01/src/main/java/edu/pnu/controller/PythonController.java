package edu.pnu.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import edu.pnu.domain.FastApiResultDTO;
import edu.pnu.domain.ImageSelectDTO;
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
	@PostMapping("/imgToPython") 
	public Mono<ResponseEntity<Map<String, String>>> arriveImageFromFront(@RequestParam("image") MultipartFile file) throws IOException{
		return  imageProcessService.sendImageToFastApi(file); //메세지받는것 까지는 동기 처리
	}

	//처리결과 조회 
	@GetMapping("/imgresult/{jobid}")
	public Mono<ResponseEntity<FastApiResultDTO>> getImageResult(@PathVariable String jobid) {
		return imageProcessService.getImageFromFastApi(jobid);
	}
	//이미지처리승인
	@PostMapping("/imgpermitTopython/{jobid}")
	public Mono<ResponseEntity<ImageSelectDTO>> arrivepermitFromFront(@PathVariable String jobid,@RequestBody ImageSelectDTO body){
		return imagePermisionService.postImagepermit(jobid ,body);
	}
	
}
