CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"ticket_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"ordered_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"stripe_payment_id" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "payments_stripe_payment_id_unique" UNIQUE("stripe_payment_id")
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100),
	"country" varchar(100) NOT NULL,
	"postal_code" varchar(20),
	"capacity" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_id_events_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "calendar" DROP CONSTRAINT "calendar_event_id_events_id_fk";
--> statement-breakpoint
ALTER TABLE "calendar" DROP CONSTRAINT "calendar_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "firebase_uid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "category" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(20) DEFAULT 'attendee';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_login" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "organisation_name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "website_url" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "social_links" json DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "preferences" json DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "start_date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "end_date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "virtual_link" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "capacity" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "thumbnail_image" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "ticket_type" varchar(30) DEFAULT 'general';--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "quantity" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "max_per_user" integer DEFAULT 10;--> statement-breakpoint
ALTER TABLE "calendar" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "date";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN "seat_number";--> statement-breakpoint
ALTER TABLE "calendar" DROP COLUMN "added_at";