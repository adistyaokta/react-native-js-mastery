PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_menus` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_menus`("id", "name", "price") SELECT "id", "name", "price" FROM `menus`;--> statement-breakpoint
DROP TABLE `menus`;--> statement-breakpoint
ALTER TABLE `__new_menus` RENAME TO `menus`;--> statement-breakpoint
PRAGMA foreign_keys=ON;