import { useState } from "react";
import { Form, Button, Row, Col, Card, Container} from 'react-bootstrap';

const PlacementForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        Course: "",
        CGPA: "",
    });
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Form submitted successfully!");
    };
    return (
        <Container className="mt-4">           
            <h3>Apply for Internship 💼</h3>
            <p className="text-muted">Submit your profile for placement consideration</p>
            <Card className="main-card mt-4">
                <Card.Header>
                    👤 Student Details
                    <p><small className="text-muted ms-2">All fields are required for a complete profile</small></p>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Full Name</Form.Label>
                            <Form.Control type="text" name="name" className="custom-input" onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control type="email" name="email" className="custom-input" onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Course</Form.Label>
                            <Form.Control type="text" name="Course" className="custom-input" onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">CGPA</Form.Label>
                            <Form.Control type="number" step="0.01" name="CGPA" className="custom-input" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Upload Resume or CV</Form.Label>
                            <Form.Control type="file" accept=".pdf" className="custom-input" />
                        </Form.Group>

                        <Button type="submit" className="action-btn w-100">
                            Submit Application
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PlacementForm;