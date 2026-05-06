import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import '../styles/dash.css';

function EnrollmentForm() {
    const [enrollmentData, setEnrollmentData] = useState({
        companyName: "",
        department: "",
        supervisorName: "",
        supervisorEmail: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (e) => setEnrollmentData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Enrollment submitted successfully! 👋");
    };

    return (
        <Container className="mt-4">
            <h3 className="login-heading text-start">Internship Enrollment 🏢</h3>
            <p className="text-muted">Register your confirmed workplace and supervisor</p>
            
            <Card className="main-card">
                <Card.Header>📍 Placement Details</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Company Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="companyName" className="custom-input" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Department</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="department" className="custom-input" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Supervisor Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="supervisorName" className="custom-input" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Supervisor Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" name="supervisorEmail" className="custom-input" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Start Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="date" name="startDate" className="custom-input" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">End Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="date" name="endDate" className="custom-input" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Button type="submit" className="action-btn text-white w-100">
                            Confirm Enrollment
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EnrollmentForm;