package com.andrewtran.graphqlserver.utils;

import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import com.google.common.hash.Hashing;


@Service
public class StringUtil {

  private String ss_api_k = "tpt2213";

  public String getSha256hex(String originalString) {
    return Hashing.sha256()
    .hashString(originalString + ss_api_k, StandardCharsets.UTF_8)
    .toString();
  }
}