const followController = require('../controllers/followController');

async function followRoutes(fastify, options) {
  fastify.post('/follow', followController);
}

module.exports = followRoutes;
