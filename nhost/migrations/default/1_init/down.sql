-- Drop triggers
DROP TRIGGER IF EXISTS "set_video_summaries_updated_at" ON "public"."video_summaries";
DROP TRIGGER IF EXISTS "set_user_preferences_updated_at" ON "public"."user_preferences";
DROP TRIGGER IF EXISTS "set_processing_queue_updated_at" ON "public"."processing_queue";

-- Drop function
DROP FUNCTION IF EXISTS "public"."set_updated_at"();

-- Drop tables
DROP TABLE IF EXISTS "public"."processing_queue";
DROP TABLE IF EXISTS "public"."user_preferences";
DROP TABLE IF EXISTS "public"."video_summaries";
