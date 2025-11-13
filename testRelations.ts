import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    include: {
      teams: true,
      sentLetters: true,
      billing: true,
      documents: true,
      members: true,
      teamMemberships: true
    }
  })

  console.log(JSON.stringify(users, null, 2))
}

main()
  .catch((error) => {
    console.error('❌ Error:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
