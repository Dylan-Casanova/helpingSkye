const moment = require("moment");
const statusResponse = require("./utils/requestHelper");

module.exports = function (app) {
  app.get("/ticketlogs/:id", (req, res) => {
    let query = `SELECT * FROM ticket_log JOIN tool_details WHERE mission_id = '${req.params.id}'`;
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

  app.get("/tickets", (req, res) => {
    let query = `SELECT * FROM ticket_log`;
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

  app.post("/ticketcreate", (req, res) => {
    if (Object.entries(req.body).length === 0) {
      statusResponse(res);
    } else {
      let reqBody = req.body;
      let query = `INSERT INTO ticket_log (
      ticket_title,
      ticket_desc,
      ticket_category,
      ticket_img,
      ticket_status,
      ticket_assigned,
      ticket_by
    ) VALUES (
      ?,?,?,?,?,?,?
    )`;
      db.query(
        query,
        [
          reqBody.ticket_title,
          reqBody.ticket_desc,
          reqBody.ticket_category,
          reqBody.ticket_img,
          reqBody.ticket_status,
          reqBody.ticket_assigned,
          reqBody.ticket_by,
        ],
        (err, ticket_logs) => {
          if (err) throw err;
          if (ticket_logs) {
            res.status(201).json(ticket_logs);
          }
        }
      );
    }
  });
};
