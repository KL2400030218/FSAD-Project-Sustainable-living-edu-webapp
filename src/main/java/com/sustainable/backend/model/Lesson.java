package com.sustainable.backend.model;

import jakarta.persistence.*;

@Entity
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int marks;
    private String content;

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getMarks() { return marks; }
    public String getContent() { return content; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setMarks(int marks) { this.marks = marks; }
    public void setContent(String content) { this.content = content; }
}