package com.example;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Todo> list() {
        return service.all();
    }

    @GetMapping("/{id}")
    public Todo getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Todo create(@RequestBody Todo payload) {
        return service.create(payload);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo payload) {
        return service.update(id, payload);
    }
}