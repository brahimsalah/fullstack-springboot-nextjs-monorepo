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
    public Todo getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
    }
    public Todo create(Todo t) { return repo.save(t); }
    public void delete(Long id) { repo.deleteById(id); }

    public Todo update(Long id, Todo payload) {
        Todo todo = repo.findById(id).orElseThrow();
        todo.setTitle(payload.getTitle());
        todo.setDescription(payload.getDescription());
        todo.setDone(payload.isDone());
        return repo.save(todo);
    }
}