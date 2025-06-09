package edu.pnu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Members;
import edu.pnu.persistence.MemberRepository;

@Service
public class SecurityUserDetailService implements UserDetailsService {
	
	@Autowired
	private MemberRepository mrp;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Members m = mrp.findById(username).orElseThrow(() -> new UsernameNotFoundException("에러 : "+ username + " 를 찾지 못하였습니다."));
		return new User(m.getUsername(),m.getPassword(),AuthorityUtils.createAuthorityList(m.getRole().toString()));
	}

}
