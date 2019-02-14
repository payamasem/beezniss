DROP DATABASE IF EXISTS beezniss_forecast_db;
CREATE DATABASE beezniss_forecast_db;
USE beezniss_forecast_db;

CREATE TABLE beezniss_cookies_div  -- table now named "Cookies"
(
	cookie_id INT NOT NULL AUTO_INCREMENT,
	cookie_name VARCHAR(50) NOT NULL,
    Sales_1Q2018 INT(8),
    Sales_2Q2018 INT(8),    
    Sales_3Q2018 INT(8),
	Sales_4Q2018 INT(8),
    Sales_YearTotal_2018 INT(10),
	date DATETIME,
	PRIMARY KEY (cookie_id)
);

CREATE TABLE beezniss_elecMotors_div -- table now named "Motors"
(
	elecMotor_id INT NOT NULL AUTO_INCREMENT,
	elecMotor_name VARCHAR(50) NOT NULL,
    Sales_1Q2018 INT(8),
    Sales_2Q2018 INT(8),    
    Sales_3Q2018 INT(8),
	Sales_4Q2018 INT(8),
    Sales_YearTotal_2018 INT(10),
	date DATETIME,
	PRIMARY KEY (elecMotor_id)
);


CREATE TABLE beezniss_mitochonRNA_div -- table now named "RNAs"
(
	mitochonProduct_id INT NOT NULL AUTO_INCREMENT,
	mitochonProduct_name VARCHAR(50) NOT NULL,
    Sales_1Q2018 INT(8),
    Sales_2Q2018 INT(8),    
    Sales_3Q2018 INT(8),
	Sales_4Q2018 INT(8),
    Sales_YearTotal_2018 INT(10),
	date DATETIME,
	PRIMARY KEY (mitochonProduct_id)
);

--###############
--########## COPY all here below and PASTE into sql workbench to seed into the database 
--###############

INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Chocolate Chip', '2000', '2100', '2200', '2300', '8600');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Oatmeal Raisin', '1200', '1300', '1400', '1500', '5400');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Snickerdoodle', '1400', '1500', '1600', '1700', '6200');
INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) 
 VALUES ('Peanut Butter', '900', '1000', '1100', '1200', '4100');

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
