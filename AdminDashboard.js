import { Container, Row, Col, Card, Table, Button, Navbar, Nav } from "react-bootstrap";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Panel</Navbar.Brand>
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
                <Card.Title>Total Students</Card.Title>
                <Card.Text>120</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Supervisors</Card.Title>
                <Card.Text>25</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Active Internships</Card.Title>
                <Card.Text>80</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Manage Users</Card.Title>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Ssenyunja Jack</td>
                  <td>Student</td>
                  <td>
                    <Button variant="danger" size="sm">Delete</Button>
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

export default AdminDashboard;