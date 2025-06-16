package edu.pnu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
	//파일 교환 사이즈 현재 100mb 사이즈 작으면 문제 생김
	ExchangeStrategies strategies = ExchangeStrategies.builder().codecs(configurer-> configurer.defaultCodecs().maxInMemorySize(100*1024*1024)).build();
	
	@Bean
	public WebClient fastApiWebClient() {
//		return WebClient.builder().baseUrl("http://localhost:8000").exchangeStrategies(strategies).build();
//		return WebClient.builder().baseUrl("http://192.168.219.104:8000").exchangeStrategies(strategies).build();
		return WebClient.builder().baseUrl("http://10.125.121.185:8000").exchangeStrategies(strategies).build();
	}
}
