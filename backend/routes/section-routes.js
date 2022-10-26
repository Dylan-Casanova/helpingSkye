const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  app.get("/sections", (req, res) => {
    try {
      let query = `SELECT * FROM ed_section`;
      db.query(query, (err, resp) => {
        if (res) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 404,
        message: "An error occurred while retrieving the sections",
      });
    }
  });

  app.get("/sections/:id", (req, res) => {
    try {
      let query = `SELECT * FROM ed_section WHERE section_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while retrieving the section with that ID",
      });
    }
  });

  app.post("/sections", (req, res) => {
    try {
      if (Object.entries(req.body).length === 0) {
        statusResponse(res);
      } else {
        let reqBody = req.body;
        if (reqBody.section_img === "") {
          reqBody.section_img = "no image";
        }

        let query = `INSERT INTO ed_section (
          section_order, 
          lesson_id, 
          chapter_id, 
          course_id, 
          section_name, 
          section_desc, 
          section_content,
          section_img, 
          is_essential
          ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(
          query,
          [
            reqBody.section_order,
            reqBody.lesson_id,
            reqBody.chapter_id,
            reqBody.course_id,
            reqBody.section_name,
            reqBody.section_desc,
            reqBody.section_content,
            reqBody.section_img,
            reqBody.is_essential,
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
        message: "An error occurred while creating the new section",
      });
    }
  });

  app.patch("/sections/:id", (req, res) => {
    try {
      const objToQuery = (requestObj) =>
        Object.entries(requestObj)
          .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
          .join(", ");
      let query = `UPDATE ed_section SET ${objToQuery(
        req.body
      )} WHERE section_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while updating that section",
      });
    }
  });

  app.delete("/sections/:id", (req, res) => {
    try {
      let query = `DELETE FROM ed_section WHERE section_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while deleting that section",
      });
    }
  });
};
