-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL DEFAULT 'John Christian Rosuelo',
    "skills" TEXT[] DEFAULT ARRAY['Kotlin', 'Java', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Git', 'GitHub', 'HTML', 'CSS', 'Tailwind CSS']::TEXT[],
    "about" TEXT NOT NULL DEFAULT 'Hello',
    "job" TEXT NOT NULL DEFAULT 'Software Developer',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
