import { Container, Row, Col, Card, Table, Navbar, Nav } from "react-bootstrap";

function WorkplaceSupervisorDashboard() {
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
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Interns Assigned</Card.Title>
                <Card.Text>6</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Attendance Rate</Card.Title>
                <Card.Text className="text-success">92%</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Interns</Card.Title>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kyajja Peter</td>
                  <td>IT</td>
                  <td className="text-success">Active</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default WorkplaceSupervisorDashboard;