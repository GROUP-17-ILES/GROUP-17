import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Navbar, Nav, Form, Modal, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dash.css';

export default function AcademicDashboard() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : { username: 'Academic Supervisor' };

  const [students] = useState([
    {
      id: 1,
      name: 'Ssenyunja Jack',
      company: 'Uganda National Examinations Board',
      school: 'Makerere University',
      department: 'IT Department',
      email: 'jack.s@student.mak.ac.ug',
      phone: '+256 700 123 456',
      status: 'Ongoing',
      attendance: 95,
      overallScore: 85,
      supervisor: 'Dr. Nakato Grace',
      supervisorContact: 'grace.n@uneb.go.ug'
    },
    {
      id: 2,
      name: 'Kiden Sarah Ruth',
      company: 'Uganda Revenue Authority',
      school: 'Makerere University',
      department: 'Finance Department',
      email: 'sarah.k@student.mak.ac.ug',
      phone: '+256 700 234 567',
      status: 'Ongoing',
      attendance: 92,
      overallScore: 88,
      supervisor: 'Mr. Okello James',
      supervisorContact: 'james.o@ura.go.ug'
    },
    {
      id: 3,
      name: 'Nakayiwa Jessie',
      company: 'Bank Of Uganda',
      school: 'Makerere University',
      department: 'Research Department',
      email: 'jessie.n@student.mak.ac.ug',
      phone: '+256 700 345 678',
      status: 'Ongoing',
      attendance: 98,
      overallScore: 92,
      supervisor: 'Ms. Kasozi Patricia',
      supervisorContact: 'patricia.k@bou.go.ug'
    },
    {
      id: 4,
      name: 'Kwomu Joseph',
      company: 'Ministry of Works',
      school: 'Makerere University',
      department: 'Engineering Department',
      email: 'joseph.k@student.mak.ac.ug',
      phone: '+256 700 456 789',
      status: 'Ongoing',
      attendance: 89,
      overallScore: 78,
      supervisor: 'Eng. Musoke David',
      supervisorContact: 'david.m@works.go.ug'
    },
    {
      id: 5,
      name: 'Ahereza Albert',
      company: 'Uganda Communications Commission',
      school: 'Makerere University',
      department: 'Communications Department',
      email: 'albert.a@student.mak.ac.ug',
      phone: '+256 700 567 890',
      status: 'Ongoing',
      attendance: 94,
      overallScore: 86,
      supervisor: 'Dr. Kamya Sarah',
      supervisorContact: 'sarah.k@ucc.go.ug'
    }
  ]);

  const [reports, setReports] = useState([
    { id: 1, studentName: 'Ssenyunja Jack', week: 2, content: 'This week I worked on database optimization...', status: 'pending', submittedDate: '2026-04-10' },
    { id: 2, studentName: 'Kiden Sarah Ruth', week: 2, content: 'I learned about tax collection systems...', status: 'pending', submittedDate: '2026-04-11' },
    { id: 3, studentName: 'Nakayiwa Jessie', week: 2, content: 'Conducted research on monetary policy...', status: 'approved', submittedDate: '2026-04-09' },
    { id: 4, studentName: 'Kwomu Joseph', week: 2, content: 'Assisted in road infrastructure planning...', status: 'pending', submittedDate: '2026-04-12' },
    { id: 5, studentName: 'Ahereza Albert', week: 2, content: 'Worked on telecommunications regulations...', status: 'pending', submittedDate: '2026-04-10' }
  ]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [scores, setScores] = useState({
    technicalSkills: 0,
    communication: 0,
    professionalism: 0,
    initiative: 0,
    teamwork: 0
  });

  const handleReview = (report) => {
    setSelectedReport(report);
    setShowReviewModal(true);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleApprove = () => {
    if (selectedReport) {
      setReports(reports.map(r => 
        r.id === selectedReport.id ? { ...r, status: 'approved' } : r
      ));
      setShowReviewModal(false);
      setReviewText('');
    }
  };

  const handleReject = () => {
    if (selectedReport) {
      setReports(reports.map(r => 
        r.id === selectedReport.id ? { ...r, status: 'rejected' } : r
      ));
      setShowReviewModal(false);
      setReviewText('');
    }
  };

  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const approvedReports = reports.filter(r => r.status === 'approved').length;

  const calculateAverageScore = () => {
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return values.length > 0 ? (sum / values.length).toFixed(1) : 0;
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand>Internship Logging & Evaluation System (ILES)</Navbar.Brand>
          <Nav className="ms-auto">
            <button className="custom-button"><Nav.Link href="/">LOGOUT</Nav.Link></button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4 mb-5">
        <h3>Welcome, {user?.username} 👋</h3>
        <p className="text-muted">Academic Supervisor Dashboard</p>

        
        <Row className="my-4">
          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>👥 Students Assigned</Card.Title>
                <h2 className="mb-0">{students.length}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>✅ Reports Approved</Card.Title>
                <h2 className="mb-0 text-success">{approvedReports}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>⏳ Pending Reports</Card.Title>
                <h2 className="mb-0 text-warning">{pendingReports}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>📊 Avg Attendance</Card.Title>
                <h2 className="mb-0 text-info">
                  {(students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1)}%
                </h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title>Assigned Students Overview</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Company/Organization</th>
                  <th>School</th>
                  <th>Attendance</th>
                  <th>Overall Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.company}</td>
                    <td>{student.school}</td>
                    <td>
                      <Badge bg={student.attendance >= 90 ? 'success' : student.attendance >= 75 ? 'warning' : 'danger'}>
                        {student.attendance}%
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={student.overallScore >= 85 ? 'success' : student.overallScore >= 70 ? 'info' : 'warning'}>
                        {student.overallScore}/100
                      </Badge>
                    </td>
                    <td><Badge bg="primary">{student.status}</Badge></td>
                    <td>
                      <Button variant="outline-primary" size="sm" onClick={() => handleViewStudent(student)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Student Weekly Reports</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Week</th>
                  <th>Submitted Date</th>
                  <th>Report Summary</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.studentName}</td>
                    <td>Week {report.week}</td>
                    <td>{report.submittedDate}</td>
                    <td>{report.content.substring(0, 50)}...</td>
                    <td>
                      <Badge bg={
                        report.status === 'approved' ? 'success' : 
                        report.status === 'rejected' ? 'danger' : 
                        'warning'
                      }>
                        {report.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleReview(report)}
                        disabled={report.status !== 'pending'}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Report - {selectedReport?.studentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <strong>Week:</strong> {selectedReport?.week} | <strong>Submitted:</strong> {selectedReport?.submittedDate}
          </div>
          
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Report Content</Card.Title>
              <p>{selectedReport?.content}</p>
            </Card.Body>
          </Card>

          <Form.Group className="mb-3">
            <Form.Label><strong>Your Review/Feedback</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your feedback and comments for the student..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>

          <Card>
            <Card.Body>
              <Card.Title>Scoring Criteria</Card.Title>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Technical Skills (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={scores.technicalSkills}
                      onChange={(e) => setScores({...scores, technicalSkills: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Communication (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={scores.communication}
                      onChange={(e) => setScores({...scores, communication: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Professionalism (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={scores.professionalism}
                      onChange={(e) => setScores({...scores, professionalism: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Initiative (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={scores.initiative}
                      onChange={(e) => setScores({...scores, initiative: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Teamwork (0-20)</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="20"
                      value={scores.teamwork}
                      onChange={(e) => setScores({...scores, teamwork: parseInt(e.target.value) || 0})}
                    />
                  </Form.Group>
                  <div className="alert alert-info mt-3">
                    <strong>Average Score:</strong> {calculateAverageScore()}/20
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Reject Report
          </Button>
          <Button variant="success" onClick={handleApprove}>
            Approve Report
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Student Details - {selectedStudent?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <>
              <Row>
                <Col md={6}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Personal Information</Card.Title>
                      <p><strong>Name:</strong> {selectedStudent.name}</p>
                      <p><strong>School:</strong> {selectedStudent.school}</p>
                      <p><strong>Email:</strong> {selectedStudent.email}</p>
                      <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Internship Information</Card.Title>
                      <p><strong>Company:</strong> {selectedStudent.company}</p>
                      <p><strong>Department:</strong> {selectedStudent.department}</p>
                      <p><strong>Status:</strong> <Badge bg="primary">{selectedStudent.status}</Badge></p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Workplace Supervisor</Card.Title>
                      <p><strong>Name:</strong> {selectedStudent.supervisor}</p>
                      <p><strong>Contact:</strong> {selectedStudent.supervisorContact}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Performance Metrics</Card.Title>
                      <p><strong>Attendance Rate:</strong> <Badge bg="success">{selectedStudent.attendance}%</Badge></p>
                      <p><strong>Overall Score:</strong> <Badge bg="info">{selectedStudent.overallScore}/100</Badge></p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card>
                <Card.Body>
                  <Card.Title>Contact & Follow-up Notes</Card.Title>
                  <Form.Group>
                    <Form.Label>Add Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Add notes about meetings, discussions, or follow-ups with this student..."
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-2">Save Notes</Button>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStudentModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}