CREATE DATABASE beeziniss_db;
USE beeziniss_db;

-- CREATE TABLE user (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	first_name VARCHAR(40) NOT NULL,
-- 	last_name VARCHAR(40) NOT NULL,
--  task_id INT NOT NULL,
--  checklist_id INT NOT NULL,
--  project_id INT NOT NULL,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id),
--  FOREIGN KEY(task_id) REFERENCES user(task_id),
-- 	FOREIGN KEY(checklist_id) REFERENCES user(task_id),
-- 	FOREIGN KEY(project_id) REFERENCES user(task_id)

-- );

-- CREATE TABLE task (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	heading VARCHAR(40) NOT NULL,
-- 	description VARCHAR(40) NOT NULL,
-- 	due_date DATE_ADD(date, INTERVAL value unit),
-- 	checklist_item BOOLEAN DEFAULT false,
--  user_id INT NOT NULL,
--  checklist_id INT NOT NULL,
--  project_id INT NOT NULL,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY(user_id) REFERENCES user(id),
-- 	FOREIGN KEY(checklist_id) REFERENCES user(task_id),
-- 	FOREIGN KEY(project_id) REFERENCES user(task_id)
-- );

-- CREATE TABLE checklist(
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	title VARCHAR(30) NOT NULL,
-- 	completed BOOLEAN DEFAULT false,
-- 	due_date DATE_ADD(date, INTERVAL value unit),
--  user_id INT NOT NULL,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY(user_id) REFERENCES user(id)
-- );

-- CREATE TABLE project (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	title VARCHAR(40) NOT NULL,
-- 	due_date DATE_ADD(date, INTERVAL value unit),
-- 	checklist_item BOOLEAN DEFAULT false,
--  user_id INT NOT NULL,
--  checklist_id INT NOT NULL,
--  project_id INT NOT NULL,
-- 	date TIMESTAMP,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY(user_id) REFERENCES user(id),
-- 	FOREIGN KEY(checklist_id) REFERENCES user(task_id),
-- 	FOREIGN KEY(project_id) REFERENCES user(task_id)
-- );


