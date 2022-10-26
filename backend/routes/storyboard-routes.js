module.exports = function (app, db) {
  app.get("/getstoryboards/:id", (req, res) => {
    let query = `SELECT * FROM mission_storyboard WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, storyboards) => {
      if (err) throw err;
      if (storyboards) {
        res.status(200).json(storyboards);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/b_storyboards/:id", (req, res) => {
    let query = `SELECT * FROM mission_storyboard WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, basics) => {
      if (err) throw err;
      if (basics) {
        res.status(200).json(basics);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.get("/sdetails", (req, res) => {
    let query = `SELECT * FROM mission_storyboard`;
    db.query(query, (err, storyboard) => {
      if (err) throw err;
      if (storyboard) {
        res.status(200).json(storyboard);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  app.post("/poststoryboards", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;
      let query = `INSERT INTO mission_storyboard (panel_order, panel_notes, color_and_style, panel_img, missionBasicMissionId) 
    VALUES (?,?,?,?,?)`;
      db.query(
        query,
        [
          reqBody.panel_order,
          reqBody.panel_notes,
          reqBody.color_and_style,
          reqBody.panel_img,
          reqBody.missionBasicMissionId,
        ],
        (err, panel) => {
          if (err) throw err;
          if (panel) {
            res.status(201).json(panel);
          }
        }
      );
    }
  });
};
