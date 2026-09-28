package com.ronge.problem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherProblemRepository extends JpaRepository<TeacherProblem, Long> {
  List<TeacherProblem> findAllByOrderByCreatedAtDesc();
}
