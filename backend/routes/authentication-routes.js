const bcrypt = require("bcryptjs");
const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  app.post("/login", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      const username = req.body.username;
      const password = req.body.password;

      db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
          if (err) {
            res.status(404).send({ status: 404, err: err });
          }

          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (response) {
                req.session.user = result;
                res.status(200).send({ status: 200, result });
              } else {
                res.status(403).send({
                  status: 403,
                  message: "Wrong username/password combination!",
                });
              }
            });
          } else {
            res
              .status(404)
              .send({ status: 404, message: "User doesn't exist" });
          }
        }
      );
    }
  });

  app.get("/login", (req, res) => {
    if (err) throw err;
    if (req.session.user) {
      res.status(200).json(res);
    } else {
      res
        .status(404)
        .send({ status: 404, message: "request didn't yield any response" });
    }
  });

  //GET all registered users
  app.get("/register", (req, res) => {
    let query = "SELECT * FROM users";
    db.query(query, (err, resp) => {
      if (err) throw err;
      if (resp) {
        res.status(200).json(resp);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  //POST a new registered user
  app.post("/register", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      const reqBody = req.body;
      const saltRounds = 10;

      bcrypt.hash(reqBody.password, saltRounds, (err, hash) => {
        if (err) {
          res.send(err);
        }

        db.query(
          "INSERT INTO users (username, password, email, fName, lName, title) VALUES (?,?,?,?,?,?)",
          [
            reqBody.username,
            hash,
            reqBody.email,
            reqBody.fName,
            reqBody.lName,
            reqBody.title,
          ],
          (err, resp) => {
            if (err) throw err;
            if (resp) {
              res.status(201).send({ status: 201, data: resp });
            }
          }
        );
      });
    }
  });
};
