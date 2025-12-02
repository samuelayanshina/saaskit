import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
  const u = await prisma.user.upsert({
    where:{email:"alice@example.com"},
    update:{},
    create:{email:"alice@example.com", name:"Alice Founder"}
  });

  const team = await prisma.team.upsert({
    where:{slug:"acme"},
    update:{},
    create:{name:"Acme Team", slug:"acme"}
  });

  await prisma.teamMember.upsert({
    where:{userId_teamId:{userId:u.id, teamId:team.id}},
    update:{role:"OWNER"},
    create:{userId:u.id, teamId:team.id, role:"OWNER"}
  });

  // Create standard permissions
  const perms = ["CanManageBilling","CanInviteMembers","CanReadAPIKeys","CanWriteAPIKeys"];
  for(const key of perms){
    await prisma.teamPermission.upsert({
      where:{teamId_key:{teamId:team.id,key}},
      update:{},
      create:{teamId:team.id,key,description:key}
    });
  }

  // Map OWNER role -> all perms
  const teamPerms = await prisma.teamPermission.findMany({where:{teamId:team.id}});
  for(const p of teamPerms){
    await prisma.rolePermission.upsert({
      where:{teamId_role_permissionId:{teamId:team.id,role:"OWNER",permissionId:p.id}},
      update:{},
      create:{teamId:team.id,role:"OWNER",permissionId:p.id}
    });
  }

  console.log("Seed done");
}

main().catch((e)=>{ console.error(e); process.exit(1); }).finally(()=>{});
