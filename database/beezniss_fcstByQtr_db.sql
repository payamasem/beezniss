DROP DATABASE IF EXISTS beezniss_fcstByQtr_db;
CREATE DATABASE beezniss_fcstByQtr_db;
USE beezniss_fcstByQtr_db;

CREATE TABLE beezniss_cookies_div
(
	cookie_id INT NOT NULL AUTO_INCREMENT,
	cookie_name VARCHAR(50) NOT NULL,
    Sales_1Q2018 INT(15),
    Sales_2Q2018 INT(15),    
    Sales_3Q2018 INT(15),
	Sales_4Q2018 INT(15),
    Sales_YearTotal_2018 INT(20),
	date DATE,
	PRIMARY KEY (cookie_id)
);

CREATE TABLE beezniss_elecMotors_div
(
	elecMotor_id INT NOT NULL AUTO_INCREMENT,
	elecMotor_name VARCHAR(50) NOT NULL,
    Sales_1Q2018 INT(15),
    Sales_2Q2018 INT(15),    
    Sales_3Q2018 INT(15),
	Sales_4Q2018 INT(15),
    Sales_YearTotal_2018 INT(20),
	date DATE,
	PRIMARY KEY (elecMotor_id)
);

CREATE TABLE beezniss_mitochonRNA_div
(
	mitochonProduct_id INT NOT NULL AUTO_INCREMENT,
	mitochonProduct_name VARCHAR(50) NOT NULL,
    Sales_1Q2018 INT(15),
    Sales_2Q2018 INT(15),    
    Sales_3Q2018 INT(15),
	Sales_4Q2018 INT(15),
    Sales_YearTotal_2018 INT(20),
	date DATE,
	PRIMARY KEY (mitochonProduct_id)
);