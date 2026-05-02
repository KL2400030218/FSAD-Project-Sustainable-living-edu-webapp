package com.sustainable.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.sustainable.backend.model.Lesson;
import com.sustainable.backend.service.LessonService;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "*")
public class LessonController {

    private final LessonService service;

    public LessonController(LessonService service) {
        this.service = service;
    }

    @GetMapping
    public List<Lesson> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Lesson create(@RequestBody Lesson lesson) {
        return service.save(lesson);
    }
    
    @PutMapping("/{id}")
    public Lesson update(@PathVariable Long id, @RequestBody Lesson lesson) {
        return service.update(id, lesson);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}