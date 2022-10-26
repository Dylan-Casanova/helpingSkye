const statusResponse = require("./utils/requestHelper");

//ROUTES FOR THE ALL_DEFINITIONS TABLE

module.exports = function (app, db) {
  //INSERT a new object into the all_definitions table
  app.post("/definitions", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;

      let query = `INSERT INTO all_definitions (term, definition_text, definition_group, category, comments, definition_img) 
    VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(
        query,
        [
          reqBody.term,
          reqBody.definition_text,
          reqBody.definition_group,
          reqBody.category,
          reqBody.comments,
          reqBody.definition_img,
        ],
        (err, resp) => {
          if (err) throw err;
          if (resp) {
            res.status(201).send({ status: 201, data: resp });
          }
        }
      );
    }
  });

  //GET all definitions route
  app.get("/definitions", (req, res) => {
    let query = `SELECT * FROM all_definitions`;
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

  //GET a specific definition by id
  app.get("/definitions/:id", (req, res) => {
    let query = `SELECT * FROM all_definitions WHERE definition_id = "${req.params.id}"`;
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

  //UPDATE a definition based on id
  app.patch("/definitions/:id", (req, res) => {
    const objToQuery = (requestObj) =>
      Object.entries(requestObj)
        .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
        .join(", ");
    let query = `UPDATE all_definitions SET ${objToQuery(
      req.body
    )} WHERE definition_id = '${req.params.definition_id}'`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, data: resp });
    });
  });

  //DELETE specific object from the encylopedia table based on id
  app.delete("/definitions/:id", (req, res) => {
    let query = `DELETE FROM all_definitions WHERE definition_id = '${req.params.id}'`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res
        .status(200)
        .send({ status: 200, message: "Encylopedia entry deleted" });
    });
  });
};
