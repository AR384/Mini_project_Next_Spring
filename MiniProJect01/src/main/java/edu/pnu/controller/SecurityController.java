package edu.pnu.controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import edu.pnu.domain.Members;
import edu.pnu.service.MemberService;
import edu.pnu.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class SecurityController {
	private final MemberService memberService;
	
	@GetMapping("/")
	public void index(HttpServletResponse response) throws IOException{
//		response.sendRedirect("http://localhost:3000/");
		response.sendRedirect("http://kdtminiproject.myvnc.com:3000/");
	}
	@PostMapping("/api/user")
	public ResponseEntity<?> jwtCallBack(HttpServletRequest request){
		log.info("SecuritController :  jwtCallBack");
		String jwtToken = null;
		Cookie[] cookies = request.getCookies();
		System.out.println(cookies);
		for(Cookie cookie :cookies) {
			if (!cookie.getName().equals("jwtToken")) continue; 
			try {
				jwtToken = URLDecoder.decode(cookie.getValue(),"utf-8");
				System.out.println("cookie token "+jwtToken);
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
			break;
		}
		return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtToken).build();
	}
	
	/*
	 * @GetMapping("/loged-in/user") public ResponseEntity<?>
	 * getUserInfo(HttpServletRequest request){
	 * log.info("SecuritController :  getUserInfo "+request.getHeader("Referer"));
	 * String jwtToken = null; Cookie[] cookies = request.getCookies(); for(Cookie
	 * cookie : cookies) { if(!cookie.getName().equals("jwtToken")) continue; try {
	 * jwtToken = cookie.getValue(); } catch (Exception e) {
	 * System.out.println(e.getMessage()); return
	 * ResponseEntity.status(HttpStatus.BAD_REQUEST).body("토큰 디코딩 실패"); } break; }
	 * 
	 * if (jwtToken ==null) { return
	 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰없음"); } try { String
	 * username = JWT.require(Algorithm.HMAC256(JWTUtil.JWT_KEY)) .build()
	 * .verify(jwtToken) .getClaim(JWTUtil.claimName) .asString(); Members member =
	 * memberService.getMembers(username);
	 * 
	 * Map<String, Object> userInfo = new HashMap<>(); // userInfo.put("username",
	 * username); userInfo.put("username", member.getUsername());
	 * userInfo.put("nickname", member.getNickname()); userInfo.put("role",
	 * member.getRole()); return ResponseEntity.ok(userInfo); } catch (Exception e)
	 * { log.error("JWT 검증 실패: {}", e.getMessage()); return
	 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰"); }
	 * 
	 * }
	 */

	@GetMapping("/loged-in/user")
	public ResponseEntity<?> getUserInfo(Authentication auth){
		
		if (auth == null || !auth.isAuthenticated()) {
			log.info("getUserInfo : 호출 auth가 null 혹은 인증이 안되어있음 Axios withcredential 확인 필요");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 되어있지 않음");
		}
		Map<String, Object> userInfo = new HashMap<>();
		 
		if (auth.getPrincipal() instanceof OAuth2User oAuth2User ) {
//			String email = oAuth2User.getAttribute("email");
			userInfo.put("logintype", "Oauth2등록유저");
		}else if (auth.getPrincipal() instanceof User user ) {
			userInfo.put("logintype", "DB등록유저");
			Members member = memberService.getMembers(user.getUsername());
			userInfo.put("username", member.getUsername());
			userInfo.put("nickname", member.getNickname());
			userInfo.put("role", member.getRole());
			userInfo.put("isLogin", "logged-in");

		}
		return ResponseEntity.ok(userInfo);
	}
	
	
	@GetMapping("/member")
	public String member() {
		return "member";
	}
	@GetMapping("/manager")
	public String manager() {
		return "manager";
	}
	@GetMapping("/admin")
	public String admin() {
		return "admin";
	}
	

}
