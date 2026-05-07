import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Navbar, Nav, Form, Modal, Badge, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/dash.css';

export default function WorkplaceDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{"username": "Workplace Supervisor"}');
  
  const [interns] = useState([
    {
      id: 1,
      name: 'Kyajja Peter',
      school: 'Makerere University',
      department: 'IT Department',
      email: 'peter.k@student.mak.ac.ug',
      phone: '+256 700 111 222',
      startDate: '2026-03-01',
      endDate: '2026-06-30',
      status: 'Active',
      attendance: 96,
      tasksCompleted: 12,
      totalTasks: 15,
      academicSupervisor: 'Dr. Nakato Grace',
      academicSupervisorEmail: 'grace.n@mak.ac.ug',
      academicSupervisorPhone: '+256 700 999 888'
    },
    {
      id: 2,
      name: 'Namuli Betty',
      school: 'Kyambogo University',
      department: 'HR Department',
      email: 'betty.n@student.kyu.ac.ug',
      phone: '+256 700 222 333',
      startDate: '2026-03-01',
      endDate: '2026-06-30',
      status: 'Active',
      attendance: 92,
      tasksCompleted: 10,
      totalTasks: 12,
      academicSupervisor: 'Mr. Okello James',
      academicSupervisorEmail: 'james.o@kyu.ac.ug',
      academicSupervisorPhone: '+256 700 888 777'
    },
    {
      id: 3,
      name: 'Mugisha Ronald',
      school: 'Makerere University',
      department: 'Finance Department',
      email: 'ronald.m@student.mak.ac.ug',
      phone: '+256 700 333 444',
      startDate: '2026-03-01',
      endDate: '2026-06-30',
      status: 'Active',
      attendance: 88,
      tasksCompleted: 8,
      totalTasks: 12,
      academicSupervisor: 'Ms. Kasozi Patricia',
      academicSupervisorEmail: 'patricia.k@mak.ac.ug',
      academicSupervisorPhone: '+256 700 777 666'
    }
  ]);

  const [attendanceRecords] = useState([
    { id: 1, internName: 'Kyajja Peter', date: '2026-04-15', status: 'Present', timeIn: '08:00', timeOut: '17:00' },
    { id: 2, internName: 'Namuli Betty', date: '2026-04-15', status: 'Present', timeIn: '08:15', timeOut: '17:00' },
    { id: 3, internName: 'Mugisha Ronald', date: '2026-04-15', status: 'Late', timeIn: '09:30', timeOut: '17:00' },
    { id: 4, internName: 'Kyajja Peter', date: '2026-04-14', status: 'Present', timeIn: '08:00', timeOut: '17:00' },
    { id: 5, internName: 'Namuli Betty', date: '2026-04-14', status: 'Present', timeIn: '08:00', timeOut: '17:00' },
  ]);

  const [evaluations, setEvaluations] = useState([
    {
      internId: 1,
      internName: 'Kyajja Peter',
      evaluationDate: '2026-04-01',
      technicalSkills: 18,
      workQuality: 17,
      punctuality: 19,
      teamwork: 18,
      communication: 17,
      overallScore: 89,
      comments: 'Excellent performance, shows great initiative'
    }
  ]);

  const [showInternModal, setShowInternModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  
  const [newEvaluation, setNewEvaluation] = useState({
    technicalSkills: 0,
    workQuality: 0,
    punctuality: 0,
    teamwork: 0,
    communication: 0,
    comments: ''
  });

  const [newAttendance, setNewAttendance] = useState({
    internName: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
    timeIn: '08:00',
    timeOut: '17:00'
  });

  const handleViewIntern = (intern) => {
    setSelectedIntern(intern);
    setShowInternModal(true);
  };

  const handleEvaluateIntern = (intern) => {
    setSelectedIntern(intern);
    setShowEvaluationModal(true);
  };

  const handleSubmitEvaluation = () => {
    if (selectedIntern) {
      const overallScore = Math.round(
        (newEvaluation.technicalSkills + 
         newEvaluation.workQuality + 
         newEvaluation.punctuality + 
         newEvaluation.teamwork + 
         newEvaluation.communication) / 5 * 5
      );

      const evaluation = {
        internId: selectedIntern.id,
        internName: selectedIntern.name,
        evaluationDate: new Date().toISOString().split('T')[0],
        ...newEvaluation,
        overallScore
      };

      setEvaluations([...evaluations, evaluation]);
      setShowEvaluationModal(false);
      setNewEvaluation({
        technicalSkills: 0,
        workQuality: 0,
        punctuality: 0,
        teamwork: 0,
        communication: 0,
        comments: ''
      });
    }
  };

  const calculateOverallAttendance = () => {
    const totalAttendance = interns.reduce((sum, intern) => sum + intern.attendance, 0);
    return (totalAttendance / interns.length).toFixed(1);
  };

  const getTaskCompletionPercentage = (intern) => {
    return Math.round((intern.tasksCompleted / intern.totalTasks) * 100);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Internship Logging & Evaluation System (ILES)</Navbar.Brand>
          <Nav className="ms-auto">
            <button className="custom-button"><Nav.Link href="/">LOGOUT</Nav.Link></button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4 mb-5">
        <h3>Welcome, {user?.username} 👋</h3>
        <p className="text-muted">Workplace Supervisor Dashboard</p>

        
        <Row className="my-4">
          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>👥 Interns Assigned</Card.Title>
                <h2 className="mb-0">{interns.length}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>📊 Attendance Rate</Card.Title>
                <h2 className="mb-0 text-success">{calculateOverallAttendance()}%</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>✅ Active Interns</Card.Title>
                <h2 className="mb-0 text-info">{interns.filter(i => i.status === 'Active').length}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>📝 Evaluations</Card.Title>
                <h2 className="mb-0 text-primary">{evaluations.length}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className="mb-0">Interns Overview</Card.Title>
              <Button variant="primary" onClick={() => setShowAttendanceModal(true)}>
                Mark Attendance
              </Button>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>School</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Attendance</th>
                  <th>Tasks Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => (
                  <tr key={intern.id}>
                    <td>{intern.name}</td>
                    <td>{intern.school}</td>
                    <td>{intern.department}</td>
                    <td>
                      <small>{intern.email}</small><br />
                      <small>{intern.phone}</small>
                    </td>
                    <td>
                      <Badge bg={intern.attendance >= 90 ? 'success' : intern.attendance >= 75 ? 'warning' : 'danger'}>
                        {intern.attendance}%
                      </Badge>
                    </td>
                    <td>
                      <ProgressBar 
                        now={getTaskCompletionPercentage(intern)} 
                        label={`${intern.tasksCompleted}/${intern.totalTasks}`}
                        variant={getTaskCompletionPercentage(intern) >= 80 ? 'success' : 'info'}
                      />
                    </td>
                    <td>
                      <Badge bg={intern.status === 'Active' ? 'success' : 'secondary'}>
                        {intern.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleViewIntern(intern)}>
                        View
                      </Button>
                      <Button variant="outline-success" size="sm" onClick={() => handleEvaluateIntern(intern)}>
                        Evaluate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title>Recent Attendance Records</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.internName}</td>
                    <td>{record.date}</td>
                    <td>
                      <Badge bg={
                        record.status === 'Present' ? 'success' : 
                        record.status === 'Late' ? 'warning' : 
                        record.status === 'On Leave' ? 'info' : 
                        'danger'
                      }>
                        {record.status}
                      </Badge>
                    </td>
                    <td>{record.timeIn}</td>
                    <td>{record.timeOut}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Performance Evaluations</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Date</th>
                  <th>Technical Skills</th>
                  <th>Work Quality</th>
                  <th>Punctuality</th>
                  <th>Teamwork</th>
                  <th>Communication</th>
                  <th>Overall Score</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((evaluation, index) => (
                  <tr key={index}>
                    <td>{evaluation.internName}</td>
                    <td>{evaluation.evaluationDate}</td>
                    <td>{evaluation.technicalSkills}/20</td>
                    <td>{evaluation.workQuality}/20</td>
                    <td>{evaluation.punctuality}/20</td>
                    <td>{evaluation.teamwork}/20</td>
                    <td>{evaluation.communication}/20</td>
                    <td>
                      <Badge bg={evaluation.overallScore >= 85 ? 'success' : evaluation.overallScore >= 70 ? 'info' : 'warning'}>
                        {evaluation.overallScore}/100
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      
      <Modal show={showInternModal} onHide={() => setShowInternModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Intern Details - {selectedIntern?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIntern && (
            <>
              <Row>
                <Col md={6}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Personal Information</Card.Title>
                      <p><strong>Name:</strong> {selectedIntern.name}</p>
                      <p><strong>School:</strong> {selectedIntern.school}</p>
                      <p><strong>Email:</strong> {selectedIntern.email}</p>
                      <p><strong>Phone:</strong> {selectedIntern.phone}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Internship Details</Card.Title>
                      <p><strong>Department:</strong> {selectedIntern.department}</p>
                      <p><strong>Start Date:</strong> {selectedIntern.startDate}</p>
                      <p><strong>End Date:</strong> {selectedIntern.endDate}</p>
                      <p><strong>Status:</strong> <Badge bg="success">{selectedIntern.status}</Badge></p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Academic Supervisor Contact</Card.Title>
                  <p><strong>Name:</strong> {selectedIntern.academicSupervisor}</p>
                  <p><strong>Email:</strong> {selectedIntern.academicSupervisorEmail}</p>
                  <p><strong>Phone:</strong> {selectedIntern.academicSupervisorPhone}</p>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Performance Metrics</Card.Title>
                  <p><strong>Attendance Rate:</strong> <Badge bg="success">{selectedIntern.attendance}%</Badge></p>
                  <p><strong>Tasks Completed:</strong> {selectedIntern.tasksCompleted} / {selectedIntern.totalTasks}</p>
                  <ProgressBar 
                    now={getTaskCompletionPercentage(selectedIntern)} 
                    label={`${getTaskCompletionPercentage(selectedIntern)}%`}
                    variant="success"
                  />
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Notes & Reviews</Card.Title>
                  <Form.Group>
                    <Form.Label>Add supervisor notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Add notes about the intern's performance, behavior, or any concerns..."
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-2">Save Notes</Button>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInternModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={showEvaluationModal} onHide={() => setShowEvaluationModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Evaluate Intern - {selectedIntern?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Scoring Criteria (Each category: 0-20 points)</Card.Title>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Technical Skills (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={newEvaluation.technicalSkills}
                      onChange={(e) => setNewEvaluation({...newEvaluation, technicalSkills: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Work Quality (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={newEvaluation.workQuality}
                      onChange={(e) => setNewEvaluation({...newEvaluation, workQuality: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Punctuality (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={newEvaluation.punctuality}
                      onChange={(e) => setNewEvaluation({...newEvaluation, punctuality: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teamwork (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={newEvaluation.teamwork}
                      onChange={(e) => setNewEvaluation({...newEvaluation, teamwork: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Communication (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={newEvaluation.communication}
                      onChange={(e) => setNewEvaluation({...newEvaluation, communication: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <div className="alert alert-info">
                    <strong>Projected Overall Score:</strong> {Math.round((newEvaluation.technicalSkills + newEvaluation.workQuality + newEvaluation.punctuality + newEvaluation.teamwork + newEvaluation.communication) / 5 * 5)}/100
                  </div>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Comments & Recommendations</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Provide detailed feedback and recommendations for the intern..."
                  value={newEvaluation.comments}
                  onChange={(e) => setNewEvaluation({...newEvaluation, comments: e.target.value})}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEvaluationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitEvaluation}>
            Submit Evaluation
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={showAttendanceModal} onHide={() => setShowAttendanceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mark Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Intern</Form.Label>
              <Form.Select
                value={newAttendance.internName}
                onChange={(e) => setNewAttendance({...newAttendance, internName: e.target.value})}
              >
                <option value="">Choose...</option>
                {interns.map(intern => (
                  <option key={intern.id} value={intern.name}>{intern.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newAttendance.date}
                onChange={(e) => setNewAttendance({...newAttendance, date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newAttendance.status}
                onChange={(e) => setNewAttendance({...newAttendance, status: e.target.value})}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="On Leave">On Leave</option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Time In</Form.Label>
                  <Form.Control
                    type="time"
                    value={newAttendance.timeIn}
                    onChange={(e) => setNewAttendance({...newAttendance, timeIn: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Time Out</Form.Label>
                  <Form.Control
                    type="time"
                    value={newAttendance.timeOut}
                    onChange={(e) => setNewAttendance({...newAttendance, timeOut: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAttendanceModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowAttendanceModal(false)}>
            Save Attendance
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 
