-- Internship Program Plans - Database Migration
-- Add these tables to the internship_system database

USE internship_system;

-- Plans Table
CREATE TABLE IF NOT EXISTS plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  department_id INT NOT NULL,
  duration_weeks INT NOT NULL,
  mentor_id INT,
  status ENUM('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED') DEFAULT 'ACTIVE',
  learning_objectives TEXT,
  skills_to_develop TEXT,
  tools_technologies TEXT,
  expected_outcomes TEXT,
  assessment_criteria TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (mentor_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_department (department_id),
  INDEX idx_status (status),
  INDEX idx_mentor (mentor_id)
);

-- Plan Milestones Table (weekly/phase breakdown)
CREATE TABLE IF NOT EXISTS plan_milestones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  week_number INT NOT NULL,
  phase_name VARCHAR(100),
  description TEXT,
  objectives TEXT,
  tasks TEXT,
  deliverables TEXT,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE,
  INDEX idx_plan (plan_id),
  INDEX idx_week (week_number)
);

-- Plan Assignments Table (assign interns to plans)
CREATE TABLE IF NOT EXISTS plan_assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  intern_id INT NOT NULL,
  application_id INT,
  start_date DATE NOT NULL,
  end_date DATE,
  progress_percentage INT DEFAULT 0,
  status ENUM('ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'DROPPED') DEFAULT 'ASSIGNED',
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (plan_id) REFERENCES plans(id),
  FOREIGN KEY (intern_id) REFERENCES users(id),
  FOREIGN KEY (application_id) REFERENCES applications(id),
  INDEX idx_plan (plan_id),
  INDEX idx_intern (intern_id),
  INDEX idx_status (status),
  UNIQUE KEY unique_plan_intern (plan_id, intern_id)
);

-- Milestone Progress Table (track intern progress on milestones)
CREATE TABLE IF NOT EXISTS milestone_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  assignment_id INT NOT NULL,
  milestone_id INT NOT NULL,
  status ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE') DEFAULT 'NOT_STARTED',
  completion_date TIMESTAMP NULL,
  notes TEXT,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assignment_id) REFERENCES plan_assignments(id),
  FOREIGN KEY (milestone_id) REFERENCES plan_milestones(id),
  INDEX idx_assignment (assignment_id),
  INDEX idx_milestone (milestone_id)
);

-- Insert Sample Plans
INSERT INTO plans (title, description, department_id, duration_weeks, mentor_id, status, learning_objectives, skills_to_develop, tools_technologies, expected_outcomes, assessment_criteria, created_by) VALUES
(
  'Full-Stack Web Development',
  'Comprehensive program for learning modern web development with React and Node.js',
  1,
  12,
  3,
  'ACTIVE',
  'Learn React, Node.js, and MongoDB; Build real-world applications; Understand deployment',
  'JavaScript, React, Node.js, MongoDB, Git, REST APIs, Problem-solving',
  'React, Node.js, MongoDB, Docker, GitHub, VS Code',
  'Completed 3 projects; Deployed to production; Working knowledge of full-stack development',
  'Project completion; Code quality; Attendance; Final evaluation',
  1
),
(
  'Digital Marketing Strategy',
  'Learn to plan, execute, and analyze digital marketing campaigns',
  2,
  10,
  4,
  'ACTIVE',
  'Master marketing fundamentals; Run campaigns; Analyze metrics',
  'Marketing strategy, SEO, Social media, Analytics, Content creation',
  'Google Analytics, Mailchimp, Canva, Buffer, Meta Business Suite',
  'Execute 2 campaigns; Increase engagement by 25%; Create marketing plan',
  'Campaign performance; Engagement metrics; Presentation skills',
  1
),
(
  'HR Operations & Recruitment',
  'Support HR operations and learn recruitment best practices',
  3,
  8,
  5,
  'ACTIVE',
  'Understand HR processes; Learn recruitment; Support team operations',
  'Recruitment, HR systems, Communication, Problem-solving, Data management',
  'ATS software, HRIS, Excel, Slack, Zoom',
  'Successfully recruited 5 candidates; Streamlined processes; Support 2 events',
  'Candidate feedback; Process improvements; Communication',
  1
),
(
  'Administrative Excellence',
  'Master administrative operations and office management',
  4,
  6,
  6,
  'ACTIVE',
  'Learn office management; Improve procedures; Develop admin skills',
  'Organization, Communication, Technology, Problem-solving, File management',
  'Office 365, Google Workspace, Asana, Slack, MS Teams',
  'Organized 3 company events; Reduced admin time by 20%; Trained team',
  'Event feedback; Process metrics; Team feedback',
  1
);

