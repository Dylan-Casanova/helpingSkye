// This file's name needs to be change to lesson-routes.js, will do once done refactoring code.
const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  app.get("/lessons", (req, res) => {
    try {
      let query = `SELECT * FROM ed_lesson`;
      db.query(query, (err, resp) => {
        if (res) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 404,
        message: "An error occurred while retrieving the lessons",
      });
    }
  });
  app.get("/lessons/:id", (req, res) => {
    try {
      let query = `SELECT * FROM ed_lesson WHERE lesson_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while retrieving the lesson with that ID",
      });
    }
  });

  app.post("/lessons", (req, res) => {
    try {
      if (Object.entries(req.body).length === 0) {
        statusResponse(res);
      } else {
        let reqBody = req.body;
        if (reqBody.lesson_img === "") {
          reqBody.lesson_img = "no image";
        }

        let query = `INSERT INTO ed_lesson (
          lesson_order, 
          chapter_id, 
          course_id, 
          lesson_name, 
          lesson_desc, 
          lesson_img, 
          lesson_complexity, 
          lesson_content
          ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(
          query,
          [
            reqBody.lesson_order,
            reqBody.chapter_id,
            reqBody.course_id,
            reqBody.lesson_name,
            reqBody.lesson_desc,
            reqBody.lesson_img,
            reqBody.lesson_complexity,
            reqBody.lesson_content,
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
        message: "An error occurred while creating the new lesson",
      });
    }
  });

  app.patch("/lessons/:id", (req, res) => {
    try {
      const objToQuery = (requestObj) =>
        Object.entries(requestObj)
          .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
          .join(", ");
      let query = `UPDATE ed_lesson SET ${objToQuery(
        req.body
      )} WHERE lesson_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while updating that lesson",
      });
    }
  });

  app.delete("/lessons/:id", (req, res) => {
    try {
      let query = `DELETE FROM ed_lesson WHERE lesson_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while deleting that lesson",
      });
    }
  });
};
