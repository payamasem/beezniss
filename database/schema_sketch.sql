CREATE DATABASE tavola_db;
USE tavola_db;

-- CREATE TABLE student (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	first_name VARCHAR(40) NOT NULL,
-- 	last_name VARCHAR(40) NOT NULL,
-- 	birthdate DATE NOT NULL,
-- 	parent_id INT NOT NULL,
-- 	teacher_id INT NOT NULL,
-- 	teacher_last_name VARCHAR(30), -- <–– this probably wont be necessary since will use joins
-- 	asthma BOOLEAN DEFAULT false,
-- 	allergy VARCHAR(100),
-- 	epiPen BOOLEAN DEFAULT false,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY(parent_id) REFERENCES parent(id),
-- 	FOREIGN KEY(teacher_id) REFERENCES staff(id)

-- );

-- CREATE TABLE parent (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	first_name VARCHAR(40) NOT NULL,
-- 	last_name VARCHAR(40) NOT NULL,
-- 	phone_number INT(7) NOT NULL,
-- 	username VARCHAR(24) NOT NULL,
-- 	password VARCHAR(24) NOT NULL,
-- 	student_id INT NOT NULL,
-- 	parentMedContent BOOLEAN DEFAULT false,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY(student_id) REFERENCES student(id)
-- );

-- CREATE TABLE staff (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	first_name VARCHAR(40) NOT NULL,
-- 	last_name VARCHAR(40) NOT NULL,
-- 	username VARCHAR(24) NOT NULL,
-- 	password VARCHAR(24) NOT NULL,
-- 	isAdmin BOOLEAN NOT NULL DEFAULT false,
-- 	isTeacher BOOLEAN NOT NULL DEFAULT false,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id)
-- );