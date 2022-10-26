const moment = require("moment");
const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  app.get("/missiontools/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN tool_details WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, m_basics) => {
      if (err) throw err;
      if (m_basics) {
        res.status(200).json(m_basics);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/missionstages/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN stage_details WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, stage) => {
      if (err) throw err;
      if (stage) {
        res.status(200).json(stage);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  //INSERT a new mission into the mission_basics table
  //question -- how is last_last user being post to the table?
  app.post("/missionbasics", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;

      let query = `INSERT INTO mission_basics (status, name, category, summary, pm_url, start_date, end_date, mission_img, description) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        query,
        [
          reqBody.status,
          reqBody.name,
          reqBody.category,
          reqBody.summary,
          reqBody.pm_url,
          moment().format(reqBody.start_date),
          moment().format(reqBody.end_date),
          reqBody.mission_img,
          reqBody.description,
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

  //GET all missions from mission_basics
  app.get("/missionbasics", (req, res) => {
    let query = `SELECT * FROM mission_basics`;
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

  //GET a specific mission from mission_basics by id
  app.get("/missionbasics/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics WHERE mission_id = "${req.params.id}"`;
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

  //UPDATE a mission_basics mission based on id
  app.patch("/missionbasics/:id", (req, res) => {
    const objToQuery = (requestObj) =>
      Object.entries(requestObj)
        .map(([k, v]) => `${k}= ` + (typeof v === "number" ? v : `"${v}"`))
        .join(", ");
    let query = `UPDATE mission_basics SET ${objToQuery(
      req.body
    )} WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, data: resp });
    });
  });

  //DELETE specific mission from mission_basics table based on id
  app.delete("/missionbasics/:id", (req, res) => {
    let query = `DELETE FROM mission_basics WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res
        .status(200)
        .send({ status: 200, message: "mission_basics entry deleted" });
    });
  });

  app.get("/basics", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN tool_details`;
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

  app.get("/gtools", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN tool_details`;
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/gequip", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN equipment_details`;
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/gteam", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN team_details`;
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/gstage", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN stage_details`;
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/gstoryboards", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN mission_storyboard`;
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/gsteps", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN mission_steplist`;
    db.query(query, (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });
};
