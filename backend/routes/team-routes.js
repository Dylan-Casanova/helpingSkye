const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  // POSTS Team Member  INTO team_details TABLE //
  app.post("/teamdetails", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;
      let query = `INSERT INTO team_details (first_name, last_name, title, department, member_img)
    VALUES (?,?,?,?,?)`;
      db.query(
        query,
        [
          reqBody.first_name,
          reqBody.last_name,
          reqBody.title,
          reqBody.department,
          reqBody.member_img,
        ],
        (err, team) => {
          if (err) throw err;
          res.status(201).send({ status: 201, message: "Team Member Added!" });
        }
      );
    }
  });

  // GETS TEAM  DETAILS FOR ROSTER //
  app.get("/teamdetails", (req, res) => {
    let query = `SELECT * FROM team_details`;
    db.query(query, (err, team_details) => {
      if (err) throw err;
      if (team_details) {
        res.status(200).json(team_details);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  // POSTS TEAM MEMBER INTO mission_team TABLE //
  app.post("/addteam", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;
      let query = `INSERT INTO mission_team (member_id, mission_id) VALUES (?,?)`;
      db.query(query, [reqBody.member_id, reqBody.mission_id], (err, resp) => {
        if (err) throw err;
        res
          .status(201)
          .send({ status: 201, message: "Team Member Added To Mission!" });
      });
    }
  });

  // Get TEAM MEMBERS By MissionID with Details //
  app.get("/getteam/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN team_details WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, m_basics) => {
      if (err) throw err;
      if (m_basics) {
        res.json(m_basics);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  // DELETES Team Member FROM mission_team TABLE //
  app.delete("/deleteteam/:mission_id/:member_id", (req, res) => {
    let query = `DELETE FROM mission_team WHERE member_id = '${req.params.member_id}' AND mission_id = '${req.params.mission_id}'`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(200).send({ status: 200, message: "Team Member Deleted!" });
    });
  });
};
