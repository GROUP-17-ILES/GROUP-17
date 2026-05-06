import { Container, Card, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import '../styles/dash.css';
function SupervisorEvaluation() {
     const [assignedStudents] = useState([
        { id: "25/U/03585/EVE", name: "Ssenyunja Jack" },
        { id: "25/U/09821/DAY", name: "Namukasa Sarah" },
        { id: "25/U/11244/EVE", name: "Okarun Paul" }
    ]);

    const [evaluationData, setEvaluationData] = useState({
        studentId: "",
        studentName: "",
        comments: "",
        recommendation: "",
    });

    const handleStudentSelect = (e) => {
        const selectedId = e.target.value;
        const student = assignedStudents.find(s => s.id === selectedId);
        setEvaluationData(prev => ({ ...prev, studentId: selectedId, studentName: student ? student.name : "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Performance review for ${evaluationData.studentId} submitted successfully! ✅`);
    };

  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex align-items-center mb-2">
        <span className="badge-custom badge-supervisor me-2">Workplace Supervisor</span>
      </div>
      <h3 className="login-heading text-start">Employer Performance Review 📋</h3>
      <p className="text-muted">Supervisor assessment of student intern performance</p>

      <Card className="main-card mt-4">
        <Card.Header>
          🎖️ Student Evaluation Metric
          <p><small className="text-muted ms-2">Please select an intern to review.</small></p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4 bg-light p-3 rounded mx-1 align-items-center">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Select Student</Form.Label>
                  <Form.Select value={evaluationData.studentId} onChange={handleStudentSelect} className="custom-input" required>
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
               <Form.Label className="fw-bold">Student ID</Form.Label>
               <Form.Control type="text" value={evaluationData.studentId} readOnly className="custom-input" placeholder="Auto-fill on selection" />
              </Col>
            </Row>
         
            <Table responsive className="custom-table mb-4">
              <thead>
                <tr>
                  <th>Performance Factor</th>
                  <th>Excellent (5)</th>
                  <th>Good (4)</th>
                  <th>Fair (3)</th>
                  <th>Poor (2)</th>
                </tr>
              </thead>
              <tbody>
                {['Punctuality', 'Technical Competence', 'Ability to Learn', 'Team Collaboration'].map((factor) => (
                  <tr key={factor}>
                    <td><strong>{factor}</strong></td>
                    {['5', '4', '3', '2'].map((val) => (
                      <td key={val} className="text-center">
                        <Form.Check type="radio" name={factor} id={`${factor}-${val}`} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Supervisor's Qualitative Comments</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                className="custom-input" 
                placeholder="Discuss the intern's strengths and areas for improvement..." 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Overall Recommendation</Form.Label>
              <Form.Select className="custom-input">
                <option>Highly Recommend for Future Employment</option>
                <option>Recommend for Employment</option>
                <option>Requires Further Training</option>
                <option>Not Recommended</option>
              </Form.Select>
            </Form.Group>

           
            <Button type="submit" className="action-btn text-white w-100">
              Submit Final Performance Review
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SupervisorEvaluation;