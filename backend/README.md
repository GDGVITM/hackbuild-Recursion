# EventHub Backend

A Node.js backend for the EventHub event management application with authentication, event management, and admin functionality.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/eventhub
# OR use MONGODB_URI if you prefer that naming

# JWT Configuration (REQUIRED!)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🗄️ Database Setup

### Seed Sample Data

To populate the database with sample data for testing:

```bash
npm run seed
```

This will create:
- Admin user: `theeventhub2025@gmail.com` / `admin123`
- Organizer user: `aravmahind05@gmail.com` / `organizer123`
- Sample events, venues, and audit logs

## 🔐 Authentication System

### Hybrid Authentication
- **Traditional**: Email/password login with JWT tokens
- **Clerk Integration**: OAuth authentication with automatic user sync

### User Roles
- `admin`: Full access to all features
- `organizer`: Can create and manage events
- `volunteer`: Limited event management
- `student`: Basic user access

## 📊 Admin Dashboard API

### Protected Routes (Admin Only)
All admin routes require authentication and admin role:

```
GET    /api/admin/dashboard/stats          # Dashboard statistics
GET    /api/admin/dashboard/recent-activity # Recent activity logs
GET    /api/admin/events                   # All events with filtering
GET    /api/admin/events/pending-approvals # Pending event approvals
PUT    /api/admin/events/:eventId/status   # Approve/reject events
GET    /api/admin/users                    # All users with filtering
GET    /api/admin/venues                   # All venues
POST   /api/admin/venues/:venueId/allocate # Allocate venue to event
GET    /api/admin/audit-logs               # System audit logs
```

### Features
- **Real-time Data**: All dashboard data is fetched from the database
- **Event Management**: Approve, reject, and manage events
- **User Management**: View and manage all users
- **Venue Allocation**: Assign venues to events
- **Audit Logging**: Track all admin actions
- **Search & Filtering**: Advanced data filtering capabilities

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/login          # Traditional login
POST   /api/auth/register       # User registration
POST   /api/auth/sync-clerk     # Sync Clerk user with database
GET    /api/auth/check-user/:email # Check if user exists
GET    /api/auth/profile        # Get user profile (protected)
PUT    /api/auth/profile        # Update user profile (protected)
```

### Events
```
GET    /api/events              # Get all events
POST   /api/events              # Create new event
GET    /api/events/:id          # Get specific event
PUT    /api/events/:id          # Update event
DELETE /api/events/:id          # Delete event
```

### Payments (Razorpay)
```
GET    /api/payments/razorpay-key    # Get Razorpay public key
POST   /api/payments/create-order    # Create payment order
POST   /api/payments/verify-payment  # Verify payment signature
GET    /api/payments/payment/:id     # Get payment details
POST   /api/payments/refund          # Process refund
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/           # Business logic
│   │   ├── admin.controller.js    # Admin dashboard functions
│   │   ├── auth.controller.js     # Authentication functions
│   │   └── payment.controller.js  # Payment processing
│   ├── models/                # Database schemas
│   │   ├── User.js           # User model
│   │   ├── Event.js          # Event model
│   │   ├── Venue.js          # Venue model
│   │   └── Audit.js          # Audit log model
│   ├── routes/                # API route definitions
│   │   ├── admin.routes.js       # Admin routes
│   │   ├── auth.routes.js        # Auth routes
│   │   └── payment.routes.js     # Payment routes
│   ├── middleware/            # Custom middleware
│   │   └── auth.middleware.js    # JWT authentication
│   ├── seeders/               # Database seeders
│   │   └── seedData.js           # Sample data seeder
│   └── database.js            # MongoDB connection
├── index.js                   # Main server file
├── package.json               # Dependencies and scripts
└── .env                       # Environment variables
```

## 🧪 Testing the Admin Dashboard

1. **Start the backend server**:
   ```bash
   npm run dev
   ```

2. **Seed the database**:
   ```bash
   npm run seed
   ```

3. **Login as admin** in the frontend:
   - Email: `theeventhub2025@gmail.com`
   - Password: `admin123`

4. **Navigate to Admin Dashboard** - you should see:
   - Real-time statistics
   - Sample events with different statuses
   - User list
   - Venue information
   - Audit logs

## 🚨 Troubleshooting

### Common Issues

1. **JWT_SECRET not configured**
   - Error: `secretOrPrivateKey must have a value`
   - Solution: Add `JWT_SECRET` to your `.env` file

2. **MongoDB connection failed**
   - Error: `MongoDB connection error`
   - Solution: Check `MONGO_URI` in `.env` and ensure MongoDB is running

3. **Admin routes returning 403**
   - Error: `Forbidden` or `Unauthorized`
   - Solution: Ensure user has `admin` role and valid JWT token

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## 📝 License

ISC License
