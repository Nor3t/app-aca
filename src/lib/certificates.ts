import { prisma } from "./prisma";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "ACA-";
  const year = new Date().getFullYear();
  code += year + "-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function issueCertificate(userId: string, courseTitle: string, studentName: string) {
  let code = generateCode();

  // Make sure code is unique
  let exists = await prisma.certificate.findUnique({ where: { code } });
  while (exists) {
    code = generateCode();
    exists = await prisma.certificate.findUnique({ where: { code } });
  }

  const cert = await prisma.certificate.create({
    data: { userId, courseTitle, studentName, code },
  });

  return cert;
}

export async function verifyCertificate(code: string) {
  const cert = await prisma.certificate.findUnique({
    where: { code: code.toUpperCase() },
    include: { user: { select: { name: true, image: true } } },
  });
  return cert;
}
