package edu.pnu.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.pnu.domain.ImageSelectDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImagePermisionService {
	private final WebClient fastApiWebClient;
	
	public Mono<ResponseEntity<ImageSelectDTO>> postImagepermit(String jobid, ImageSelectDTO body){
		log.info("작업아이디 : " + jobid);
		log.info("바디 내용물 " + body);
		return fastApiWebClient.post()
				.uri(uribuider->uribuider.path("/userselected/img/{job_id}").build(jobid))
				.bodyValue(body)
				.retrieve()
				.toEntity(ImageSelectDTO.class);
	}

}
