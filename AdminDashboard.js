import { Container, Row, Col, Card, Table, Button, Navbar, Nav } from "react-bootstrap";
import ActivityBarChart from './ActivityBarChart';
import './dashboards.css';

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const recentUsers = [
    { name: "Ssenyunja Jack", role: "student", Enrolled: "Mon, Mar 31" },
    { name: "John Kibirige", role: "supervisor", Enrolled: "Tue, May 30" },
    { name: "Okarun Paul", role: "admin", Enrolled: "Wed, May 31" },
    { name: "Andrew Johnson", role: "admin", Enrolled: "Fri, May 30" },
    { name: "Peter Wakholi", role: "admin", Enrolled: "Today" },
  ];
  
  const systemHealth = {
    serverstatus: "Online",
    pendingUpdates: 3,
    criticalAlert: 1,
   };
  
  const getRoleBadgeClass = (role) => {
    switch(role) {
      case 'student': return 'badge-student';
      case 'supervisor': return 'badge-supervisor';
      case 'admin': return 'badge-admin';
      default: return 'badge-student';
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand className="fw-bold"> Internship Logging & Evaluation System (ILES)</Navbar.Brand>  
        </Container>
      </Navbar>
    
    <Container className="mt-4">
        <h3>Welcome back, {user?.username ||  'Admin'}! 👋</h3>

         <Col className="my-4">
          <Row md={4}>
            <Card className="stats-card">
              <Card.Body>
                <div className="stats-icon">👥</div>
                <Card.Title>Total Students</Card.Title>
                <Card.Text className="stats-number">120</Card.Text>
              </Card.Body>
            </Card>
          </Row>

          <Row md={4}>
            <Card className="stats-card">
              <Card.Body>
                <div className="stats-icon">📝</div>
                <Card.Title>Weekly Logs</Card.Title>
                <Card.Text className="stats-number">25</Card.Text>
              </Card.Body>
            </Card>
          </Row>

          <Row md={4}>
            <Card className="stats-card">
              <Card.Body>
                <div className="stats-icon">⚠️</div>
                <Card.Title>Issues</Card.Title>
                <Card.Text >5</Card.Text>
                <small className="stats-trend">↓ 3 unresolved</small>
              </Card.Body>
            </Card>
          </Row>

          <Row md={3}>
            <Card className="stats-card">
              <Card.Body>
                <div className="stats-icon">💼</div>
                <Card.Title>Active Internships</Card.Title>
                <Card.Text className="stats-number">80</Card.Text>
                <small className="stats-trend">↑ 5 new this week</small>
              </Card.Body>
            </Card>
          </Row>
        </Col>

        <Row>
          {/* User Management Section */}
          <Col lg={6} className="mb-4">
            <Card className="main-card h-100">
              <Card.Header>
                👥 User Management
                <p><small className="text-muted ms-2">Users, Roles, and Permissions</small></p>
              </Card.Header>
              <Card.Body>
                <h6 className="mb-3">Manage Users</h6>
                <Button className="action-btn w-100 mb-3">
                  + Add New User
                </Button>
                <div className="mt-3">
                  <h6 className="mb-3">Recent Users</h6>
                  <Table responsive className="custom-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Enrolled</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, idx) => (
                        <tr key={idx}>
                          <td>{user.name}</td>
                          <td>
                            <span className={`badge-custom ${getRoleBadgeClass(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{user.Enrolled}</td>
                          <td>
                            <Button variant="danger" size="sm" className="delete-btn">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Reports Section */}
          <Col lg={6} className="mb-4">
            <Card className="main-card h-100">
              <Card.Header>
                📊 Reports
                <p><small className="text-muted ms-2">Generate logs and activity reports</small></p>
              </Card.Header>
              <Card.Body>
                <Button className="action-btn action-btn-success w-100 mb-3">
                  📄 View Reports
                </Button>
                
                <div className="mt-4">
                  <h6 className="mb-3">Activity Overview</h6>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Logs</span>
                      <span className="fw-bold">45%</span>
                    </div>
                    <div className="progress-custom">
                      <div className="progress-bar-custom" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Feedback</span>
                      <span className="fw-bold">30%</span>
                    </div>
                    <div className="progress-custom">
                      <div className="progress-bar-custom" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* System Overview Section */}
          <Col lg={6} className="mb-4">
            <Card className="main-card">
              <Card.Header>
                🖥️ System Overview
                <p><small className="text-muted ms-2">Monitor system health and status</small></p>
              </Card.Header>
              <Card.Body>
                <Button className="action-btn action-btn-secondary w-100 mb-4">
                  ⚙️ System Status
                </Button>
                
                <div className="system-health">
                  <div className="health-indicator">
                    <span className="health-label">Server Status:</span>
                    <span className="health-value status-online">✅ {systemHealth.serverStatus}</span>
                  </div>
                  <div className="health-indicator">
                    <span className="health-label">Pending Updates:</span>
                    <span className="health-value">{systemHealth.pendingUpdates} Available</span>
                  </div>
                  <div className="health-indicator">
                    <span className="health-label">Alerts:</span>
                    <span className="health-value status-warning">⚠️ {systemHealth.criticalAlert} Critical Alert</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* System Logs Section */}
          <Col lg={6} className="mb-4">
            <Card className="main-card">
              <Card.Header>
                📋 System Logs
                <p><small className="text-muted ms-2"></small></p>
              </Card.Header>
              <Card.Body>
                <div className="chart-placeholder"><ActivityBarChart />
                  📊 Activity Bar Chart (Last 7 Days)
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
      </Container>

      <button className="logout-button">
      <Nav className="ms-auto">
            <Nav.Link href="/">LOGOUT</Nav.Link>
      </Nav>
      </button>


    </>
  );
}

export default AdminDashboard;
