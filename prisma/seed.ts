import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  // Create sample jobs
  await prisma.job.createMany({
    data: [
      {
        title: 'Senior React Developer',
        description: 'We are looking for an experienced React developer to join our team. You will work on building scalable web applications using React, TypeScript, and Next.js. Strong understanding of modern JavaScript, state management, and testing is required.',
        jobType: 'Full-time',
        location: 'San Francisco, CA',
        jobAuthor: 'TechCorp Inc.',
        remoteOk: true,
        applyUrl: 'https://example.com/apply/react-dev',
        url: 'https://techcorp.com',
        userId: user.id,
      },
      {
        title: 'UX Designer',
        description: 'Join our design team to create beautiful and intuitive user experiences. We need someone with strong skills in Figma, user research, and prototyping. Experience with design systems and accessibility is a plus.',
        jobType: 'Full-time',
        location: 'New York, NY',
        jobAuthor: 'Design Studio',
        remoteOk: false,
        applyUrl: 'https://example.com/apply/ux-designer',
        url: 'https://designstudio.com',
        userId: user.id,
      },
      {
        title: 'Full Stack Engineer',
        description: 'Work on exciting projects using Node.js, React, and PostgreSQL. We are a fast-growing startup looking for passionate developers who love to build great products. Competitive salary and benefits package.',
        jobType: 'Full-time',
        location: 'Austin, TX',
        jobAuthor: 'StartupXYZ',
        remoteOk: true,
        applyUrl: 'https://example.com/apply/fullstack',
        userId: user.id,
      },
      {
        title: 'Product Manager',
        description: 'Lead product development from ideation to launch. Work closely with engineering, design, and marketing teams. 3+ years of product management experience required.',
        jobType: 'Full-time',
        location: 'Seattle, WA',
        jobAuthor: 'InnovateCo',
        remoteOk: true,
        applyUrl: 'https://example.com/apply/pm',
        userId: user.id,
      },
      {
        title: 'Frontend Developer',
        description: 'Part-time opportunity for a frontend developer with expertise in Vue.js and modern CSS. Perfect for students or freelancers looking for flexible work arrangements.',
        jobType: 'Part-time',
        location: 'Remote',
        jobAuthor: 'WebAgency',
        remoteOk: true,
        applyUrl: 'https://example.com/apply/frontend',
        userId: user.id,
      },
      {
        title: 'DevOps Engineer',
        description: 'Contract position for 6 months with possibility of extension. Experience with AWS, Docker, Kubernetes, and CI/CD pipelines required. Help us modernize our infrastructure.',
        jobType: 'Contract',
        location: 'Boston, MA',
        jobAuthor: 'CloudTech',
        remoteOk: false,
        applyUrl: 'https://example.com/apply/devops',
        userId: user.id,
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
