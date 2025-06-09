package edu.pnu.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import edu.pnu.config.filter.JWTAuthenticationFilter;
import edu.pnu.config.filter.JWTAuthorizationFilter;
//import edu.pnu.config.OAuth2SuccessHandler;
import edu.pnu.persistence.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final OAuth2SuccessHandler successHandler;
	@Autowired
	private MemberRepository mrp;
	@Autowired
	private AuthenticationConfiguration authenticationConfiguration;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		
		http.authorizeHttpRequests(security->security
				.requestMatchers("/member/**").authenticated()
				.requestMatchers("/manager/**").hasAnyRole("MANAGER","ADMIN")
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.anyRequest().permitAll()
				);
		http.csrf(c->c.disable());
		http.formLogin(f->f.disable());
		http.httpBasic(b->b.disable());
		http.sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()));
		http.addFilterBefore(new JWTAuthorizationFilter(mrp),AuthorizationFilter.class);
		
		http.oauth2Login(o->o
//				.loginPage("http://localhost:3000")
				.successHandler(successHandler)
				);
		
		http.logout(logout->logout
				.logoutUrl("/logout")
				.logoutSuccessHandler((request,response,authentication)->{
					SecurityContextHolder.clearContext();
					Cookie cookie = new Cookie("jwtToken", null);
					cookie.setHttpOnly(true);//JS에서 접근 불가 (보안 목적)
					cookie.setSecure(true);//	HTTPS에서만 동작하도록 설정
					cookie.setPath("/");
					cookie.setMaxAge(0);
					response.addCookie(cookie);
					response.setStatus(HttpServletResponse.SC_OK);//HTTP 상태 코드를 200 OK로 설정
					response.setContentType("application/json");//응답 본문(Response Body)의 형식
					response.getWriter().write("{\"message\":\"로그아웃성공\"}");
					response.getWriter().flush();//버퍼에 저장된 내용을 강제로 클라이언트로 전송
					
				}).permitAll()
				
				);
		http.cors(cors->cors.configurationSource(corSource()));
		
		return http.build();
	}
	private CorsConfigurationSource corSource() {
		CorsConfiguration cfg = new CorsConfiguration();
//		cfg.addAllowedOrigin("http://localhost:3000");  //set은 여러번 기존에 추가된 오리진 덮어씀
		cfg.setAllowedOrigins(Arrays.asList(
			    "http://localhost:3000"
//			    "https://kdtminiproject.myvnc.com:3000" //집에 서버 접속 안해도되서 주석해둠 넥스트에서 api로 접근하기 때문에 같은 로컬로 접속하는거라 안함
			));
		cfg.addAllowedHeader(CorsConfiguration.ALL);
		cfg.addAllowedMethod(CorsConfiguration.ALL);//Get Post Delete Put 허용
		cfg.setAllowCredentials(true);//인증정보를 허용 해당 메서드가 true 이면 addAllowedOrigin() 는* 사용할수 없고 특정 주소만가능
		cfg.addExposedHeader(HttpHeaders.AUTHORIZATION);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", cfg);
		return source;
	}

}
