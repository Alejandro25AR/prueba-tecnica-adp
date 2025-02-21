CREATE DATABASE hua_school;

USE hua_school;

CREATE TABLE professors (
  id INT NOT NULL,
  user_id VARCHAR(24) UNIQUE,
  name VARCHAR(50),
  url_image VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE professional_titles (
  id_professor INT NOT NULL,
  title VARCHAR(100),
  institution VARCHAR(255),
  PRIMARY KEY (id_professor, title),
  FOREIGN KEY (id_professor) REFERENCES professors(id)
);

CREATE TABLE students (
  id INT NOT NULL,
  user_id VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(50),
  grade INT NOT NULL, 
  biological_sex ENUM('Female', 'Male'),
  PRIMARY KEY (id),
  CHECK (grade BETWEEN 6 AND 11)
);

CREATE TABLE subjects (
  id INT NOT NULL,
  name VARCHAR(50),
  description VARCHAR(100),
  grade_required INT,
  CHECK (grade_required BETWEEN 6 AND 11),
  PRIMARY KEY (id)
);

CREATE TABLE offers (
  launch_year YEAR NOT NULL,
  id_group INT NOT NULL,
  id_subject INT NOT NULL,
  id_professor INT NOT NULL,
  places_availables INT DEFAULT 10,
  PRIMARY KEY (launch_year, id_group, id_subject),
  FOREIGN KEY (id_subject) REFERENCES subjects(id),
  FOREIGN KEY (id_professor) REFERENCES professors(id)
);

CREATE TABLE students_offers (
  id_student INT NOT NULL,
  launch_year_offer YEAR NOT NULL,
  id_group_offer INT NOT NULL,
  id_subject_offer INT NOT NULL,
  UNIQUE (id_student,launch_year_offer, id_subject_offer),
  PRIMARY KEY(id_student, launch_year_offer, id_group_offer, id_subject_offer),
  FOREIGN KEY(id_student) REFERENCES students(id),
  FOREIGN KEY(
    launch_year_offer, id_group_offer,id_subject_offer
  )REFERENCES offers(launch_year, id_group, id_subject)
);

INSERT INTO students_offers (id_student,launch_year_offer,id_group_offer,id_subject_offer) VALUES 
  (10001, 2025,1,103),
  (10001, 2025,2,111);