import { Container, Card, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import '../../styles/dash.css';

function AcademicEvaluation() {
  const [assignedStudents] = useState([
    { id: "25/U/03585/EVE", name: "Ssenyunja Jack" },
    { id: "25/U/09821/DAY", name: "Namukasa Sarah" },
    { id: "25/U/11244/EVE", name: "Adli Hermen" }
  ]);

  const [evaluationData, setEvaluationData] = useState({
    studentId: "",
    studentName: "",
  });

  const handleStudentSelect = (e) => {
    const selectedId = e.target.value;
    const student = assignedStudents.find(s => s.id === selectedId);
    setEvaluationData({
      studentId: selectedId,
      studentName: student ? student.name : ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Academic assessment for ${evaluationData.studentName} submitted successfully! 🎓`);
  };

  const academicFactors = [
    'Logbook Maintenance',
    'Quality of Weekly Reports',
    'Theory-Practice Linkage',
    'Professional Ethics & Conduct',
    'Research/Problem Solving Skills'
  ];

  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex align-items-center mb-2">
        <span className="badge bg-primary text-white p-2 rounded me-2">Academic Supervisor</span>
      </div>
      
      <h3 className="login-heading text-start">Academic Assessment Review 🎓</h3>
      <p className="text-muted">Evaluation of student intern academic progress and documentation.</p>

      <Card className="main-card mt-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">University Evaluation Metric</h5>
          <small className="text-muted">Assess based on university internship standards.</small>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          
            <Row className="mb-4 bg-light p-3 rounded mx-1 align-items-center">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Select Student</Form.Label>
                  <Form.Select 
                    value={evaluationData.studentId} 
                    onChange={handleStudentSelect} 
                    className="custom-input" 
                    required
                  >
                    <option value="">-- Select a Student --</option>
                    {assignedStudents.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Registration Number</Form.Label>
                <Form.Control 
                  type="text" 
                  value={evaluationData.studentId} 
                  readOnly 
                  className="custom-input bg-white" 
                  placeholder="Auto-filled" 
                />
              </Col>
            </Row>

            <Table responsive className="custom-table mb-4">
              <thead>
                <tr>
                  <th>Academic Criteria</th>
                  <th>Excellent (5)</th>
                  <th>Good (4)</th>
                  <th>Average (3)</th>
                  <th>Below Avg (2)</th>
                </tr>
              </thead>
              <tbody>
                {academicFactors.map((factor) => (
                  <tr key={factor}>
                    <td><strong>{factor}</strong></td>
                    {['5', '4', '3', '2'].map((val) => (
                      <td key={val} className="text-center">
                        <Form.Check 
                          type="radio" 
                          name={factor} 
                          id={`${factor}-${val}`} 
                          required 
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Academic Feedback & Observations</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                className="custom-input" 
                placeholder="Describe how the student has applied classroom knowledge to the workplace..." 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Final Grade Recommendation</Form.Label>
              <Form.Select className="custom-input">
                <option>Grade A - Exceptional</option>
                <option>Grade B - Competent</option>
                <option>Grade C - Satisfactory</option>
                <option>Grade D/F - Unsatisfactory</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Submit Academic Assessment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AcademicEvaluation;
