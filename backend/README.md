# EventHub Backend - Authentication & Payment Integration

## 🚀 Setup Instructions

### 1. Environment Variables
Create a `.env` file in the backend root directory with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/eventhub

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
```

### 2. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- Update the `MONGO_URI` in your `.env` file
- The database will be created automatically when you first run the server

### 3. Installation
```bash
cd backend
npm install
```

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔐 Authentication System

### Features
- **Hybrid Authentication**: Supports both traditional email/password and Clerk OAuth
- **JWT Tokens**: Secure token-based authentication
- **Role-based Access**: Admin, Organizer, Volunteer, Student roles
- **User Management**: Registration, login, profile management

### API Endpoints

#### Authentication Routes (`/api/auth`)
- `POST /login` - Traditional login
- `POST /register` - User registration
- `POST /sync-clerk` - Sync Clerk user with database
- `GET /check-user/:email` - Check if user exists
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)

#### Payment Routes (`/api/payments`)
- `POST /create-order` - Create Razorpay order
- `POST /verify-payment` - Verify payment signature
- `GET /payment/:paymentId` - Get payment details
- `POST /refund` - Process refund
- `GET /razorpay-key` - Get Razorpay public key

### User Model Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  passwordHash: String (required, bcrypt hashed),
  role: String (enum: ["admin", "organizer", "volunteer", "student"]),
  phone: String (optional),
  collegeId: ObjectId (optional, ref: "College"),
  createdAt: Date (default: now),
  notificationPreferences: {
    email: Boolean (default: true),
    sms: Boolean (default: false),
    whatsapp: Boolean (default: false),
    browser: Boolean (default: true)
  },
  clerkId: String (unique, for Clerk integration),
  isClerkUser: Boolean (default: false)
}
```

## 🔒 Security Features

### JWT Authentication
- Tokens expire after 7 days
- Secure signature verification
- Role-based access control

### Password Security
- Bcrypt hashing with 12 salt rounds
- Secure password validation
- Protection against common attacks

### CORS Configuration
- Configured for frontend integration
- Secure headers and middleware

## 🔄 Authentication Flow

### Traditional Login/Register
1. User submits credentials
2. Backend validates and creates/authenticates user
3. JWT token generated and returned
4. Frontend stores token in localStorage
5. Token used for subsequent API calls

### Clerk Integration
1. User signs in with Clerk
2. Frontend calls `/sync-clerk` with Clerk user data
3. Backend creates/updates user record
4. JWT token generated and returned
5. Seamless integration with existing system

## 🧪 Testing

### Test the Authentication
```bash
# Test server health
curl http://localhost:5000/

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"student"}'

# Test user login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 Notes

- The system supports both traditional authentication and Clerk OAuth
- Users can switch between authentication methods seamlessly
- All sensitive data is properly hashed and secured
- The backend is designed to scale with additional features
