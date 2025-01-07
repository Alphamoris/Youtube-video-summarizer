-- Create VideoSummaries table
CREATE TABLE "public"."video_summaries" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "user_id" uuid NOT NULL,
    "video_url" text NOT NULL,
    "video_id" text NOT NULL,
    "title" text,
    "summary" text,
    "chapters" jsonb,
    "key_points" jsonb,
    "action_items" jsonb,
    "language" text DEFAULT 'en',
    "status" text DEFAULT 'pending',
    "error" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create UserPreferences table
CREATE TABLE "public"."user_preferences" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "user_id" uuid NOT NULL UNIQUE,
    "summary_type" text DEFAULT 'comprehensive',
    "preferred_language" text DEFAULT 'en',
    "email_notifications" boolean DEFAULT true,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create ProcessingQueue table
CREATE TABLE "public"."processing_queue" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "video_summary_id" uuid NOT NULL,
    "status" text DEFAULT 'pending',
    "priority" integer DEFAULT 1,
    "attempts" integer DEFAULT 0,
    "last_error" text,
    "processing_started_at" timestamptz,
    "processing_completed_at" timestamptz,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    FOREIGN KEY ("video_summary_id") REFERENCES "public"."video_summaries"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX "video_summaries_user_id_idx" ON "public"."video_summaries" ("user_id");
CREATE INDEX "video_summaries_video_id_idx" ON "public"."video_summaries" ("video_id");
CREATE INDEX "video_summaries_status_idx" ON "public"."video_summaries" ("status");
CREATE INDEX "processing_queue_status_idx" ON "public"."processing_queue" ("status");
CREATE INDEX "processing_queue_priority_idx" ON "public"."processing_queue" ("priority");

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION "public"."set_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_video_summaries_updated_at"
    BEFORE UPDATE ON "public"."video_summaries"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."set_updated_at"();

CREATE TRIGGER "set_user_preferences_updated_at"
    BEFORE UPDATE ON "public"."user_preferences"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."set_updated_at"();

CREATE TRIGGER "set_processing_queue_updated_at"
    BEFORE UPDATE ON "public"."processing_queue"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."set_updated_at"();
