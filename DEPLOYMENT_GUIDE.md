# 🗺️ Complete Routing & Navigation Guide

## Production Deployment Configuration

### Environment Variables Required

#### Development (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost/internship_system/api
NEXT_PUBLIC_API_AUTH_URL=http://localhost/internship_system/api/auth
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

#### Production (.env.production)
```env
NEXT_PUBLIC_API_BASE_URL=https://api.fragranzaolio.com/internship_system/api
NEXT_PUBLIC_API_AUTH_URL=https://api.fragranzaolio.com/internship_system/api/auth
NEXT_PUBLIC_APP_URL=https://fragranzaolio.com
NEXT_PUBLIC_USE_MOCK_AUTH=false
```

---

## 🎯 Core Routes (Public & Landing)

| Path | Role | Description |
|------|------|-------------|
| `/` | PUBLIC | Premium Fragranza Olio landing page with AuthModal |
| `/fragranza` | PUBLIC | Fragranza brand homepage |
| `/fragranza/products` | PUBLIC | Product catalog & filtering |
| `/fragranza/collections` | PUBLIC | Collections by category |
| `/fragranza/collections/[category]` | PUBLIC | Category details |
| `/fragranza/about` | PUBLIC | Brand heritage & values |
| `/fragranza/ingredients` | PUBLIC | Sustainability & ingredients |
| `/fragranza/blog` | PUBLIC | Magazine-style blog posts |
| `/fragranza/blog/[category]` | PUBLIC | Blog by category |
| `/fragranza/contact` | PUBLIC | Contact form |
| `/internship` | PUBLIC | Internship program info |
| `/internship/about` | PUBLIC | About the program |
| `/internship/plans` | PUBLIC | Available internship plans |
| `/internship/plans/[id]` | PUBLIC | Detailed plan view |
| `/internship/apply` | PUBLIC | Application form |
| `/unauthorized` | PROTECTED | Access denied page |

---

## 👑 SUPERADMIN Routes (Full Access)

**Entry Point**: `/enterprise`

### Available Modules (7/7):
- ✅ HR Management
- ✅ Task Management
- ✅ Products & Inventory
- ✅ Sales Management
- ✅ POS System
- ✅ Intern Dashboard
- ✅ Reports & Analytics

### Routes:
| Path | Module | Features |
|------|--------|----------|
| `/enterprise` | Dashboard | Overview & stats |
| `/enterprise/hr` | HR Management | 7 sub-pages |
| `/enterprise/hr/attendance` | HR | Check-in/out tracking |
| `/enterprise/hr/timesheets` | HR | Submission & approval |
| `/enterprise/hr/leaves` | HR | Leave request system |
| `/enterprise/hr/overtime` | HR | Overtime tracking |
| `/enterprise/hr/employees` | HR | Employee management |
| `/enterprise/hr/interns` | HR | Intern roster |
| `/enterprise/tasks` | Tasks | Task management |
| `/enterprise/inventory` | Inventory | Product management |
| `/enterprise/sales` | Sales | Sales tracking |
| `/enterprise/pos` | POS | Point of sale system |
| `/enterprise/interns` | Interns | Intern listings |
| `/enterprise/interns/[id]` | Interns | Individual intern profile |
| `/enterprise/reports` | Reports | Analytics & reports |
| `/account/profile` | Account | Profile management |
| `/account/security` | Account | Password & 2FA |
| `/account/preferences` | Account | User preferences |

---

## 🔑 ADMIN Routes (Enterprise Access)

**Entry Point**: `/enterprise`

### Available Modules (7/7):
Same as SUPERADMIN - Full enterprise access

All SUPERADMIN routes + account pages.

---

## 👨‍💼 SUPERVISOR Routes (HR & Operations)

**Entry Point**: `/enterprise`

### Available Modules (5/5):
- ✅ HR Management
- ✅ Task Management
- ✅ Sales Management
- ✅ Intern Dashboard
- ❌ Products & Inventory (restricted)
- ❌ POS System (restricted)
- ❌ Reports & Analytics (restricted)

### Routes:
| Path | Status | Notes |
|------|--------|-------|
| `/enterprise` | ✅ | Dashboard visible |
| `/enterprise/hr` | ✅ | Manage HR operations |
| `/enterprise/tasks` | ✅ | Assign & manage tasks |
| `/enterprise/sales` | ✅ | View sales |
| `/enterprise/interns` | ✅ | View & manage interns |
| `/enterprise/interns/[id]` | ✅ | Intern detail view |
| `/enterprise/inventory` | ❌ | 403 Unauthorized |
| `/enterprise/pos` | ❌ | 403 Unauthorized |
| `/enterprise/reports` | ❌ | 403 Unauthorized |
| `/account/*` | ✅ | Account management |

---

## 🎓 INTERN Routes (Task-Only Access)

**Entry Point**: `/enterprise`

### Unique Dashboard: `/account/intern-dashboard`

### Available Modules (1/1):
- ✅ Task Management
- ❌ All other modules (restricted)

