/*
  # Initial Schema Setup with Sample Data
  
  This migration:
  1. Creates the basic schema (tables)
  2. Enables RLS
  3. Creates policies
  4. Safely inserts sample data
*/

-- Create tables
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  student_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  credits integer NOT NULL DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  enrolled_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

CREATE TABLE IF NOT EXISTS performance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id) ON DELETE CASCADE,
  assessment_type text NOT NULL,
  score numeric NOT NULL CHECK (score >= 0 AND score <= 100),
  recorded_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to students"
  ON students FOR SELECT
  USING (true);

CREATE POLICY "Public read access to courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Public read access to enrollments"
  ON enrollments FOR SELECT
  USING (true);

CREATE POLICY "Public read access to performance records"
  ON performance_records FOR SELECT
  USING (true);

-- Insert sample data safely
DO $$
BEGIN
  -- Update or insert student
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

-- Insert or update courses
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