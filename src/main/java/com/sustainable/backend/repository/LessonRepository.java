package com.sustainable.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sustainable.backend.model.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
