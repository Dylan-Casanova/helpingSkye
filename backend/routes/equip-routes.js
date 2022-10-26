module.exports = function (app, db) {
  // POSTS Equipment INTO mission_equiplist TABLE //
  app.post("/equipdetails", (req, res) => {
    let query = `INSERT INTO equipment_details (equip_name, equip_category, equip_description, equip_img)
  VALUES ('${req.body.equip_name}','${req.body.equip_category}','${req.body.equip_description}','${req.body.equip_img}')`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, message: "Equipment posted!" });
    });
  });

  // POSTS STAGE INTO mission_stagelist TABLE //
  app.post("/addequip", (req, res) => {
    let query = `INSERT INTO mission_equiplist (equip_id, mission_id)
      VALUES ('${req.body.equip_id}', '${req.body.mission_id}' )`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, message: "Stage posted!" });
    });
  });

  // DELETES Equipment FROM mission_equiplist TABLE //
  app.delete("/deleteequip/:mission_id/:equip_id", (req, res) => {
    let query = `DELETE FROM mission_equiplist WHERE equip_id = '${req.params.equip_id}' AND mission_id = '${req.params.mission_id} `;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(200).send({ status: 200, message: "Equipment Deleted!" });
    });
  });

  // GETS STAGE BY MISSION ID WITH STAGE DETAILS //
  app.get("/missionequip/:id", (req, res) => {
    let query = `SELECT * FROM mission_basics JOIN equipment_details WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, stageByMission) => {
      if (err) throw err;
      if (stageByMission) {
        res.status(200).json(stageByMission);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  // GETS STAGE DETAILS FOR CATALOG //
  app.get("/equipdetails", (req, res) => {
    let query = `SELECT * FROM equipment_details`;
    db.query(query, (err, stageDetails) => {
      if (err) throw err;
      if (stageDetails) {
        res.status(200).json(stageDetails);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });
};
