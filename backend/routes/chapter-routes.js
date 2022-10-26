const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  app.get("/chapters", (req, res) => {
    try {
      let query = `SELECT * FROM ed_chapter`;
      db.query(query, (err, resp) => {
        if (res) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 404,
        message: "An error occurred while retrieving the chapters",
      });
    }
  });

  app.get("/chapters/:id", (req, res) => {
    try {
      let query = `SELECT * FROM ed_chapter WHERE chapter_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while retrieving the chapter with that ID",
      });
    }
  });

  app.post("/chapters", (req, res) => {
    try {
      if (Object.entries(req.body).length === 0) {
        statusResponse(res);
      } else {
        let reqBody = req.body;
        if (reqBody.chapter_img === "") {
          reqBody.chapter_img = "no image";
        }
        let query = `INSERT INTO ed_chapter (
          course_id, 
          chapter_name, 
          chapter_desc, 
          chapter_img, 
          chapter_complexity, 
          chapter_prerequisites, 
          chapter_content
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(
          query,
          [
            reqBody.course_id,
            reqBody.chapter_name,
            reqBody.chapter_desc,
            reqBody.chapter_img,
            reqBody.chapter_complexity,
            reqBody.chapter_prerequisites,
            reqBody.chapter_content,
          ],
          (err, resp) => {
            if (resp) {
              res.status(200).json(resp);
            }
          }
        );
      }
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while creating the chapter",
      });
    }
  });

  app.patch("/chapters/:id", (req, res) => {
    try {
      const objToQuery = (requestObj) =>
        Object.entries(requestObj)
          .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
          .join(", ");
      let query = `UPDATE ed_chapter SET ${objToQuery(
        req.body
      )} WHERE chapter_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while trying to update the chapter",
      });
    }
  });

  app.delete("/chapters/:id", (req, res) => {
    try {
      let query = `DELETE FROM ed_chapter WHERE chapter_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occured while trying to delete the chapter",
      });
    }
  });
};
