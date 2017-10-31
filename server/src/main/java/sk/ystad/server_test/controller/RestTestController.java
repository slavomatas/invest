package sk.ystad.server_test.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.server_test.model.Response;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by martin on 31.10.2017.
 */
@RestController
@RequestMapping("/test_rest")
public class RestTestController {
    @RequestMapping(method = RequestMethod.GET)
    public Response testRest() {
        return new Response();
    }

}
