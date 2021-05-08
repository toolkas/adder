package ru.toolkaz.added.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/math")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class AddController {
    @GetMapping("/add/{a}/{b}")
    public int add(@PathVariable("a") int a, @PathVariable("b") int b) {
        return a + b;
    }
}
