package com.sustainable.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.sustainable.backend.model.Lesson;
import com.sustainable.backend.repository.LessonRepository;

@Service
public class LessonService {

    private final LessonRepository repo;

    public LessonService(LessonRepository repo) {
        this.repo = repo;
    }

    // GET
    public List<Lesson> getAll() {
        return repo.findAll();
    }

    // POST
    public Lesson save(Lesson lesson) {
        return repo.save(lesson);
    }

    // DELETE
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // UPDATE ✅ (FIXED)
    public Lesson update(Long id, Lesson updatedLesson) {
        Lesson lesson = repo.findById(id).orElseThrow();
        lesson.setName(updatedLesson.getName());
        lesson.setMarks(updatedLesson.getMarks());
        return repo.save(lesson);
    }
}