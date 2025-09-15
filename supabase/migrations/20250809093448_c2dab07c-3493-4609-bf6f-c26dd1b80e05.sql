-- Make the videos bucket public for direct access
UPDATE storage.buckets 
SET public = true 
WHERE id = 'videos';