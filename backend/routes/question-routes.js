module.exports = function (app, db) {
  // GETS Storyboards BY MISSION ID BUT NO DETAILS //
  app.get("/getquestions/:id", (req, res) => {
    let query = `SELECT * FROM mission_questionlist WHERE mission_id = '${req.params.id}'`;
    db.query(query, (err, questions) => {
      if (err) throw err;
      if (questions) {
        res.status(200).json(questions);
      } else {
        res
          .status(404)
          .send({ status: 404, message: "request didn't yield any response" });
      }
    });
  });

  //Post to tool_details
  app.post("/postquestions", (req, res) => {
    let query = `INSERT INTO mission_questionlist (q_order, q_text, q_ansA, q_ansB, q_ansC, q_ansD, q_ansE, q_ansCorrect, q_position, q_img, mission_id ) 
      VALUES ('${req.body.q_order}','${req.body.q_text}','${req.body.q_ansA}','${req.body.q_ansB}','${req.body.q_ansC}','${req.body.q_ansD}','${req.body.q_ansE}','${req.body.q_ansCorrect}','${req.body.q_position}','${req.body.q_img}','${req.body.mission_id}')`;
    db.query(query, (err, resp) => {
      if (err) throw err;
      res.status(201).send({ status: 201, message: "Questions Posted!" });
    });
  });
};
