# EventHub Backend - Razorpay Integration

## 🚀 Setup Instructions

### 1. Environment Variables
Create a `.env` file in the backend root directory with:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 2. Get Razorpay Keys
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate a new key pair
4. Use test keys for development, live keys for production

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## 📱 API Endpoints

### Razorpay Integration
- `POST /create-order` - Create a new payment order
- `POST /verify-payment` - Verify payment signature
- `GET /payment/:payment_id` - Get payment details
- `POST /refund-payment` - Process refunds
- `GET /order/:order_id/payments` - Get order payments
- `GET /razorpay-key` - Get public key for frontend

### Health Check
- `GET /` - Server status and health check

## 🔒 Security Features

- **Payment Verification**: Cryptographic signature verification
- **Environment Variables**: Secure key management
- **CORS**: Cross-origin request handling
- **Error Handling**: Comprehensive error management

## 💳 Payment Flow

1. **Frontend** → Creates order via `/create-order`
2. **Backend** → Creates Razorpay order and returns order ID
3. **Frontend** → Initializes Razorpay checkout with order ID
4. **User** → Completes payment on Razorpay
5. **Frontend** → Receives payment response
6. **Backend** → Verifies payment signature via `/verify-payment`

## 🧪 Testing

Use Razorpay test cards:
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🚨 Important Notes

- **Never expose** `RAZORPAY_KEY_SECRET` in frontend code
- **Always verify** payment signatures on backend
- **Use test keys** during development
- **Handle errors** gracefully in production
