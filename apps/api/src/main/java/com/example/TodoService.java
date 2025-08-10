package com.example;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class TodoService {
    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> all() { return repo.findAll(); }
    public Todo create(Todo t) { return repo.save(t); }
    public void delete(Long id) { repo.deleteById(id); }
}