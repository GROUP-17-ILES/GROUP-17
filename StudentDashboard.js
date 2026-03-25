import { Container, Row, Col, Card, Button, Form, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [report, setReport] = useState("");

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Internship System</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        
        <h3 className="mb-4">Welcome, {user?.username} 👋 </h3>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title><th>Company</th></Card.Title>
                <Card.Text>ABC Tech Ltd</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title><th>Supervisor</th></Card.Title>
                <Card.Text>Mr. Markson</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title><th>Status</th></Card.Title>
                <Card.Text className="text-success">Ongoing</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Submit Weekly Report</Card.Title>

            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your weekly report..."
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />
              </Form.Group>

              <Button className="mt-3" variant="success">
                Submit Report
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>My Submitted Reports</Card.Title>

            <ul className="list-group mt-3">
              <li className="list-group-item d-flex justify-content-between">
                Week 1 <span className="text-success">Approved ✅</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Week 2 <span className="text-warning">Pending ⏳</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Week 3 <span className="text-danger">Rejected ❌</span>
              </li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default StudentDashboard;