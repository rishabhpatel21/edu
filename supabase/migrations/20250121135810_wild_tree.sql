/*
  # Update Sample Data
  
  This migration updates the sample data while handling potential conflicts:
  1. Updates existing student data if it exists
  2. Adds new courses if they don't exist
  3. Creates enrollments for the student
  4. Adds performance records for enrollments
*/

-- Update or insert student
DO $$
BEGIN
  UPDATE students 
  SET 
    full_name = 'John Doe',
    student_id = 'STU001'
  WHERE email = 'john.doe@example.com';

  IF NOT FOUND THEN
    INSERT INTO students (id, full_name, email, student_id)
    VALUES ('d0d4d602-e3de-4c93-8f95-5ab8d86d6d56', 'John Doe', 'john.doe@example.com', 'STU001');
  END IF;
END $$;

-- Insert sample courses
INSERT INTO courses (code, name, description, credits)
VALUES 
  ('CS101', 'Introduction to Programming', 'Basic programming concepts', 3),
  ('MATH201', 'Calculus I', 'Fundamental calculus concepts', 4),
  ('PHY101', 'Physics I', 'Basic physics principles', 4),
  ('ENG101', 'English Composition', 'Academic writing skills', 3)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits;

-- Create enrollments for the student
INSERT INTO enrollments (student_id, course_id)
SELECT 
  s.id,
  c.id
FROM students s
CROSS JOIN courses c
WHERE s.email = 'john.doe@example.com'
ON CONFLICT (student_id, course_id) DO NOTHING;

-- Add performance records for each enrollment
INSERT INTO performance_records (enrollment_id, assessment_type, score)
SELECT 
  e.id,
  'Midterm',
  floor(random() * 30 + 70)
FROM enrollments e
JOIN students s ON e.student_id = s.id
WHERE s.email = 'john.doe@example.com'
  AND NOT EXISTS (
    SELECT 1 
    FROM performance_records pr 
    WHERE pr.enrollment_id = e.id
  );