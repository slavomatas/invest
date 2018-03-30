package sk.ystad.controllers;

import javassist.NotFoundException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import sk.ystad.ServerApplication;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {


    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    @ExceptionHandler(value = { ConstraintViolationException.class })
    protected ResponseEntity handleValidation(ConstraintViolationException e, WebRequest request) {
        return new ResponseEntity<>("Wrong input parameters\n" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {NotFoundException.class})
    protected ResponseEntity handleNotFound(NotFoundException e, WebRequest request) {
        logger.error(e);
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
