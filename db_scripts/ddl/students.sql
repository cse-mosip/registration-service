CREATE TABLE registrationrepo.students (
  index varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  faculty varchar(255) NOT NULL,
  CONSTRAINT pk_index PRIMARY KEY (index)
);
-- Add comment to the table
COMMENT ON TABLE registrationrepo.students IS 'Students table: Stores student information';

-- Add comment to the 'index' column
COMMENT ON COLUMN registrationrepo.students.index IS 'Index of the student';

-- Add comment to the 'email' column
COMMENT ON COLUMN registrationrepo.students.email IS 'Email address of the student';

-- Add comment to the 'first_name' column
COMMENT ON COLUMN registrationrepo.students.first_name IS 'First name of the student';

-- Add comment to the 'last_name' column
COMMENT ON COLUMN registrationrepo.students.last_name IS 'Last name of the student';

-- Add comment to the 'faculty' column
COMMENT ON COLUMN registrationrepo.students.faculty IS 'Faculty of the student';
