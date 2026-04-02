# User Accounts & Roles System

## Role Hierarchy & Permissions

### 1. SUPERADMIN
**Purpose**: Full system control and administration

**Permissions**:
- View all users across all departments
- Create/edit/delete admin and supervisor accounts
- View complete system analytics
- Access system logs and database backups
- Manage system settings
- View all applications and evaluations
- Override any decisions
- Generate system reports

**Dashboard Access**:
- `/dashboard/superadmin` - Full system overview

**Typical Actions**:
- Create new departments
- Assign supervisors to departments
- View department performance
- Manage system security
- Monitor API and database health

---

### 2. ADMIN
**Purpose**: Manage internship program operations

**Permissions**:
- Create and manage internship positions
- Review and approve/reject applications
- Assign interns to internships
- View all department reports
- Manage intern progress
- Create internship plans and assignments
- View analytics by department
- Generate program reports

**Dashboard Access**:
- `/dashboard/admin` - Program management

**Typical Actions**:
- Post new internship opportunities
- Review intern applications
- Approve/reject candidates
- Track overall program progress
- Manage position vacancies

---

### 3. SUPERVISOR
**Purpose**: Manage interns within specific department

**Permissions**:
- View only own department's interns
- Create evaluations for assigned interns
- Approve intern reports
- Provide feedback and comments
- Track progress of own interns
- Create assessments
- View own department analytics
- Submit supervisor reports

**Dashboard Access**:
- `/dashboard/supervisor` - Team management

**Department Options**:
- IT Department
- Marketing Department
- HR Department
- Administration

**Typical Actions**:
- Monitor intern progress
- Conduct weekly/monthly evaluations
- Review intern reports
- Provide guidance and feedback
- Submit performance assessments

---

### 4. INTERN
**Purpose**: Complete internship program

**Permissions**:
- View own applications
- Submit weekly reports
- View own progress and evaluations
- View program timeline
- Access learning resources
- Update own profile information
- Contact own supervisor/mentor

**Dashboard Access**:
- `/dashboard/intern` - Program progress

**Typical Actions**:
- Submit applications
- Complete weekly reports
- Track progress
- View evaluations from supervisors
- Download certificates

---

## User Account Structure

### User Table Schema
```sql
users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('SUPERADMIN', 'ADMIN', 'INTERN', 'SUPERVISOR'),
  department VARCHAR(100),
  course VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

### Required User Information by Role

#### SUPERADMIN
- Email ✓
- Password ✓
- First Name ✓
- Last Name ✓
- Role ✓
- Department: NULL
- Course: NULL

#### ADMIN
- Email ✓
- Password ✓
- First Name ✓
- Last Name ✓
- Role ✓
- Department: NULL
- Course: NULL

#### SUPERVISOR
- Email ✓
- Password ✓
- First Name ✓
- Last Name ✓
- Role ✓
- Department ✓ (IT, Marketing, HR, Admin)
- Course: NULL
- Phone (optional)

#### INTERN
- Email ✓
- Password ✓
- First Name ✓
- Last Name ✓
- Role ✓
- Department (after assignment)
- Course (option to specify)
- Phone (optional)

---

## Account Lifecycle

### INTERN Account Journey

```
1. REGISTRATION
   └─ Create account with email/password
   └─ Complete profile (name, course, interests)
   └─ Await email verification

2. APPLICATION
   └─ Browse internship positions
   └─ Apply to positions
   └─ Track application status

3. SELECTION
   └─ Application reviewed by ADMIN
   └─ Appear on accepted interns list
   └─ Assigned to SUPERVISOR
   └─ Assigned to internship program

4. ONBOARDING
   └─ Week 1-2: Meet supervisor and team
   └─ Review program plan and objectives
   └─ Set up workspace and tools
   └─ Initial assessment by supervisor

5. ACTIVE INTERNSHIP
   └─ Complete weekly tasks
   └─ Submit weekly reports
   └─ Receive evaluations
   └─ Progress tracked in dashboard

6. COMPLETION
   └─ Final evaluation submitted
   └─ Certificate generated
   └─ Option to apply for full-time role
   └─ Account status: COMPLETED

7. ARCHIVE
   └─ Account remains accessible
   └─ Past reports and evaluations visible
   └─ Option to request transcript
```

### SUPERVISOR Account Lifecycle

```
1. CREATION
   └─ Created by SUPERADMIN or ADMIN
   └─ Assigned to specific department
   └─ Receives login credentials

2. SETUP
   └─ Complete profile information
   └─ Set department preferences
   └─ Review supervision guidelines

3. ACTIVE
   └─ Supervise assigned interns
   └─ Submit evaluations
   └─ Review intern reports
   └─ Provide feedback and guidance

4. INACTIVE
   └─ Account deactivated by SUPERADMIN
   └─ Can be reactivated if needed
   └─ Historical data preserved
