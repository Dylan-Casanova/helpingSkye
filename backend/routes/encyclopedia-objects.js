const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  //INSERT a new object into the encyclopedia table
  app.post("/encyclopedia", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;

      let query = `INSERT INTO encyclopedia_objects (object_type, object_description, object_img, object_ext_link, parent_level_1, parent_level_2, parent_level_3, parent_level_4) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        query,
        [
          reqBody.object_type,
          reqBody.object_description,
          reqBody.object_img,
          reqBody.object_ext_link,
          reqBody.parent_level_1,
          reqBody.parent_level_2,
          reqBody.parent_level_3,
          reqBody.parent_level_4,
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

  //GET all objects in the encyclopedia table
  app.get("/encyclopedia", (req, res) => {
    let query = `SELECT * FROM encyclopedia_objects`;
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

  //GET an object based on object_id
  app.get("/encyclopedia/:id", (req, res) => {
    let query = `SELECT * FROM encyclopedia_objects WHERE object_id = "${req.params.id}"`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      if (resp) {
        res.status(200).json(resp);
      }
      {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  //UPDATE an object in the encyclopedia table based on id
  app.patch("/encyclopedia/:id", (req, res) => {
    const objToQuery = (requestObj) =>
      Object.entries(requestObj)
        .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
        .join(", ");
    let query = `UPDATE encyclopedia_objects SET ${objToQuery(
      req.body
    )} WHERE object_id = ${req.params.id}`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, data: resp });
    });
  });

  //DELETE specific object from the encylopedia table based on id
  app.delete("/encyclopedia/:id", (req, res) => {
    let query = `DELETE FROM encyclopedia_objects WHERE object_id = ${req.params.id}`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res
        .status(200)
        .send({ status: 200, message: "Encylopedia entry deleted" });
    });
  });

  // GET that JOINS all columns from a_object_translation
  // with all columns from encyclopedia_objects WHERE object_id is the same
  app.get("/encyclopedia-translations/:id", (req, res) => {
    let query = `SELECT *
    FROM encyclopedia_objects
    JOIN a_object_translation
    WHERE a_object_translation.object_id=${req.params.id} AND encyclopedia_objects.object_id=${req.params.id}`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      if (resp) {
        res.status(200).json(resp);
      } else {
        res.status(404).send({
          status: 404,
          message: "request didn't yield any response",
        });
      }
    });
  });
};
