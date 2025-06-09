package edu.pnu.util;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

//JWT 토큰 생성 Oauth2
public class JWTUtil {
	public static final long ACCESS_TOKEN_MESC = 10*(6*1000); //1000ms * 6 
	public static final String JWT_KEY = "edu.pnu.jwt";
	public static final String claimName = "username";
	public static final String PREFIX = "Bearer ";
	
	private static String getJWTSource(String token) {
		if (token.startsWith(PREFIX)) return token.replace(PREFIX, "");
		return token;
	}

	public static String getJWT(String username) {
		String src = JWT.create()
				.withClaim(claimName,username)
				.withExpiresAt(new Date(System.currentTimeMillis()+ACCESS_TOKEN_MESC))
				.sign(Algorithm.HMAC256(JWT_KEY));
		String token = PREFIX+src;
		return token;
	}
	
	public static String getClaim(String token) {
		String tok = getJWT(token);
		return JWT.require(Algorithm.HMAC256(JWT_KEY)).build().verify(tok).getClaim(claimName).asString();
	}
	public static boolean isExpired(String token) {
		String tok = getJWTSource(token);
		return JWT.require(Algorithm.HMAC256(JWT_KEY)).build().verify(tok).getExpiresAt().before(new Date());
	}
}
