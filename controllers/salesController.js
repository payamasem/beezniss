const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("findAll in salesController triggered");
    db.Cookie.findAll().then(cookieData => {
      console.log("db.Cookie findAll res data: \n", data[0].dataValues);
      // db.Motor.findAll().then(motorData => {
      //   db.RNA.findAll().then(RNAdata => {
      //     let salesData = {
      //       cookies: cookieData,
      //       motors: motorData,
      //       RNA: RNAdata, 
      //     };
      //     console.log('salesData to be res.jsond: ', salesData);
      //     res.json(salesData);
      //   });
      // });
      res.json(cookieData);
    })
    .catch(err => res.status(422).json(err));
  },




  createCookie: function(req, res) {
    console.log("salesController ––> req.body to be used for creating new: ", req.body);
    db.Cookie
      .create({
        cookie_name: req.body.heading,
        Sales_1Q2018: req.body.Sales_1Q2018,
        Sales_2Q2018: req.body.Sales_2Q2018,
        Sales_3Q2018: req.body.Sales_3Q2018,
        Sales_4Q2018: req.body.Sales_4Q2018,
        Sales_YearTotal_2018: req.body.Sales_YearTotal_2018,
        last_modified: Date.now()
      })
      .then(data => res.json(data))
      .catch(err => {
        console.log("salesController ––> the .catch: ", err);
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.Cookie
      .update({
          cookie_name: req.body.heading,
          Sales_1Q2018: req.body.Sales_1Q2018,
          Sales_2Q2018: req.body.Sales_2Q2018,
          Sales_3Q2018: req.body.Sales_3Q2018,
          Sales_4Q2018: req.body.Sales_4Q2018,
          Sales_YearTotal_2018: req.body.Sales_YearTotal_2018,
          last_modified: Date.now()
        }, { 
          where: {
            id: req.params.id
          }
        })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Cookie
      .destroy({ 
        where: { 
          id: req.params.id 
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
};
