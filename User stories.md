COMPLETE USER STORIES
.
1.	Student Intern
A student intern is a student or recent graduate working at a company for a defined, short-term period to gain practical work experience, often for academic credit or to explore a career field.

ATTRIBUTES
•	Student name, gender  and date of birth.
•	Student registration number.
•	Student university name and year of study.
•	Student phone number and email address.
•	Academic document attachments.
•	Student course name.
•	Internship start and end date
•	Internship status(Submitted, Pending, Approved, Rejected)

VALIDATION RULES
•	Email address must be in a valid format.
•	Phone number must be in digits.
•	Required fields cannot be empty such as student name, registration number among others
•	Start date cannot be in the past and end date must be after start date.
•	Reports must be in portable document format(PDF).
•	Evaluation score must be between 0 and 100.

PERMISSIONS
•	As a student intern, I want to be able to register an account so that I can access the internship system.
•	As a student intern, I want to be able to  log in and log out of the system so that I can securely access my internship information.
•	As a student intern, I want to view and edit my  profile so that my information remains accurate.
•	As a student intern, I want to log my daily  working hours so that my supervisor can track my attendance.
•	As a student intern, I want to view own performance evaluation so that I can understand my progress and areas for improvement.
•	As a student intern, I want to download internship report so that I can submit or keep a copy for reference.
•	As a student intern, I want to view assigned tasks and mark progress so that my supervisor can track my work.
•	As a student intern, I want to view supervisor feedback so that I can improve my performance.
•	As a student intern, I want to upload reports so that my supervisors can review my work.

Student intern cannot;
•	Edit another intern’s profile 
•	Approve their own work hours
•	Modify system settings
•	Assign themselves tasks
•	Delete supervisors accounts

2.	Workplace Supervisor
An Academic Supervisor is a qualified staff member responsible for guiding, mentoring, and evaluating students during academic research, projects, or internships.

ATTRIBUTES
•	Assigned Interns 
•	Account Status 
•	Date Registered
•	Supervisor name, email address and phone number
•	Supervisor gender
•	Supervisor password and ID
•	Department and position/job title

VALIDATION RULES
•	Supervisor sees only interns assigned to them.
•	Supervisor can review daily logs.
•	Supervisor can approve or reject with comments.
PERMISSIONS
•	As a workplace supervisor, I want to view interns assigned to my organization so that I can supervise their activities.
•	As a workplace supervisor, I want to approve or reject intern logbooks so that attendance and daily activities are verified.
•	As a workplace supervisor, I want to evaluate intern performance so that academic supervisors can assess practical competency.
•	As a workplace supervisor, I want to provide feedback on intern tasks so that they can improve their work quality.

3.	Academic Supervisor
An Academic Supervisor is a qualified staff member responsible for guiding, mentoring, and evaluating students during academic research, projects, or internships.

ATTRIBUTES
•	Supervisor Name
•	 Department/Unit 
•	Job title/Designation 
•	Phone number(number) 
•	Work email address 
•	Professional Qualification 
•	Digital Signature

VALIDATION RULES
•	Supervisor can view submitted project topic.
•	Supervisor can approve or reject with comments.
•	Supervisor can only grade assigned students.
•	Recommendation can only be made after evaluation submission.
•	Recommendation status is recorded.

PERMISSIONS
•	As an academic supervisor, I want to recommend final internship approval so that students can qualify for academic credit.
•	As an academic supervisor, I want to upload written feedback so that students can understand their strengths and weaknesses.
•	As an academic supervisor, I want to enter internship marks so that final academic grades can be processed.
•	As an academic supervisor, I want to submit evaluation reports so that student performance can be officially recorded.
•	As an academic supervisor, I want to approve or reject proposed project topics so that students work on relevant and appropriate projects.
•	As an academic supervisor, I want to view science students assigned to me so that I can monitor their internship progress.

4.	Internship Administrator
An Internship Administrator manages, coordinates, and oversees the entire internship program within an institution.

ATTRIBUTES
•	Supervisor name, email address and phone number
•	Supervisor gender
•	Supervisor password and employee number
•	Department and position/job title
•	Role Level (e.g., Super Admin, Assistant Admin)
•	Account Status

VALIDATION RULES
•	Student details must be complete before registration.
•	Registration number must be unique.
•	 Student account is created after validation.
•	Each intern must have at least one supervisor assigned.
•	Administrator can view reports from both supervisors.
•	Reports cannot be edited by administrator.
•	Results are visible to authorized users only.

PERMISSIONS
•	As an internship administrator, I want to register students for internships so that they can be assigned to placement organizations.
•	As an internship administrator, I want to approve placement organizations so that only verified organizations host interns.
•	As an internship administrator, I want to assign academic and workplace supervisors so that interns are properly monitored.
•	As an internship administrator, I want to generate internship introduction letters so that students can present them to organizations.
•	As an internship administrator, I want to view student requests so that I can respond to issues or concerns.
•	As an internship administrator, I want to access and assess submitted evaluation reports so that final results can be compiled.
•	As an internship administrator, I want to compile final internship results so that overall performance records are generated.

