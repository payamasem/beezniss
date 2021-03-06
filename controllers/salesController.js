const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Cookie.findAll().then(cookieData => {
      db.Motor.findAll().then(motorData => {
        db.RNA.findAll().then(RNAdata => {
          let salesData = {
            cookies: cookieData,
            motors: motorData,
            RNA: RNAdata, 
          };
          res.json(salesData);
        });
      });
    })
    .catch(err => res.status(422).json(err).console.log(err));
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
