const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  app.get("/courses", (req, res) => {
    try {
      let selectors;
      if (req) {
        if (req.query && req.query.columns) {
          selectors = req.query.columns;
        } else {
          selectors = "*";
        }
      } else {
        res.status(400).send({
          status: 404,
          message: "An error occurred while retrieving the courses",
        });
      }
      let query = `SELECT ${selectors} FROM ed_courses`;
      db.query(query, (err, resp) => {
        if (res) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 404,
        message: "An error occurred while retrieving the courses",
      });
    }
  });

  app.get("/courses/:id", (req, res) => {
    try {
      let query = `SELECT * FROM ed_courses WHERE course_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while retrieving the course with that ID",
      });
    }
  });

  app.post("/courses", (req, res) => {
    try {
      if (Object.entries(req.body).length === 0) {
        statusResponse(res);
      } else {
        let reqBody = req.body;
        if (reqBody.course_img === "") {
          reqBody.course_img = "no image";
        }

        let query = `INSERT INTO ed_courses (
          course_name, 
          course_desc, 
          course_img,
          course_complete_hours,
          complexity_level, 
          course_content
            ) 
    VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(
          query,
          [
            reqBody.course_name,
            reqBody.course_desc,
            reqBody.course_img,
            reqBody.course_complete_hours,
            reqBody.complexity_level,
            reqBody.course_content,
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
        message: "An error occurred while creating the new course",
      });
    }
  });

  app.patch("/courses/:id", (req, res) => {
    try {
      const objToQuery = (requestObj) =>
        Object.entries(requestObj)
          .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
          .join(", ");
      let query = `UPDATE ed_courses SET ${objToQuery(
        req.body
      )} WHERE course_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while updating the course",
      });
    }
  });
 
  app.delete("/courses/:id", (req, res) => {
    try {
      let query = `DELETE FROM ed_courses WHERE course_id = '${req.params.id}'`;
      db.query(query, (err, resp) => {
        if (resp) {
          res.status(200).json(resp);
        }
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "An error occurred while deleting that course",
      });
    }
  });
};
