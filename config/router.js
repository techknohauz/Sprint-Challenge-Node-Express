const projectRouters = require('../projects/projectRouters');
const actionRouters = require('../actions/actionRouters');

const projects = server => {
  server.use('/api/projects', projectRouters);
};

const actions = server => {
  server.use('/api/actions', actionRouters);
}

module.exports = {
  projectRouters: projects,
  actionRouters: actions
}