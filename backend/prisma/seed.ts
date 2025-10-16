import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      name: 'Juan Pérez',
      email: 'juan@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'María García',
      email: 'maria@example.com',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Carlos López',
      email: 'carlos@example.com',
    },
  });

  console.log('✅ Usuarios creados');

  // Crear posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Introducción a TypeScript',
        content: 'TypeScript es un superset de JavaScript que añade tipado estático...',
        published: true,
        authorId: user1.id,
      },
      {
        title: 'React Best Practices',
        content: 'En este artículo veremos las mejores prácticas para React...',
        published: true,
        authorId: user1.id,
      },
      {
        title: 'Guía de Prisma ORM',
        content: 'Prisma es un ORM moderno para Node.js y TypeScript...',
        published: true,
        authorId: user2.id,
      },
      {
        title: 'TailwindCSS Tips',
        content: 'Consejos y trucos para trabajar con TailwindCSS...',
        published: false,
        authorId: user2.id,
      },
      {
        title: 'Node.js Performance',
        content: 'Cómo optimizar el rendimiento de tus aplicaciones Node.js...',
        published: true,
        authorId: user3.id,
      },
    ],
  });

  console.log('✅ Posts creados');
  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
