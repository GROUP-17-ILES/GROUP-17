import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import '../styles/dash.css';

function DailyLog() {
    const [log, setLog] = useState({ date: "", hours: "", tasks: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "hours" && (value > 24 || value < 0)) return alert(value > 24 ? "Hours worked cannot exceed 24 in a day." : "Hours worked cannot be negative.");
        setLog(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Daily Log Submitted:", log);
        alert("Daily log submitted successfully! ✅");
    };

    return (
        <Container className="mt-4">
            <h3 className="login-heading text-start">Daily Logbook 📝</h3>
            <Card className="main-card mt-4">
                <Card.Header>
                    🖋️ New Entry
                    <p><small className="text-muted ms-2">Maximum work hours per day is 24</small></p>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="date" name="date" className="form-control" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-bold">Hours Worked</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" name="hours" value={log.hours} className="custom-input" placeholder="e.g. 8" onChange={handleChange} required />
                                <Form.Text className="text-muted">Max: 24 hours</Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4 align-items-start">
                            <Form.Label column sm={3} className="fw-bold">Tasks Completed</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" name="tasks" rows={5} className="form-control" placeholder="What did you do today?" onChange={handleChange} required />
                            </Col>
                        </Form.Group>

                        <Button type="submit" className="action-btn text-white w-100 py-2">
                            Submit Today's Log
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DailyLog;