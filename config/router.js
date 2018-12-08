const projectRouters = require('../projects/projectRouters');

const projects = server => {
  server.use('/api/projects', projectRouters);
};

module.exports = {
  projectRouters: projects
}