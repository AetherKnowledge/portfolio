-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'john@example.com',
ADD COLUMN     "github" TEXT NOT NULL DEFAULT 'https://github.com/john',
ADD COLUMN     "linkedin" TEXT NOT NULL DEFAULT 'https://linkedin.com/in/john';
