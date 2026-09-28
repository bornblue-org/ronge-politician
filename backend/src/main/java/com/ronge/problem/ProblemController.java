package com.ronge.problem;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProblemController {
  private static final Set<String> DISTRICTS = Set.of("pune", "kolhapur", "sangli", "satara", "solapur");
  private static final Set<String> TOPICS = Set.of(
      "pension", "seniority", "transfer", "salary", "medical", "aided", "school", "other");

  private final TeacherProblemRepository problems;

  public ProblemController(TeacherProblemRepository problems) {
    this.problems = problems;
  }

  @PostMapping("/problems")
  ProblemResponse create(@Valid @RequestBody ProblemRequest request) {
    if (!DISTRICTS.contains(request.district())) {
      throw new IllegalArgumentException("Choose a district");
    }
    if (!TOPICS.contains(request.topic())) {
      throw new IllegalArgumentException("Choose a topic");
    }
    TeacherProblem problem = new TeacherProblem();
    problem.setName(request.name().trim());
    problem.setPhone(request.phone().trim());
    problem.setDistrict(request.district());
    problem.setSchool(request.school() == null ? "" : request.school().trim());
    problem.setTopic(request.topic());
    problem.setDetail(request.detail().trim());
    return ProblemResponse.from(problems.save(problem));
  }

  @GetMapping("/admin/problems")
  List<ProblemResponse> list() {
    return problems.findAllByOrderByCreatedAtDesc().stream().map(ProblemResponse::from).toList();
  }

  public record ProblemRequest(
      @NotBlank @Size(max = 200) String name,
      @NotBlank @Size(max = 40) String phone,
      @NotBlank @Size(max = 40) String district,
      @Size(max = 300) String school,
      @NotBlank @Size(max = 80) String topic,
      @NotBlank @Size(max = 4000) String detail
  ) {}

  public record ProblemResponse(
      Long id, String name, String phone, String district, String school, String topic, String detail, Instant createdAt
  ) {
    static ProblemResponse from(TeacherProblem problem) {
      return new ProblemResponse(
          problem.getId(), problem.getName(), problem.getPhone(), problem.getDistrict(),
          problem.getSchool(), problem.getTopic(), problem.getDetail(), problem.getCreatedAt());
    }
  }
}
