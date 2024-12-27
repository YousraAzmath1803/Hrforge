package com.example.Profile.Management.controller;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController, com.example.Profile.Management.controller.ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        // Returning a custom error page
        return "error";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
