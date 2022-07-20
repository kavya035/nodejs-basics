const status = (req, res) => {
  res.send({ status: 'ok', version: 1.0, name: "nodejs-boilerplate" });
};



module.exports = { status };
