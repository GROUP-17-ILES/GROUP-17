import { Container, Row, Col, Card, Table, Button, Navbar, Nav } from "react-bootstrap";

function AcademicSupervisorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Internship System</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h3>Welcome, {user?.username} 👋</h3>

        <Row className="my-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Students Assigned</Card.Title>
                <Card.Text>12</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Reports Reviewed</Card.Title>
                <Card.Text>30</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Pending Reports</Card.Title>
                <Card.Text className="text-warning">5</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Student Reports</Card.Title>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Week</th>
                  <th>Report</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ssenyunja Jack</td>
                  <td>Week 2</td>
                  <td>Report content...</td>
                  <td>
                    <Button variant="success" size="sm" className="me-2">Approve</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AcademicSupervisorDashboard;