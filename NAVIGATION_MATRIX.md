# User Roles & Navigation Matrix

## Role-Based Module Access

### 1. SUPERADMIN 👑
**Email**: `superadmin@example.com` | **Password**: `superadmin123`

**Enterprise Modules** (7/7):
- ✅ HR Management - `/enterprise/hr` (👥)
- ✅ Task Management - `/enterprise/tasks` (✓)
- ✅ Products & Inventory - `/enterprise/inventory` (📦)
- ✅ Sales Management - `/enterprise/sales` (💼)
- ✅ POS System - `/enterprise/pos` (💳)
- ✅ Intern Management - `/enterprise/interns` (🎓)
  - Can view all interns: `/enterprise/interns`
  - Can view individual intern: `/enterprise/interns/[id]`
- ✅ Reports & Analytics - `/enterprise/reports` (📊)

**Account Pages**:
- `/account/profile` - Edit profile (all fields editable)
- `/account/security` - Password & 2FA settings
- `/account/preferences` - Theme & notifications

---

### 2. ADMIN 🔑
**Email**: `admin.internship@example.com` | **Password**: `admin123`

**Enterprise Modules** (7/7):
- ✅ HR Management - `/enterprise/hr` (👥)
- ✅ Task Management - `/enterprise/tasks` (✓)
- ✅ Products & Inventory - `/enterprise/inventory` (📦)
- ✅ Sales Management - `/enterprise/sales` (💼)
- ✅ POS System - `/enterprise/pos` (💳)
- ✅ Intern Management - `/enterprise/interns` (🎓)
  - Can view all interns: `/enterprise/interns`
  - Can view individual intern: `/enterprise/interns/[id]`
- ✅ Reports & Analytics - `/enterprise/reports` (📊)

**Account Pages**:
- `/account/profile` - Edit profile (all fields editable)
- `/account/security` - Password & 2FA settings
- `/account/preferences` - Theme & notifications

---

### 3. SUPERVISOR 👨‍💼
**Email**: `supervisor.it@example.com` | **Password**: `supervisor123`

**Enterprise Modules** (5/7):
- ✅ HR Management - `/enterprise/hr` (👥)
- ✅ Task Management - `/enterprise/tasks` (✓)
- ✅ Sales Management - `/enterprise/sales` (💼)
- ✅ Intern Management - `/enterprise/interns` (🎓)
  - Can view all interns: `/enterprise/interns`
  - Can view individual intern: `/enterprise/interns/[id]`
  - Can add feedback to interns
- ❌ Products & Inventory - Not accessible
- ❌ POS System - Not accessible
- ❌ Reports & Analytics - Not accessible

**Account Pages**:
- `/account/profile` - Edit profile (all fields editable)
- `/account/security` - Password & 2FA settings
- `/account/preferences` - Theme & notifications

---

### 4. INTERN 🎓
**Email**: `intern.general@example.com` | **Password**: `intern123`

**Enterprise Modules** (1/7):
- ✅ Task Management - `/enterprise/tasks` (✓)
- ❌ All other modules - Not accessible

**Account Pages** (Special Intern-Only):
- `/account/intern-dashboard` - **Exclusive dashboard with**:
  - 📊 Assigned plans & progress tracking
  - 📈 Weekly milestones (completed/pending)
  - ⭐ Skills development (5-level bars)
  - 💬 Supervisor feedback
  - 📚 Learning materials accessed
  - 📌 Overall progress stats
- `/account/profile` - Edit profile (READ-ONLY FIELDS):
  - ✏️ Editable: First name, Phone, Bio
  - 🔒 Read-only: Email, Department, Course
- `/account/security` - Password & 2FA settings
- `/account/preferences` - Theme & notifications

---

### 5. CLIENT 👤
**Email**: `client@fragranza.com` OR `buyer@customer.com` | **Password**: `client123` OR `buyer123`

**Cannot Access**:
- ❌ `/enterprise` - Completely blocked
- ❌ All enterprise modules

**Client Portal Modules** (4/4):
- ✅ Shop - `/client` (🛍️) - Browse & add products
- ✅ Learning Materials - `/client/learning` (📚) - Docs & videos
- ✅ My Orders - `/client/orders` (📦) - Purchase history
- ✅ Account Settings - `/client/account` (⚙️) - Profile management

---

## Navigation Structure

