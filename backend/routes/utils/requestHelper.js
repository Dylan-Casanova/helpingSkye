//helper function to send response
const statusResponse = (res) => {
  res
    .status(400)
    .send({ status: 400, message: "*** ERROR: Missing Request Body" });
};

module.exports = statusResponse;
