const { HealthCheck } = require('../services');


const check = async (req, res) => {
    try{
        const { doc, errors } =await HealthCheck.getUsers();
        console.log(doc);
        if(doc){
          res.send(doc);
        }
        res.send(errors)
      } catch(e) {
        res.send(e)
      }

};

module.exports = {
    check
};