package edu.pnu.service;


import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.pnu.domain.ApiResponseDTO;
import edu.pnu.domain.ImagePermitRequestDTO;
import edu.pnu.domain.ImagePermitResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImagePermisionService {
	private final WebClient fastApiWebClient;

	public Mono<ResponseEntity<ApiResponseDTO<ImagePermitResponseDTO>>> postImagepermit(String jobid, ImagePermitRequestDTO imagePermitRequestDTO) {
	    log.info("작업아이디 : {}", jobid);
	    log.info("바디 내용물 : {}", imagePermitRequestDTO);
	    return fastApiWebClient.post()
	        .uri(uriBuilder -> uriBuilder.path("/fastapi/inference/{jobid}/permission").build(jobid))
	        .bodyValue(imagePermitRequestDTO)
	        .retrieve()
	        .toEntity(new ParameterizedTypeReference<ApiResponseDTO<ImagePermitResponseDTO>>() {})
	        .doOnNext(res -> log.info("FastAPI 응답 본문: {}", res.getBody()));
	}



}
