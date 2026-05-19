import 'dotenv/config';
import { identityDb } from './services/admin.service';
import bcrypt from 'bcrypt';

async function main() {
  try {
    console.log('Checking for admin user...');
    const adminUser = await identityDb.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (adminUser) {
      console.log(`Admin user already exists: ${adminUser.email} (role: ${adminUser.role})`);
      return;
    }

    console.log('No admin user found. Creating one...');
    const email = 'admin@gymfitness.ai';
    const password = 'admin12345';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await identityDb.user.create({
      data: {
        email,
        passwordHash,
        role: 'ADMIN',
        suspended: false
      }
    });

    console.log(`Admin user successfully created: ${newAdmin.email} (id: ${newAdmin.id})`);
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await identityDb.$disconnect();
  }
}

main();
