import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Testing relations in SaaSkit...')

  const users = await prisma.user.findMany({
    include: {
      teams: true,
      billing: true,
      documents: true,
      sentLetters: true,
      teamMemberships: true,
    },
  })

  console.log('📦 Users with relations:')
  console.dir(users, {depth: null})
}

main()
  .catch((error) => {
    console.error('❌ Error testing relations:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
