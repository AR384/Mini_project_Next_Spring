package edu.pnu.util;

import org.springframework.http.MediaType;

public class MyImageUtil {
	
	public MediaType getmeMediaType(String filename) {
		String extracting = filename.substring(filename.lastIndexOf('.') +1 ).toLowerCase();
		return switch (extracting) {
		case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
		case "png" -> MediaType.IMAGE_PNG;
        case "gif" -> MediaType.IMAGE_GIF;
        case "webp" -> MediaType.valueOf("image/webp");
        case "bmp" -> MediaType.valueOf("image/bmp");
        case "tiff", "tif" -> MediaType.valueOf("image/tiff");
        case "svg" -> MediaType.valueOf("image/svg+xml");
		default ->  MediaType.APPLICATION_OCTET_STREAM;
		};
	}

}