### Enterprise Layout (SUPERADMIN, ADMIN, SUPERVISOR, INTERN)
```
Sidebar (Expandable)
├─ User Profile Card (Avatar + Role + Name)
├─ Modules Section
│  ├─ HR Management (if accessible)
│  ├─ Task Management (if accessible)
│  ├─ Products & Inventory (if accessible)
│  ├─ Sales Management (if accessible)
│  ├─ POS System (if accessible)
│  ├─ Intern Management (if accessible)
│  └─ Reports & Analytics (if accessible)
├─ ─────────────────────────
├─ Account Section
│  ├─ Dashboard (INTERN only)
│  └─ Settings (ADMIN/SUPERVISOR/SUPERADMIN)
└─ Sign Out Button

Header
└─ "Enterprise Management" Title (Clean, minimal)
```

### Client Layout (CLIENT only)
```
Sidebar (Expandable)
├─ User Profile Card (Avatar + "Customer" + Name)
├─ Shopping Section
│  ├─ Shop
│  ├─ Learning Materials
│  ├─ My Orders
│  └─ Account
├─ ─────────────────────────
├─ Account Section
│  └─ Settings
└─ Sign Out Button

Header
└─ "Fragranza Olio Shop" Title (Clean, minimal)
```

---

## Active State Indicators

- **Yellow Gold (📌)**: Module/page currently active
  - Navigation item highlights with gold background
  - Small gold dot appears on the right

- **Blue (🔵)**: Account section
  - Account navigation items use blue accent color
  - For distinction from modules

---

## Test Scenarios

### Scenario 1: SUPERADMIN Full Access
1. Login as `superadmin@example.com` / `superadmin123`
2. See all 7 modules in sidebar: HR, Tasks, Inventory, Sales, POS, Interns, Reports
3. Click each module - all load successfully
4. Click Intern Management → See 4 intern cards
5. Click on John Doe → View detailed intern profile
6. Click "Settings" in sidebar → Edit profile (all fields editable)

### Scenario 2: INTERN Limited Access
1. Login as `intern.general@example.com` / `intern123`
2. See only 1 module: Tasks
3. See exclusive "Dashboard" button in Account section
4. Click Dashboard → See internship progress, milestones, skills
5. Click Settings → Edit profile (Email, Dept, Course are locked - read-only)
6. See blue notice: "Some fields are restricted"

### Scenario 3: CLIENT Separate Portal
1. Login as `client@fragranza.com` / `client123`
2. Redirected to `/client` (NOT `/enterprise`)
3. See 4 client modules: Shop, Learning, Orders, Account
4. Browse products, view learning materials
5. Click Account Settings → View customer profile

### Scenario 4: SUPERVISOR Partial Access
1. Login as `supervisor.it@example.com` / `supervisor123`
2. See 5 modules: HR, Tasks, Sales, Interns, (NOT Inventory/POS/Reports)
3. Click Interns → See intern cards, click to view profiles
4. Can click "Add Feedback" button for interns
5. Cannot access inventory or reports

---

## Module Descriptions

| Module | Icon | Best For | Access Level |
|--------|------|----------|--------------|
| HR Management | 👥 | Employee records, attendance, payroll | SUPERADMIN, ADMIN, SUPERVISOR |
| Task Management | ✓ | Assign & track tasks | All staff + INTERN |
| Products & Inventory | 📦 | Stock management | SUPERADMIN, ADMIN only |
| Sales Management | 💼 | Sales tracking, pipeline | SUPERADMIN, ADMIN, SUPERVISOR |
| POS System | 💳 | Point of Sale operations | SUPERADMIN, ADMIN only |
| Intern Management | 🎓 | Monitor interns, feedback | SUPERADMIN, ADMIN, SUPERVISOR |
| Reports & Analytics | 📊 | Business intelligence | SUPERADMIN, ADMIN only |

---

## Key Differences

✨ **SUPERADMIN & ADMIN**:
- All 7 enterprise modules
- Full profile editing
- Access to sensitive reports & POS

🛡️ **SUPERVISOR**:
- 5 modules (limited to operational areas)
- Cannot see inventory or reports
- Can manage interns directly

👨‍🎓 **INTERN**:
- Exclusive dashboard with progress tracking
- Limited profile editing (read-only fields)
- Can only access tasks assigned to them

🛍️ **CLIENT**:
- Completely separate portal at `/client`
- Shopping experience only
- Cannot see enterprise system

