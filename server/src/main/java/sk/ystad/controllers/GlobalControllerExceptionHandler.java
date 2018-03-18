package sk.ystad.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(value = { ConstraintViolationException.class })
    protected ResponseEntity<Object> handleValidation(ConstraintViolationException e, WebRequest request) {
        String bodyOfResponse = "This should be application specific";
        return new ResponseEntity("Wrong input parameters\n" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
