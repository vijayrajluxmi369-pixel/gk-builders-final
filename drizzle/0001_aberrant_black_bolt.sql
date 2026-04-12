CREATE TABLE `serviceContracts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientPhone` varchar(20) NOT NULL,
	`clientEmail` varchar(320) NOT NULL,
	`siteAddress` text NOT NULL,
	`projectType` enum('New Construction','Renovation','Material Supply') NOT NULL,
	`projectDescription` text,
	`estimatedBudget` varchar(50) NOT NULL,
	`projectStartDate` timestamp NOT NULL,
	`agreedToTerms` int NOT NULL DEFAULT 0,
	`status` enum('pending','reviewed','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `serviceContracts_id` PRIMARY KEY(`id`)
);
