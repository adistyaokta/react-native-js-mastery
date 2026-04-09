CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`menu_id` text NOT NULL,
	`qty` integer NOT NULL,
	`price_at_time_of_sale` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`total_amount` integer NOT NULL,
	`status` text DEFAULT 'completed' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `menus` ADD `deleted_at` integer;--> statement-breakpoint
ALTER TABLE `menus` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `menus` ADD `updated_at` integer NOT NULL;