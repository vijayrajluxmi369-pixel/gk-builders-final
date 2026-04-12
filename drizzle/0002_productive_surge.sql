CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientLocation` varchar(255) NOT NULL,
	`reviewText` text NOT NULL,
	`rating` int NOT NULL,
	`projectType` varchar(100) NOT NULL,
	`projectDescription` text,
	`clientImageUrl` text,
	`isApproved` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
