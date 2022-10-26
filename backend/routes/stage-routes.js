module.exports = function (app, db) {
  app.post("/missionstage", (req, res) => {
    let query = `INSERT INTO mission_stagelist (stage_id, mission_id) 
    VALUES ('${req.body.stage_id}', '${req.body.mission_id}')`;
    db.query(query, (err, stage) => {
      if (err) throw err;
      if (stage) {
        res.status(200).json(stage);
      }
    });
  });

  app.get("/missionstageAll/:id", (req, res) => {
    let query = `SELECT * FROM mission_stagelist WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, selectedStage) => {
      if (err) throw err;
      if (selectedStage) {
        res.status(200).json(selectedStage);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.delete("/deletestage/:mission_id/:stage_id", (req, res) => {
    let query = `DELETE FROM mission_stagelist WHERE stage_id = '${req.params.stage_id}' AND mission_id = '${req.params.mission_id}'`;
    db.query(query, (err, stage) => {
      if (err) throw err;
      if (stage) {
        res.status(200).json(stage);
      }
    });
  });

  app.get("/stagedetails/:id", (req, res) => {
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

  app.get("/stagedetails", (req, res) => {
    let query = `SELECT * FROM stage_details`;
    db.query(query, (err, stage_details) => {
      if (err) throw err;
      if (stage_details) {
        res.status(200).json(stage_details);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.post("/stagedetails", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;

      let query = `INSERT INTO stage_details (stage_name, stage_desc, stage_img) 
      VALUES (?, ?, ?)`;
      db.query(
        query,
        [reqBody.stage_name, reqBody.stage_desc, reqBody.stage_img],
        (err, stage_details) => {
          if (err) throw err;
          if (stage_details) {
            res.status(201).json(stage_details);
          }
        }
      );
    }
  });
};
