/*
  # Sample Data for Student Dashboard

  1. Sample Data
    - Add a test student
    - Add sample courses
    - Create enrollments
    - Add performance records
*/

-- Insert test student
INSERT INTO students (id, full_name, email, student_id)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'John Doe', 'john.doe@example.com', 'STU001')
ON CONFLICT (id) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (code, name, description, credits)
VALUES 
  ('CS101', 'Introduction to Programming', 'Basic programming concepts', 3),
  ('MATH201', 'Calculus I', 'Fundamental calculus concepts', 4),
  ('PHY101', 'Physics I', 'Basic physics principles', 4),
  ('ENG101', 'English Composition', 'Academic writing skills', 3)
ON CONFLICT (code) DO NOTHING;

-- Create enrollments
WITH student AS (SELECT id FROM students LIMIT 1),
     course_ids AS (SELECT id FROM courses)
INSERT INTO enrollments (student_id, course_id)
SELECT student.id, course_ids.id
FROM student, course_ids
ON CONFLICT (student_id, course_id) DO NOTHING;

-- Add performance records
WITH enrollments_data AS (SELECT id FROM enrollments)
INSERT INTO performance_records (enrollment_id, assessment_type, score)
SELECT 
  id,
  'Midterm',
  floor(random() * 30 + 70)
FROM enrollments_data
ON CONFLICT DO NOTHING;