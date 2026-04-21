import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Navbar, Nav, Form, Modal, Badge, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dash.css';

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{"username": "Student"}');
  
  const [studentInfo] = useState({
    name: 'Ssenyunja Jack',
    studentId: '25/U/03585/EVE',
    school: 'Makerere University',
    course: 'Bachelor of Science in Computer Science',
    company: 'Uganda National Examinations Board',
    department: 'IT Department',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    academicSupervisor: 'Dr. Nakato Grace',
    workplaceSupervisor: 'Mr. Musoke David',
    supervisorEmail: 'david.m@uneb.go.ug',
    supervisorPhone: '+256 700 123 456'
  });

  const [reports, setReports] = useState([
    { id: 1, week: 1, content: 'Week 1: Orientation and introduction to the company systems...', status: 'approved', submittedDate: '2026-03-08', feedback: 'Good start! Keep it up.' },
    { id: 2, week: 2, content: 'Week 2: Started working on database optimization project...', status: 'submitted', submittedDate: '2026-04-10' },
    { id: 3, week: 3, content: '', status: 'draft' }
  ]);

  const [tasks] = useState([
    { id: 1, title: 'Database Optimization', description: 'Optimize existing database queries', deadline: '2026-04-20', status: 'in-progress', priority: 'high' },
    { id: 2, title: 'User Interface Update', description: 'Update the admin dashboard UI', deadline: '2026-04-25', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Documentation', description: 'Write technical documentation for new features', deadline: '2026-04-30', status: 'pending', priority: 'low' },
    { id: 4, title: 'Code Review', description: 'Review pull requests from team members', deadline: '2026-04-18', status: 'completed', priority: 'medium' }
  ]);

  const [attendance] = useState({
    totalDays: 45,
    present: 43,
    absent: 1,
    late: 1,
    percentage: 95.6
  });

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');

  const handleEditReport = (report) => {
    setSelectedReport(report);
    setReportContent(report.content);
    setShowReportModal(true);
  };

  const handleSubmitReport = () => {
    if (selectedReport) {
      setReports(reports.map(r => 
        r.id === selectedReport.id 
          ? { ...r, content: reportContent, status: 'submitted', submittedDate: new Date().toISOString().split('T')[0] }
          : r
      ));
      setShowReportModal(false);
      setReportContent('');
    }
  };

  const handleSaveDraft = () => {
    if (selectedReport) {
      setReports(reports.map(r => 
        r.id === selectedReport.id 
          ? { ...r, content: reportContent }
          : r
      ));
      setShowReportModal(false);
      setReportContent('');
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingReports = reports.filter(r => r.status === 'draft' || r.status === 'submitted').length;

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
        <h3>Welcome, {studentInfo.name} 👋</h3>
        <p className="text-muted">Student Intern Dashboard</p>

        
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5>Personal Information</h5>
                <p><strong>Student ID:</strong> {studentInfo.studentId}</p>
                <p><strong>School:</strong> {studentInfo.school}</p>
                <p><strong>Course:</strong> {studentInfo.course}</p>
              </Col>
              <Col md={6}>
                <h5>Internship Details</h5>
                <p><strong>Company:</strong> {studentInfo.company}</p>
                <p><strong>Department:</strong> {studentInfo.department}</p>
                <p><strong>Duration:</strong> {studentInfo.startDate} to {studentInfo.endDate}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <h6>Academic Supervisor</h6>
                <p>{studentInfo.academicSupervisor}</p>
              </Col>
              <Col md={6}>
                <h6>Workplace Supervisor</h6>
                <p>{studentInfo.workplaceSupervisor}</p>
                <p><small>{studentInfo.supervisorEmail}</small></p>
                <p><small>{studentInfo.supervisorPhone}</small></p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        
        <Row className="my-4">
          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>📊 Attendance</Card.Title>
                <h2 className="mb-0 text-success">{attendance.percentage}%</h2>
                <small>{attendance.present}/{attendance.totalDays} days</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>✅ Tasks Completed</Card.Title>
                <h2 className="mb-0 text-info">{completedTasks}/{tasks.length}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>📝 Reports Submitted</Card.Title>
                <h2 className="mb-0 text-primary">{reports.filter(r => r.status !== 'draft').length}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm dashboard-card">
              <Card.Body>
                <Card.Title>⏳ Pending Actions</Card.Title>
                <h2 className="mb-0 text-warning">{pendingReports}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title>Assigned Tasks</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.deadline}</td>
                    <td>
                      <Badge bg={
                        task.priority === 'high' ? 'danger' : 
                        task.priority === 'medium' ? 'warning' : 
                        'info'
                      }>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={
                        task.status === 'completed' ? 'success' : 
                        task.status === 'in-progress' ? 'primary' : 
                        'secondary'
                      }>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title>Weekly Reports</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Feedback</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>Week {report.week}</td>
                    <td>{report.submittedDate || '-'}</td>
                    <td>
                      <Badge bg={
                        report.status === 'approved' ? 'success' : 
                        report.status === 'submitted' ? 'info' : 
                        report.status === 'rejected' ? 'danger' : 
                        'secondary'
                      }>
                        {report.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td>{report.feedback || '-'}</td>
                    <td>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleEditReport(report)}
                        disabled={report.status === 'approved'}
                      >
                        {report.status === 'draft' ? 'Write Report' : 'View/Edit'}
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
            <Card.Title>Attendance Summary</Card.Title>
            <Row className="mt-3">
              <Col md={3}>
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="text-success">{attendance.present}</h4>
                  <p className="mb-0">Present</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="text-danger">{attendance.absent}</h4>
                  <p className="mb-0">Absent</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="text-warning">{attendance.late}</h4>
                  <p className="mb-0">Late</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="text-info">{attendance.totalDays}</h4>
                  <p className="mb-0">Total Days</p>
                </div>
              </Col>
            </Row>
            <div className="mt-3">
              <p><strong>Overall Attendance:</strong></p>
              <ProgressBar now={attendance.percentage} label={`${attendance.percentage}%`} variant="success" />
            </div>
          </Card.Body>
        </Card>
      </Container>

      
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedReport?.status === 'draft' ? 'Write' : 'Edit'} Weekly Report - Week {selectedReport?.week}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport?.status === 'approved' && (
            <div className="alert alert-info mb-3">
              This report has been approved and cannot be edited.
            </div>
          )}
          {selectedReport?.feedback && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Supervisor Feedback</Card.Title>
                <p>{selectedReport.feedback}</p>
              </Card.Body>
            </Card>
          )}
          <Form.Group>
            <Form.Label><strong>Report Content</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="Describe your activities, learnings, and accomplishments for this week..."
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              disabled={selectedReport?.status === 'approved'}
            />
            <Form.Text className="text-muted">
              Please provide a detailed account of your work during this week.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>
            Close
          </Button>
          {selectedReport?.status !== 'approved' && (
            <>
              <Button variant="outline-primary" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button variant="primary" onClick={handleSubmitReport}>
                Submit Report
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}