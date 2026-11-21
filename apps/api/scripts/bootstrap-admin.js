// Bootstrap: promote a user to SYSTEM_ADMIN. Run once.
// Usage: node scripts/bootstrap-admin.js atc-2024-0003@atc.ac.tz
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: node scripts/bootstrap-admin.js <email>");
    console.error("Example: node scripts/bootstrap-admin.js atc-2024-0003@atc.ac.tz");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`❌ User not found: ${email}`);
    console.error("→ Login with that user first (via /login page), then re-run this script.");
    process.exit(1);
  }

  const role = await prisma.role.upsert({
    where: { name: "SYSTEM_ADMIN" },
    update: {},
    create: { name: "SYSTEM_ADMIN", description: "System Administrator" },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: role.id } },
    update: {},
    create: { userId: user.id, roleId: role.id },
  });

  console.log(`✅ ${user.fullName} (${user.email}) → SYSTEM_ADMIN`);
  console.log(`   User ID: ${user.id}`);
  console.log(`\n→ Log out, log in again as ${email}, you'll land on /admin/dashboard`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
