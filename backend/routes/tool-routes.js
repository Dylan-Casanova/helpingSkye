const statusResponse = require("./utils/requestHelper");

module.exports = function (app, db) {
  /* Inserts a new tool into the tool_details table  */
  app.post("/tooldetails", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;
      let query = `INSERT INTO tool_details (tool_name, tool_category, tool_description, tool_img)
       VALUES (?,?,?,?)`;

      db.query(
        query,
        [
          reqBody.tool_name,
          reqBody.tool_category,
          reqBody.tool_description,
          reqBody.too_img,
        ],
        (err, resp) => {
          if (err) throw err;
          res.status(201).send({ status: 201, message: "Tool added!" });
        }
      );
    }
  });

  // Selects All Tools from the tool_details table //
  app.get("/tooldetails", (req, res) => {
    let query = `SELECT * from tool_details`;
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

  // GETS TOOLS BY MISSION ID BUT NO DETAILS //
  app.get("/missiontoolsAll/:id", (req, res) => {
    let query = `SELECT * from mission_toolslist WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, selectedTools) => {
      if (err) throw err;
      if (selectedTools) {
        res.status(200).json(selectedTools);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  // POSTS TOOLS INTO mission_toolslist TABLE //
  app.post("/missiontools", (req, res) => {
    let query = `INSERT INTO mission_toolslist (tool_id, mission_id)
       VALUES ('${req.body.tool_id}', '${req.body.mission_id}')`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, message: "Tools added!" });
    });
  });

  // DELETES TOOLS FROM mission_toolslist TABLE //
  app.delete("/missiontools/:mission_id/:tool_id", (req, res) => {
    let query = `DELETE FROM mission_toolslist WHERE tool_id = '${req.params.tool_id}' AND mission_id = '${req.params.mission_id}'`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(200).send({ status: 200, message: "Tools deleted!" });
    });
  });

  // GETS a mission (w/ its tools) by id
  app.get("/basics/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN tool_details WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, selectedMission) => {
      if (err) throw err;
      if (selectedMission) {
        res.status(200).json(selectedMission);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  // Get TEAM MEMBERS By MissionID with Details //
  app.get("/gettools/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN team_details WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, filteredTeamMembers) => {
      if (err) throw err;
      if (filteredTeamMembers) {
        res.status(200).json(filteredTeamMembers);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });
};
