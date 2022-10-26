const generateUploadURL = require("../s3");

module.exports = function (app) {
  app.get("/s3Url", async (req, res) => {
    try {
      const url = await generateUploadURL();
      res.status(200).send({ url });
    } catch (err) {
      res
        .status(400)
        .send({ status: 404, message: "request didn't yield any response" });
    }
  });
};