```

---

## Authentication System

### Login Process
1. User enters email and password
2. System validates credentials from database
3. If valid:
   - Create session token
   - Store in localStorage
   - Store user object with role info
   - Redirect to role-specific dashboard
4. If invalid:
   - Show error message
   - Clear error after timeout

### Session Management
- **Storage**: Browser localStorage
- **Token Key**: `auth_token`
- **User Key**: `auth_user`
- **Persistence**: Maintained across page refreshes
- **Expiration**: Currently unlimited (implement in production)

### Password Requirements (Future)
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character

---

## Demo Accounts for Testing

### Testing Hierarchy
```
SUPERADMIN (Full Access)
    ├── ADMIN (Program Management)
    │   └── Monitor all departments
    ├── SUPERVISOR - IT (Team Lead)
    │   ├── Intern 1 (Software Dev)
    │   └── Intern 2 (Data Analytics)
    ├── SUPERVISOR - Marketing (Team Lead)
    │   └── Intern 3 (Marketing)
    └── SUPERVISOR - HR (Team Lead)
        └── [No interns assigned]
```

### Sample User Fixtures
```javascript
// User Creation Seed
const users = [
  // SUPERADMIN
  {
    email: 'superadmin@internship.com',
    password: 'superadmin123',
    first_name: 'Super',
    last_name: 'Admin',
    role: 'SUPERADMIN'
  },

  // ADMIN
  {
    email: 'admin@internship.com',
    password: 'admin123',
    first_name: 'John',
    last_name: 'Admin',
    role: 'ADMIN'
  },

  // SUPERVISORS
  {
    email: 'supervisor.it@internship.com',
    password: 'supervisor123',
    first_name: 'Alice',
    last_name: 'Johnson',
    role: 'SUPERVISOR',
    department: 'IT Department'
  },

  // INTERNS
  {
    email: 'intern1@student.com',
    password: 'intern123',
    first_name: 'Emma',
    last_name: 'Davis',
    role: 'INTERN',
    department: 'IT Department',
    course: 'BS Computer Science'
  }
];
```

---

## Account Settings & Preferences

### Profile Settings (TO BE IMPLEMENTED)
- First Name
- Last Name
- Email
- Phone Number
- Profile Picture
- Bio/Description
- LinkedIn Profile
- GitHub Profile

### Security Settings (TO BE IMPLEMENTED)
- Change Password
- Two-Factor Authentication
- Login History
- Active Sessions
- Trusted Devices
- Account Deletion

### Notification Preferences (TO BE IMPLEMENTED)
- Email Notifications
-  In-App Notifications
- Report Reminders
- Evaluation Notifications
- Application Updates

### Privacy Settings (TO BE IMPLEMENTED)
- Profile Visibility
- Data Sharing
- Cookie Preferences
- Marketing Communications

---

## User Metrics & Analytics

### User Growth Tracking
```
Total Users: 247
├── SUPERADMIN: 1
├── ADMIN: 4
├── SUPERVISOR: 12 (distributed across 4 departments)
└── INTERN: 230

Active Users (Last 30 days): 198
Inactive Users: 49
```

### Department Distribution
```
IT Department: 120 interns + 3 supervisors
Marketing Department: 75 interns + 3 supervisors
HR Department: 25 interns + 3 supervisors
Administration: 10 interns + 3 supervisors
```

### Account Status Distribution
```
Active: 200
Inactive: 30
Pending Activation: 17
Suspended: 0
```

---

## User Account Types & Their Goals

### SUPERADMIN Goals
✓ Monitor system health
✓ Ensure data integrity
✓ Manage administrative overhead
✓ Review program metrics
✓ Support other staff

### ADMIN Goals
✓ Recruit qualified interns
✓ Place interns in appropriate roles
✓ Track program success
✓ Ensure quality experiences
✓ Manage positions and timelines

### SUPERVISOR Goals
✓ Develop intern skills
✓ Provide guidance and mentorship
✓ Evaluate performance
✓ Prepare interns for career
✓ Track department metrics

### INTERN Goals
✓ Gain work experience
✓ Develop professional skills
✓ Build network
✓ Earn certification
✓ Secure future employment

---

## User Support & Resources

### Help Resources (TO BE IMPLEMENTED)
- Knowledge Base
- FAQ Section
- Video Tutorials
- Contact Support Form
- Live Chat Support

### For Each Role
```
SUPERADMIN
├── System administration guide
├── Database management
├── User management guide
└── System troubleshooting

ADMIN
├── Program management guide
├── Application review process
├── Position creation guide
└── Reporting guide

SUPERVISOR
├── Team management guide
├── Evaluation process
├── Report management
└── Intern development guide

INTERN
├── Getting started guide
├── Application process
├── Program timeline
├── Report submission guide
└── Resources and tools
```

---

## Data Privacy & Security

### GDPR Compliance
- User data encryption at rest
- Secure password hashing (bcrypt)
- Session token encryption
- Data retention policies
- User consent tracking

### Access Control
- Role-based access (RBAC)
- Department-level isolation
- Supervisor can only see own interns
- Interns can only see own data
- Audit logging (future)

### Data Deletion
- User account deletion (soft delete initially)
- Cascade rules for related data
- Archive for reporting purposes
- Compliance with regulations

---

## Integration Points

### With Other Systems
- Email Service (SendGrid/AWS SES)
- File Storage (AWS S3/Google Cloud)
- Video Conferencing (Zoom/Google Meet)
- Document Generation (PDF generation)
- Analytics (Google Analytics/Mixpanel)

---

**Last Updated**: April 2026
**Version**: 1.0
**Maintained By**: Claude Code
