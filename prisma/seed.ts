import { PrismaClient } from "../generated/prisma/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@rideease.com",
      password: adminPassword,
      phone: "01700000000",
      role: "admin",
    },
  });

  // Create Customer
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: userPassword,
      phone: "01800000000",
      role: "customer",
    },
  });

  // Create Vehicles
  const vehicles = [
    {
      vehicle_name: "Tesla Model S",
      brand: "Tesla",
      description: "Experience the future of driving with the Tesla Model S. High performance, long range, and advanced autopilot features.",
      type: "Electric",
      fuel_type: "Electric",
      transmission: "Automatic",
      passenger_capacity: 5,
      registration_number: "TSL-2024-001",
      daily_rent_price: 150.00,
      availability_status: "available",
      image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    },
    {
      vehicle_name: "Toyota Camry Hybrid",
      brand: "Toyota",
      description: "Comfortable, reliable, and fuel-efficient. The Camry Hybrid is the perfect choice for city driving and long highway trips.",
      type: "Sedan",
      fuel_type: "Hybrid",
      transmission: "Automatic",
      passenger_capacity: 5,
      registration_number: "TOY-2024-005",
      daily_rent_price: 65.00,
      availability_status: "available",
      image_url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      vehicle_name: "BMW X5 M-Sport",
      brand: "BMW",
      description: "Luxury meets power. The BMW X5 offers a premium interior and exceptional handling for a superior driving experience.",
      type: "SUV",
      fuel_type: "Petrol",
      transmission: "Automatic",
      passenger_capacity: 5,
      registration_number: "BMW-X5-009",
      daily_rent_price: 120.00,
      availability_status: "available",
      image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      vehicle_name: "Audi A8 L",
      brand: "Audi",
      description: "The pinnacle of executive luxury. Advanced technology and a smooth, quiet ride make every journey a first-class experience.",
      type: "Luxury",
      fuel_type: "Petrol",
      transmission: "Automatic",
      passenger_capacity: 4,
      registration_number: "AUDI-A8-111",
      daily_rent_price: 180.00,
      availability_status: "available",
      image_url: "https://images.unsplash.com/photo-1606155096413-0a96b23d9029?q=80&w=1200&auto=format&fit=crop",
    },
    {
      vehicle_name: "Mercedes-Benz G-Wagon",
      brand: "Mercedes-Benz",
      description: "An icon of off-road performance and luxury status. The G-Class is unparalleled in its presence and capability.",
      type: "SUV",
      fuel_type: "Petrol",
      transmission: "Automatic",
      passenger_capacity: 5,
      registration_number: "MB-GW-999",
      daily_rent_price: 250.00,
      availability_status: "available",
      image_url: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop",
    }
  ];

  for (const v of vehicles) {
    await prisma.vehicle.create({
      data: v as any,
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
