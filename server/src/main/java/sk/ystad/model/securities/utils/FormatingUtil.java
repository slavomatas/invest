package sk.ystad.model.securities.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class FormatingUtil {

    public static Date formatStringToDate(String dateAsString, String pattern) throws ParseException {
        DateFormat format = new SimpleDateFormat(pattern, Locale.ENGLISH);
       return format.parse(dateAsString);
    }
}
