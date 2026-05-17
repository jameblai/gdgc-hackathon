DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text;--> statement-breakpoint
WITH candidate_usernames AS (
	SELECT
		"id",
		LEFT(NULLIF(REGEXP_REPLACE(LOWER(SPLIT_PART("email", '@', 1)), '[^a-z0-9_]+', '_', 'g'), ''), 20) AS "base_username"
	FROM "users"
),
numbered_usernames AS (
	SELECT
		"id",
		COALESCE("base_username", 'user') AS "base_username",
		COUNT(*) OVER (PARTITION BY COALESCE("base_username", 'user')) AS "duplicate_count",
		ROW_NUMBER() OVER (PARTITION BY COALESCE("base_username", 'user') ORDER BY "id") AS "duplicate_index"
	FROM candidate_usernames
)
UPDATE "users"
SET "username" = CASE
	WHEN numbered_usernames."duplicate_count" = 1 THEN numbered_usernames."base_username"
	ELSE LEFT(numbered_usernames."base_username", 17) || '_' || numbered_usernames."duplicate_index"
END
FROM numbered_usernames
WHERE "users"."id" = numbered_usernames."id";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "date_of_birth" date;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "occupation" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "company" text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE TABLE "user_domains" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"domain" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_domains" ADD CONSTRAINT "user_domains_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_domains_user_id_idx" ON "user_domains" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_domains_user_id_domain_unique" ON "user_domains" USING btree ("user_id","domain");--> statement-breakpoint
CREATE UNIQUE INDEX "users_name_unique" ON "users" USING btree ("username");
