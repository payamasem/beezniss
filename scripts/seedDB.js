
INSERT INTO Projects (name, due_date)
VALUES ('Cookie Testing Project', '2018-04-4');
INSERT INTO Projects (name, due_date)
VALUES ('Motor Efficiency Testing', '2018-04-26');
INSERT INTO Projects (name, due_date)
VALUES ('Project: Relax & Forget How to Code', '2018-04-20');


INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Connect some dots', 'Start at any dot', '2018-04-26', 1);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Eat cookies', 'Grab the cookie nearest you', '2018-04-26', 1);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('QA put a glove in a motor', 'Then see if it runs', '2018-04-26', 2);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Line up all the parts', 'Plenty of fleshed out details on how to do it', '2018-04-26', 2);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Is the work ever done...', 'Plenty of fleshed out details on how to do it', '2018-04-26', 3);

INSERT INTO Checklist_Items (text, task_id)
VALUES ('Check some boxes', 1);
INSERT INTO Checklist_Items (text, task_id)
VALUES ('Make things awesome', 2);
INSERT INTO Checklist_Items (text, task_id)
VALUES ('Check more boxes', 1);
INSERT INTO Checklist_Items (text, task_id)
VALUES ('Check some boxes', 4);
INSERT INTO Checklist_Items (text, task_id)
VALUES ('Fuss with minutiae', 3);
INSERT INTO Checklist_Items (text, task_id)
VALUES ('Check boxes already', 2);

INSERT INTO Users (first_name, username)
VALUES ('Payam', 'payamtrak');
INSERT INTO Users (first_name, username)
VALUES ('Tong Tong', 'unTungHero');
INSERT INTO Users (first_name, username)
VALUES ('Nydia', 'nini');
INSERT INTO Users (first_name, username)
VALUES ('Bill', 'andTheWindsorIs...');
INSERT INTO Users (first_name, username)
VALUES ('Ehler', 'supercoolusername777');

INSERT INTO Project_Users (project_id, user_id)
VALUES (1, 1);
INSERT INTO Project_Users (project_id, user_id)
VALUES (1, 2);
INSERT INTO Project_Users (project_id, user_id)
VALUES (1, 3);
INSERT INTO Project_Users (project_id, user_id)
VALUES (2, 4);
INSERT INTO Project_Users (project_id, user_id)
VALUES (2, 5);

INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (1, 1, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (1, 2, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (1, 3, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (2, 1, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (2, 3, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (5, 2, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (3, 4, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (3, 5, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (4, 4, '1856-09-20', '1898-12-12');
INSERT INTO Task_User (task_id, user_id, created_at, updated_at)
VALUES (5, 5, '1856-09-20', '1898-12-12');

INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
VALUES ('Chocolate Chip', '1000', '1100', '1200', '1300', '4600');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
VALUES ('Oatmeal Raisin', '1200', '1300', '1400', '1500', '5400');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
VALUES ('Snickerdoodle', '1400', '1500', '1600', '1700', '6200');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
VALUES ('Peanut Butter', '900', '1000', '1100', '1200', '4200'); 
 
INSERT INTO Motors (elecMotor_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('DC High-Power Motors', '1000', '1100', '1200', '1300', '4600');
INSERT INTO Motors (elecMotor_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('DC Stepper Motors', '1200', '1300', '1400', '1500', '5400');
INSERT INTO Motors (elecMotor_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('AC Torque Motors', '1400', '1500', '1600', '1700', '6200');
INSERT INTO Motors (elecMotor_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('AC Generator Motors', '900', '1000', '1100', '1200', '4100');


INSERT INTO RNAs (mitochonProduct_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Mitochondrial Enzymes', '1400', '1500', '1600', '1700', '6200');
INSERT INTO RNAs (mitochonProduct_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Photosynthetic Transport', '1000', '1100', '1200', '1300', '4600');
INSERT INTO RNAs (mitochonProduct_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Cell Replication Simulation', '1200', '1300', '1400', '1500', '5400');

