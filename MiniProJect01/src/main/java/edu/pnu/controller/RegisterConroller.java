package edu.pnu.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import edu.pnu.config.SecurityConfig;
import edu.pnu.domain.Members;

import edu.pnu.persistence.MemberRepository;

@RestController
public class RegisterConroller {

    private final SecurityConfig securityConfig;
	@Autowired
	private MemberRepository mrp;
	@Autowired
	private PasswordEncoder encoder = new BCryptPasswordEncoder();


    RegisterConroller(SecurityConfig securityConfig) {
        this.securityConfig = securityConfig;
    }
	

	@PostMapping("/registeration")
	public ResponseEntity<?> registerUser(@RequestBody Members membersEntity) {
		System.out.println("post 회원가입 요청 결과 : " );
		
		System.out.println(membersEntity.getUsername());
		System.out.println(membersEntity.getPassword());
		System.out.println(membersEntity.getNickname());
		System.out.println(membersEntity.getRole());
		System.out.println(membersEntity.isEnabled());
		
		if (mrp.existsById(membersEntity.getUsername())) {
			return ResponseEntity.ok("이미 존재하는 아이디 입니다.");
		}else {
			Members m = Members.builder()
					.username(membersEntity.getUsername())
					.password(encoder.encode(membersEntity.getPassword()))
					.nickname(membersEntity.getNickname())
					.role(membersEntity.getRole())
					.enabled(membersEntity.isEnabled())
					.build();
			
			mrp.save(m);
			
			return ResponseEntity.ok("회원가입 성공");
		}
		
	}
	
}
