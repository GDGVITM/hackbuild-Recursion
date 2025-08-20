# EventX – Smart Event Management & Check-in System
*Team Recursion*

## Overview
EventX is a lightweight, scalable, and secure event management platform built for colleges to streamline the registration, payment, and QR-code check-in process.  
It eliminates manual entry, reduces queues, and provides real-time attendance analytics.

This project was designed and implemented as part of a hackathon challenge.

---

## Problem Statement
Traditional event management in colleges suffers from:
- Long queues during registrations and check-ins.
- Inefficient paper-based or spreadsheet-based tracking.
- Limited transparency in payments and attendance.
- Difficulty in scaling events with hundreds of participants.

---

## Our Solution
EventX offers:
- **QR-based check-in system** for participants.  
- **Secure registration system** linked with unique QR codes.  
- **Role-based access control** for admins, organizers, and volunteers.  
- **Integrated payments** (via Razorpay/Stripe).  
- **Real-time dashboards** to track participation, revenue, and attendance.  

---

## Tech Stack
- **Frontend:** React Native (Expo)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT-based user sessions  
- **QR Code:** `expo-barcode-scanner`, JWT/UUID tokens  
- **Payments:** Razorpay/Stripe (extensible)  

---

## System Architecture
**Entities:**
- `User` → student, organizer, admin, volunteer  
- `Event` → college-level event (with capacity, timings)  
- `Registration` → links users and events with QR code  
- `Payment` → logs transactions for paid events  
- `Audit Logs` → optional, to monitor role-based actions  

**Flow:**
1. User signs up and registers for an event.  
2. System generates a **unique QR code** for that registration.  
3. On event day, volunteers scan QR → system validates token → check-in recorded.  
4. Organizers & admins view analytics in real-time.  

---

