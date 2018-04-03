const mysql = require("mysql2");
const db = require("../models");

 
var connection = mysql.createConnection(
    {
      host     : "127.0.0.1",
      user     : 'root',
      password : '',
      database : 'beezniss_db'
    }
);
 
connection.connect();
 
var queryString = "INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) \n";
queryString += "VALUES ('Chocolate Chip', '1000', '1100', '1200', '1300', '4600'); "
queryString += "INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) \n"
queryString += "VALUES ('Oatmeal Raisin', '1200', '1300', '1400', '1500', '5400'); "
queryString += "INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) \n"
queryString += "VALUES ('Snickerdoodle', '1400', '1500', '1600', '1700', '6200'); "
queryString += "INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018) \n"
queryString += "VALUES ('Peanut Butter', '900', '1000', '1100', '1200', '4200'); ";
 
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Seeded cookie names: ', rows[i].cookie_name);
    }
});
 
connection.end();


INSERT INTO Tasks (heading, description)
VALUES ('git routes to work!!', 'ASAP');

INSERT INTO Tasks (heading, description)
VALUES ('git data to flow!', 'ASAP.. like yesterday');

// INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
// VALUES ('Chocolate Chip', '1000', '1100', '1200', '1300', '4600');
// INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
// VALUES ('Oatmeal Raisin', '1200', '1300', '1400', '1500', '5400');
// INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
// VALUES ('Snickerdoodle', '1400', '1500', '1600', '1700', '6200');
// INSERT INTO Cookies (cookie_name, Sales_1Q2018, Sales_2Q2018, Sales_3Q2018, Sales_4Q2018, Sales_YearTotal_2018)
// VALUES ('Peanut Butter', '900', '1000', '1100', '1200', '4200'); 
//  

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

