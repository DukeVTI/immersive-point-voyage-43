-- Create RLS policies for the videos storage bucket
-- First, ensure public read access to videos bucket
CREATE POLICY "Public Access to Videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');

-- Allow public access to download videos
CREATE POLICY "Public Download Videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');