### Routes:
| Path | Status | Features |
|------|--------|----------|
| `/enterprise` | ✅ | Filtered dashboard (Tasks only) |
| `/enterprise/tasks` | ✅ | View assigned tasks |
| `/enterprise/hr` | ❌ | 403 Unauthorized |
| `/enterprise/inventory` | ❌ | 403 Unauthorized |
| `/enterprise/sales` | ❌ | 403 Unauthorized |
| `/enterprise/pos` | ❌ | 403 Unauthorized |
| `/enterprise/interns` | ❌ | 403 Unauthorized |
| `/enterprise/reports` | ❌ | 403 Unauthorized |
| **Intern-Only Account** | | |
| `/account/intern-dashboard` | ✅ | Personal progress dashboard |
| `/account/profile` | ✅ | Edit name, phone, bio only |
| `/account/security` | ✅ | Password settings |
| `/account/preferences` | ✅ | Notification preferences |

**Profile Restrictions for Interns:**
- 🔒 Email: Read-only
- 🔒 Department: Read-only
- 🔒 Course: Read-only
- ✏️ Editable: First name, Phone, Bio

---

## 🛍️ CLIENT/BUYER Routes (Shop Portal)

**Entry Point**: `/client`

### Shop Portal (4/4 Modules):
- ✅ Shop
- ✅ My Orders
- ✅ Learning Materials
- ✅ Account

### Routes:
| Path | Features |
|------|----------|
| `/client` | Shop catalog & filtering |
| `/client/orders` | Order history & tracking |
| `/client/learning` | Documents & videos from supervisors |
| `/client/account` | Profile & shipping settings |

**Not Accessible to CLIENT**:
- ❌ `/enterprise` (full redirect)
- ❌ All admin modules
- ❌ `/account/*` (uses `/client/account`)

---

## 🔐 Account Management Routes

### Available to All Authenticated Users

| Path | Who Can Access | Allowed Actions |
|------|---|---|
| `/account/profile` | SUPERADMIN, ADMIN, SUPERVISOR, INTERN | Edit profile fields |
| `/account/security` | SUPERADMIN, ADMIN, SUPERVISOR, INTERN | Change password, 2FA |
| `/account/preferences` | SUPERADMIN, ADMIN, SUPERVISOR, INTERN | Theme, notifications |
| `/account/intern-dashboard` | INTERN only | View progress, skills, feedback |
| `/client/account` | CLIENT only | Edit customer profile |

---

## 🔀 Dynamic Routes (Server-Rendered)

```
Dynamic Routes:
├─ /enterprise/interns/[id]        → Individual intern profile
├─ /fragranza/collections/[category] → Category details
├─ /fragranza/blog/[category]      → Blog by category
├─ /internship/plans/[id]          → Plan details
└─ /internship/opportunity/[opportunity] → Job opportunity details
```

---

## 📋 Demo Credentials for Testing

### SUPERADMIN
```
Email: superadmin@example.com
Password: superadmin123
Route: /enterprise → All 7 modules
```

### ADMIN
```
Email: admin.internship@example.com
Password: admin123
Route: /enterprise → All 7 modules
```

### SUPERVISOR (IT)
```
Email: supervisor.it@example.com
Password: supervisor123
Route: /enterprise → 5 modules (HR, Tasks, Sales, Interns, no Inventory/POS/Reports)
```

### INTERN
```
Email: intern.general@example.com
Password: intern123
Route: /enterprise → Tasks only + /account/intern-dashboard
```

### CLIENT/BUYER
```
Email: client@fragranza.com
Password: client123
Route: /client → Shop portal
---
Email: buyer@customer.com
Password: buyer123
Route: /client → Shop portal
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Update `.env.production` with actual domain URLs
- [ ] Change `NEXT_PUBLIC_USE_MOCK_AUTH=false` for real API auth
- [ ] Verify API endpoints are reachable from production server
- [ ] Update CORS headers in PHP API

### Build & Deploy
```bash
# Build
npm run build

# Test build locally
npm start

# Deploy to hosting (Vercel, AWS, etc.)
npm run build && npm start
```

### Post-Deployment
- [ ] Test all role-based access from production URL
- [ ] Verify authentication redirects work correctly
- [ ] Check security headers in browser DevTools
- [ ] Test email notifications (if configured)
- [ ] Monitor error logs for 404s or redirects

---

## 🔗 Important Redirects

| From | To | Type |
|------|----|----|
| `/login` | `/` | Permanent (301) |
| `/dashboard` | `/enterprise` | Temporary (302) |
| Unauthenticated user | `/` | - |
| CLIENT login | `/client` | - |
| STAFF login | `/enterprise` | - |
| Unauthorized access | `/unauthorized` | - |

---

## 🛡️ Security Features

✅ **Role-Based Access Control (RBAC)** - All protected routes verify role
✅ **Protected Routes** - ProtectRoute component enforces access
✅ **Session Persistence** - localStorage maintains auth state
✅ **Environment Variable Security** - API URLs configurable per environment
✅ **Security Headers** - X-Frame-Options, CSP, etc. in next.config

---

## ⚡ Performance Optimizations

- Static routes prerendered at build time
- Dynamic routes use server-side rendering
- Images optimized with Next.js Image component
- Tailwind CSS tree-shaking for smaller bundle
- Environment variables baked in at build time

