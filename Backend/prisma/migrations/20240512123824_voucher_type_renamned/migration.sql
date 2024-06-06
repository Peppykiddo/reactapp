/*
  Warnings:

  - You are about to drop the column `VchType` on the `emd` table. All the data in the column will be lost.
  - Added the required column `VoucherType` to the `emd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emd` DROP COLUMN `VchType`,
    ADD COLUMN `VoucherType` VARCHAR(191) NOT NULL;
