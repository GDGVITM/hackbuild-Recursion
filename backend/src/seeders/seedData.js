import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Venue from '../models/Venue.js';
import Audit from '../models/Audit.js';
import Committee from '../models/Committee.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MongoDB URI is not set in environment variables.');
    }
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Venue.deleteMany({});
    await Audit.deleteMany({});
    await Committee.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPasswordHash = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin User',
      email: 'theeventhub2025@gmail.com',
      passwordHash: adminPasswordHash,
      role: 'admin',
      phone: '+1234567890',
      isActive: true
    });
    console.log('Created admin user:', admin.email);

    // Create organizer user
    const organizerPasswordHash = await bcrypt.hash('organizer123', 12);
    const organizer = await User.create({
      name: 'Arav Mahind',
      email: 'aravmahind05@gmail.com',
      passwordHash: organizerPasswordHash,
      role: 'organizer',
      phone: '+1234567891',
      isActive: true
    });
    console.log('Created organizer user:', organizer.email);

    // Create regular users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: await bcrypt.hash('password123', 12),
        role: 'student',
        phone: '+1234567892',
        isActive: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        passwordHash: await bcrypt.hash('password123', 12),
        role: 'volunteer',
        phone: '+1234567893',
        isActive: true
      }
    ]);
    console.log('Created regular users');

    // Create committees
    const committees = await Committee.create([
      {
        name: 'GDG',
        description: 'Google Developer Group',
        createdBy: admin._id,
        isActive: true
      },
      {
        name: 'CSI',
        description: 'Computer Society of India',
        createdBy: admin._id,
        isActive: true
      }
    ]);
    console.log('Created committees');

    // Create venues
    const venues = await Venue.create([
      {
        name: 'Engineering Auditorium',
        type: 'Auditorium',
        capacity: 200,
        location: { building: 'Engineering', floor: '1', room: 'A101' },
        facilities: ['Projector', 'Sound System', 'WiFi', 'Air Conditioning'],
        status: 'Available',
        isActive: true
      },
      {
        name: 'Campus Amphitheater',
        type: 'Outdoor',
        capacity: 500,
        location: { building: 'Main Campus', floor: 'Ground', room: 'Outdoor' },
        facilities: ['Sound System', 'WiFi'],
        status: 'Booked',
        currentBooking: {
          eventId: null, // Will be set when event is created
          startTime: new Date('2024-04-18T18:00:00Z'),
          endTime: new Date('2024-04-18T22:00:00Z'),
          bookedBy: organizer._id
        },
        isActive: true
      },
      {
        name: 'Science Center Lab',
        type: 'Lab',
        capacity: 150,
        location: { building: 'Science', floor: '2', room: 'L201' },
        facilities: ['Projector', 'WiFi', 'Air Conditioning'],
        status: 'Available',
        isActive: true
      }
    ]);
    console.log('Created venues');

    // Create events
    const events = await Event.create([
      {
        title: 'Tech Innovation Summit 2024',
        description: 'Annual technology conference showcasing latest innovations',
        committee: committees[0]._id, // GDG
        organizer: organizer._id,
        status: 'Pending',
        startTime: new Date('2024-03-15T09:00:00Z'),
        endTime: new Date('2024-03-15T17:00:00Z'),
        location: 'Engineering Auditorium',
        venue: venues[0]._id,
        maxAttendees: 200,
        categories: ['Technology'],
        isActive: true
      },
      {
        title: 'Spring Concert Series',
        description: 'Musical performances by student artists',
        committee: committees[1]._id, // CSI
        organizer: organizer._id,
        status: 'Approved',
        startTime: new Date('2024-04-18T18:00:00Z'),
        endTime: new Date('2024-04-18T22:00:00Z'),
        location: 'Campus Amphitheater',
        venue: venues[1]._id,
        maxAttendees: 500,
        categories: ['Education'],
        isActive: true
      },
      {
        title: 'Science Exhibition',
        description: 'Student science projects showcase',
        committee: committees[1]._id, // CSI
        organizer: organizer._id,
        status: 'Rejected',
        startTime: new Date('2024-05-10T10:00:00Z'),
        endTime: new Date('2024-05-10T16:00:00Z'),
        location: 'Science Center',
        venue: venues[2]._id,
        maxAttendees: 150,
        categories: ['Education', 'Science'],
        isActive: true
      }
    ]);
    console.log('Created events');

    // Update venue booking for the Spring Concert
    await Venue.findByIdAndUpdate(venues[1]._id, {
      currentBooking: {
        eventId: events[1]._id,
        startTime: events[1].startTime,
        endTime: events[1].endTime,
        bookedBy: organizer._id
      }
    });

    // Create audit logs
    await Audit.create([
      {
        user: organizer._id,
        action: 'created_event',
        target: events[0]._id.toString(),
        timestamp: new Date('2024-02-20T10:30:00Z')
      },
      {
        user: admin._id,
        action: 'approved_event',
        target: events[1]._id.toString(),
        timestamp: new Date('2024-02-20T09:15:00Z')
      },
      {
        user: admin._id,
        action: 'rejected_event',
        target: events[2]._id.toString(),
        timestamp: new Date('2024-02-19T16:45:00Z')
      },
      {
        user: users[0]._id,
        action: 'registered_for_event',
        target: events[1]._id.toString(),
        timestamp: new Date('2024-02-19T14:20:00Z')
      }
    ]);
    console.log('Created audit logs');

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log(`👥 Users: ${await User.countDocuments()}`);
    console.log(`📅 Events: ${await Event.countDocuments()}`);
    console.log(`🏢 Venues: ${await Venue.countDocuments()}`);
    console.log(`📝 Audit Logs: ${await Audit.countDocuments()}`);
    console.log(`🏛️ Committees: ${await Committee.countDocuments()}`);
    
    console.log('\n🔑 Test Accounts:');
    console.log('Admin: theeventhub2025@gmail.com / admin123');
    console.log('Organizer: aravmahind05@gmail.com / organizer123');
    console.log('Student: john@example.com / password123');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run seeder if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData();
}

export default seedData;
