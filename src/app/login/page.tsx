
// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();
//     console.log('REQUEST: ', email, password)
//     // Validate request body
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//     }

//     // Find user in database
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     // Create JWT token (replace "your-secret-key" with an environment variable)
//     const token = sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
//       expiresIn: "1h",
//     });

//     // Return response with token
//     return NextResponse.json({ message: "Login successful", token, user }, { status: 200 });

//   } catch (error) {
//     console.error("Login Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



// // import { PrismaClient } from "@prisma/client";
// // import bcrypt from "bcryptjs";
// // import { NextResponse } from "next/server";
// // import { z } from "zod";

// // const prisma = new PrismaClient();

// // // Input validation
// // const registerSchema = z.object({
// //   email: z.string().email(),
// //   password: z.string().min(6),
// // });

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json();
// //     const { email, password } = registerSchema.parse(body);

// //     // Check if user exists
// //     const existingUser = await prisma.user.findUnique({ where: { email } });
// //     if (existingUser) {
// //       return NextResponse.json({ error: "User already exists" }, { status: 400 });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create user
// //     const user = await prisma.user.create({
// //       data: { email, password: hashedPassword },
// //     });

// //     return NextResponse.json({ message: "User registered!", user });
// //   } catch (error) {
// //     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
// //   }
// // }
