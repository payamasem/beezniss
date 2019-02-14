INSERT INTO Projects (name, due_date)
VALUES ('Cookie Testing Project', '2018-04-20');
INSERT INTO Projects (name, due_date)
VALUES ('Motor Asembly Efficiency Analysis Project', '2018-04-26');
INSERT INTO Projects (name, due_date)
VALUES ('Project: Relax & Forget How to Code', '2018-05-21');

INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Connect some dots', 'Plenty of fleshed out details on the connecting of dots', '2018-04-20', 1);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Connect more dots', 'Plenty of fleshed out details on drawing lines between dots', '2018-04-22', 1);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('QA: put a glove in a motor', 'Plenty of fleshed out details of the task', '2018-04-20', 2);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Line up all the parts', 'Plenty of fleshed out details of the task', '2018-04-20', 2);
INSERT INTO Tasks (heading, description, due_date, project_id)
VALUES ('Is the work never done..', 'Plenty of fleshed out details of the task', '2018-04-10', 3);

INSERT INTO Checklist_Items (text, task_id, due_date)
VALUES ('Check some boxes', 1);
INSERT INTO Checklist_Items (text, task_id, due_date)
VALUES ('Make things awesome', 2);
INSERT INTO Checklist_Items (text, task_id, due_date)
VALUES ('Check the rest of the boxes', 1);
INSERT INTO Checklist_Items (text, task_id, due_date)
VALUES ('Check some boxes', 4);
INSERT INTO Checklist_Items (text, task_id, due_date)
VALUES ('Check some boxes', 3);
INSERT INTO Checklist_Items (text, task_id, due_date)
VALUES ('Fuss with minutiae', 2);


INSERT INTO Project_Users
    (project_id, user_id)
VALUES 
    (1, 1); 
INSERT INTO Project_Users
    (project_id, user_id)
VALUES (1, 2); 
INSERT INTO Project_Users
    (project_id, user_id)
VALUES (1, 3); 
INSERT INTO Project_Users
    (project_id, user_id)
VALUES (2, 4); 
INSERT INTO Project_Users
    (project_id, user_id)
VALUES (2, 5); 
INSERT INTO Project_Users
    (project_id, user_id)
VALUES (2, 2);

INSERT INTO Task_User
    (task_id, user_id);
VALUES 
    (1, 1); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (1, 2); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (1, 3); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (2, 1); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (2, 3); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (5, 2); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (3, 4); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (3, 5); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (4, 4); 
INSERT INTO Task_User
    (task_id, user_id);
VALUES (5, 5);


INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Chocolate Chip', '2050', '2100', '2200', '2300', '8550');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Oatmeal Raisin', '1200', '1300', '1400', '1500', '5400');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Snickerdoodle', '1400', '1500', '1600', '1700', '6200');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Peanut Butter', '900', '1000', '1100', '1150', '4150');



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
