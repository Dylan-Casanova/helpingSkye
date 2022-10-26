const statusResponse = require("./utils/requestHelper");

module.exports = function (app) {
  // GETS STEPS BY MISSION ID  //
  app.get("/getsteps/:id", (req, res) => {
    let query = `SELECT * FROM mission_stepslist WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, steps) => {
      if (err) throw err;
      if (steps) {
        res.status(200).json(steps);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  //Get from step_details
  app.get("/stepdetails", (req, res) => {
    let query = `SELECT * FROM mission_stepslist`;
    db.query(query, (err, stepdetails) => {
      if (err) throw err;
      if (stepdetails) {
        res.status(200).json(stepdetails);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  //Post to step_details
  app.post("/poststeps", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;
      let query = `INSERT INTO mission_stepslist (step_order, step_text, step_img, mission_id)
      VALUES (?,?,?,?)`;
      db.query(
        query,
        [
          reqBody.step_order,
          reqBody.step.text,
          reqBody.step_img,
          reqBody.mission_id,
        ],
        (err, resp) => {
          if (err) throw err;
          res.status(201).send({ status: 201, message: "Steps Added!" });
        }
      );
    }
  });
};
