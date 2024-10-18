/*
  Warnings:

  - You are about to drop the `chat_groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_groups" DROP CONSTRAINT "chat_groups_user_id_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_group_id_fkey";

-- DropForeignKey
ALTER TABLE "group_users" DROP CONSTRAINT "group_users_group_id_fkey";

-- DropTable
DROP TABLE "chat_groups";

-- CreateTable
CREATE TABLE "chatGroup" (
    "id" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(191) NOT NULL,
    "passcode" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chatGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chatGroup_created_at_idx" ON "chatGroup"("created_at");

-- AddForeignKey
ALTER TABLE "chatGroup" ADD CONSTRAINT "chatGroup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
