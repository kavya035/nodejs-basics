const { check } = require('../controllers/health-check');

module.exports = (router) => {
  router.get('/health-check', check);
};
