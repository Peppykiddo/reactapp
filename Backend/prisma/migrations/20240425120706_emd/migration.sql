-- CreateTable
CREATE TABLE `EMD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date` DATETIME(3) NOT NULL,
    `VchType` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `URNNumber` VARCHAR(191) NOT NULL,
    `StatusOfRefunded` VARCHAR(191) NOT NULL,
    `RefundedDate` DATETIME(3) NOT NULL,
    `NPNumbers` VARCHAR(191) NOT NULL,
    `PartyName` VARCHAR(191) NOT NULL,
    `NameOfWork` VARCHAR(191) NOT NULL,
    `Section` VARCHAR(191) NOT NULL,
    `Remarks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
