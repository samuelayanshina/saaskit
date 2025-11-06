// // prisma/seed.ts
// import {PrismaClient} from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding SaasKit database...");

//   // --- USERS ---
//   const john = await prisma.user.create({
//     data:{ email: "john@saaskit.com", name: "John Doe", slug: "john-doe" },
//   });

//   const jane = await prisma.user.create({
//     data:{ email: "jane@saaskit.com", name: "Jane Smith", slug: "jane-smith" },
//   });

//   const tony = await prisma.user.create({
//     data:{ email: "tony@saaskit.com", name: "Tony Stark", slug: "tony-stark" },
//   });

//   console.log("✅ Users created");

//   // --- CATEGORIES ---
//   const catPolicy = await prisma.category.create({
//     data:{ name: "Policy", icon: "document-text" },
//   });

//   const catLegal = await prisma.category.create({
//     data:{ name: "Legal", icon: "shield" },
//   });

//   // --- TEAMS (with members + billing) ---
//   const saaskitTeam = await prisma.team.create({
//     data:{
//       name: "SaaSKit Team",
//       slug: "saaskit-team",
//       members:{
//         create:[
//           { userId: john.id, role: "OWNER" },
//           { userId: jane.id, role: "MEMBER" },
//         ],
//       },
//       billing:{
//         create:{
//           plan: "pro",
//           status: "active",
//           currentPeriodEnd: new Date("2025-12-31"),
//         },
//       },
//     },
//     include:{ members: true, billing: true },
//   });

//   const avengers = await prisma.team.create({
//     data:{
//       name: "Avengers",
//       slug: "avengers",
//       members:{
//         create:[
//           { userId: tony.id, role: "OWNER" },
//         ],
//       },
//       billing:{
//         create:{
//           plan: "enterprise",
//           status: "active",
//           currentPeriodEnd: new Date("2026-03-31"),
//         },
//       },
//     },
//     include:{ members: true, billing: true },
//   });

//   console.log("✅ Teams + Billing created");

//   // --- DOCUMENTS ---
//   await prisma.document.createMany({
//     data:[
//       {
//         title: "Privacy Policy",
//         content: "SaaSKit privacy policy example content...",
//         categoryId: catPolicy.id,
//         createdById: john.id,
//         status: "approved",
//       },
//       {
//         title: "Terms of Service",
//         content: "SaaSKit terms of service sample...",
//         categoryId: catLegal.id,
//         createdById: jane.id,
//         status: "pending",
//       },
//     ],
//   });

//   console.log("✅ Documents created");

//   // --- LETTERS ---
//  await prisma.letter.createMany({
//   data:[
//     {
//       title: "Welcome to SaasKit",
//       body: "Welcome — thanks for joining SaasKit!",
//       senderId: john.id,
//       status: "sent",
//     },
//     {
//       title: "Billing update",
//       body: "Your subscription was updated to Pro.",
//       senderId: john.id,
//       status: "draft",
//     },
//   ],
// });


//   console.log("✅ Letters created");

//   console.log("🌸 SaasKit seeding complete!");
// }

// main()
//   .then(async ()=>{ await prisma.$disconnect(); })
//   .catch(async (e)=>{ console.error(e); await prisma.$disconnect(); process.exit(1); });


import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting SaaSkit seed...')

  // Clear existing data (optional for clean test)
  await prisma.letter.deleteMany()
  await prisma.document.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.team.deleteMany()
  await prisma.billing.deleteMany()
  await prisma.user.deleteMany()

  // 👤 Create User
  const user = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      slug: 'john-doe',
    },
  })

  // 🧾 Create Billing
  const billing = await prisma.billing.create({
    data: {
      userId: user.id,
      plan: 'pro',
      status: 'active',
    },
  })

  // 🧠 Create Team
  const team = await prisma.team.create({
    data: {
      name: 'SaaSkit Team',
      slug: 'saaskit-team',
      userId: user.id,
    },
  })

  // 👥 Add TeamMember
  await prisma.teamMember.create({
    data: {
      role: 'admin',
      teamId: team.id,
      userId: user.id,
    },
  })

  // 📄 Create Document
  await prisma.document.create({
    data: {
      title: 'Getting Started Guide',
      content: 'Welcome to SaaSkit!',
      createdById: user.id,
    },
  })

  // 💌 Create Letter
  await prisma.letter.create({
    data: {
      title: 'Welcome Message',
      body: 'Hey there! Thanks for joining SaaSkit.',
      senderId: user.id,
      status: 'sent',
    },
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((error) => {
    console.error('❌ Error during seeding:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
