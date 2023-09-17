package com.andrewtran.graphqlserver.utils;

import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.Date;


@Service
public class DateUtil {

  public Date parseDateData(String input) {
    //  "MM-dd-yyyy"
    SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy");      
    try {
      return formatter.parse(input);
    }
    catch (Exception e) {
      //The handling for the code
      System.out.println(e);
      return new Date();
    }      
  }
}