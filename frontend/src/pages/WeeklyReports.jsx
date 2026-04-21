import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import '../styles/dash.css';

function WeeklyReports() {
    const [report, setReport] = useState({ startDate: "", endDate: "", accomplishments: "", challenges: "" });

    const handleChange = (e) => setReport(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Weekly Report Data:", report);
        alert("Weekly Report submitted successfully! 👋");
    };

    return (
    <Container className="mt-4">
        <h3 className="login-heading text-start">Weekly Progress 📊</h3>
        <Card className="main-card">
            <Card.Header>📄 Submission Portal</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm={3} className="fw-bold">Week Start Date</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="date" name="startDate" className="form-control" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm={3} className="fw-bold">Week End Date</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="date" name="endDate" className="form-control" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 align-items-start">
                        <Form.Label column sm={3} className="fw-bold">Accomplishments</Form.Label>
                        <Col sm={9}>
                            <Form.Control as="textarea" name="accomplishments" rows={4} className="form-control" placeholder="What did you achieve this week?" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4 align-items-start">
                        <Form.Label column sm={3} className="fw-bold">Challenges Faced</Form.Label>
                        <Col sm={9}>
                            <Form.Control as="textarea" name="challenges" rows={4} className="form-control" placeholder="What challenges did you face this week?" onChange={handleChange} required />
                        </Col>
                    </Form.Group>

                    <Button type="submit" className="action-btn text-white w-100">Submit Weekly Report</Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
);
}

export default WeeklyReports;