-- Insert Sample Milestones for Plan 1 (Full-Stack Web Development)
INSERT INTO plan_milestones (plan_id, week_number, phase_name, description, objectives, tasks, deliverables, due_date) VALUES
(
  1,
  1,
  'Onboarding & Setup',
  'Get familiar with tools and team',
  'Setup development environment, meet team, understand project structure',
  'Install Node.js, Git, VS Code; Clone repo; Read documentation; Intro meeting',
  'Dev environment ready; Repo access; Team intro complete',
  DATE_ADD(NOW(), INTERVAL 7 DAY)
),
(
  1,
  2,
  'React Basics',
  'Learn React fundamentals',
  'Master components, state, props, and hooks',
  'Complete React tutorial; Build 2 simple components; Write tests',
  '2 component repos; Tutorial completion certificate',
  DATE_ADD(NOW(), INTERVAL 14 DAY)
),
(
  1,
  3,
  'Node.js & APIs',
  'Build backend APIs',
  'Create REST APIs with Node.js and Express',
  'Build user auth API; Implement CRUD operations; API documentation',
  'Working API; Documentation; Postman tests',
  DATE_ADD(NOW(), INTERVAL 21 DAY)
),
(
  1,
  4,
  'Database Design',
  'Learn MongoDB and database modeling',
  'Design efficient databases and write queries',
  'Model 3 databases; Write complex queries; Optimize indexes',
  'Database schemas; Query documentation',
  DATE_ADD(NOW(), INTERVAL 28 DAY)
),
(
  1,
  5,
  'Integration Project',
  'Build integrated app',
  'Combine React frontend with Node backend',
  'Build full-stack todo app; Implement features; Write tests',
  'Working application; GitHub repo; Test suite',
  DATE_ADD(NOW(), INTERVAL 35 DAY)
),
(
  1,
  6,
  'Deployment',
  'Deploy to production',
  'Learn deployment and DevOps basics',
  'Deploy to Heroku/AWS; Setup CI/CD; Monitor app',
  'Live application; Deployment guide; Monitoring setup',
  DATE_ADD(NOW(), INTERVAL 42 DAY)
);

-- Insert Sample Milestones for Plan 2 (Digital Marketing)
INSERT INTO plan_milestones (plan_id, week_number, phase_name, description, objectives, tasks, deliverables, due_date) VALUES
(
  2,
  1,
  'Marketing Fundamentals',
  'Learn digital marketing basics',
  'Understand marketing funnel, channels, and metrics',
  'Read marketing guides; Set up Google Analytics; Analyze competitor',
  'Market analysis report; Analytics setup',
  DATE_ADD(NOW(), INTERVAL 7 DAY)
),
(
  2,
  2,
  'Content Strategy',
  'Develop content strategy',
  'Create content calendar and strategy',
  'Plan 30 posts; Create content calendar; Write 5 posts',
  'Content calendar; 5 published posts; Engagement report',
  DATE_ADD(NOW(), INTERVAL 14 DAY)
),
(
  2,
  3,
  'Campaign Planning',
  'Plan first campaign',
  'Design and plan marketing campaign',
  'Choose target audience; Create campaign brief; Design graphics',
  'Campaign brief; 10 designs; Budget plan',
  DATE_ADD(NOW(), INTERVAL 21 DAY)
),
(
  2,
  4,
  'Campaign Launch',
  'Execute campaign',
  'Launch and monitor campaign',
  'Set up ads; Monitor metrics; Create reports',
  'Running campaign; Weekly reports; Analytics dashboard',
  DATE_ADD(NOW(), INTERVAL 28 DAY)
);
