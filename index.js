const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const actionDb = require('./data/helpers/actionModel');
const projectDb = require('./data/helpers/projectModel');

const server = express();

server.use(express.json());
server.use(helmet()); 
server.use(morgan('tiny')); 

server.get('/', (req, res) => {
    res.json('Homebase');
  });
  
// ACTION MODEL CRUD
server.get('/api/actions', (req, res) => {
    actionDb.get()
      .then(actions => {
        console.log('\n*** actions ***', actions);
        res.status(200).json(actions);
      })
        .catch(err => res.status(500).json({ error: "The actions could not be retrieved. "}))
    })

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb.get(id)
    .then(action=> {
    console.log('\n*** projects ***', action);
      res.status(200).json(action);
    })
    .catch(err => res.status(500).json({ error: "The action with this ID not be retrieved. "}))
})

server.post('/api/actions',  (req, res) => {
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    actionDb.insert(newAction)
      .then( newAct => {
          res.status(201).json(newAct);
      })
      .catch(err => res.status(500).json({ error: "This action could not be added. "}))
    })
    
server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb.remove(id)
    .then(actionRemoved => {
        res.status(200).json(actionRemoved);
    })
    .catch(err => { res.status(500).json({ error: "This action could not be deleted."});
      });
  })

server.put('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  const editAction = { project_id, description, notes }
  actionDb.update(id, editAction)
    .then(action => {
      console.log('\n***edit function ****', action);
      actionDb
        .get(id)
        .then(action => {
          res.status(200).json(action);
        });
    })
    .catch(err => res.status(500).json({ error: "The action could not be modified." }));
})


// PROJECT MODEL CRUD
server.get('/api/projects', (req, res) => {
    projectDb.get()
      .then(projects => {
        console.log('\n*** projects ***', projects);
        res.status(200).json(projects);
      })
      .catch(err => res.status(500).json({ error: "The projects could not be retrieved. "}))
    })

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDb.get(id)
    .then(project => {
    console.log('\n*** projects ***', project);
      res.status(200).json(project);
    })
    .catch(err => res.status(500).json({ error: "The project with this ID not be retrieved. "}))
})

server.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    const newAction = { name, description };
    projectDb.insert(newAction)
      .then( newProject => {
        console.log('\n*** projects ***', newProject);
        res.status(200).json(newProject);
      })
      .catch(err => res.status(500).json({ error: "This project could not be added. "}))
})
    
server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projectDb.remove(id)
      .then(projectRemoved => {
        res.status(200).json(projectRemoved);
      })
      .catch(err => { res.status(500).json({ error: "This project could not be deleted."});
      });
  })
  
  server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const editProject = { name, description }
    projectDb.update(id, editProject)
      .then(projectEdit => {
        console.log('\*** project edit****', editProject);
        projectEdit
          .get(id)
          .then(project => {
            res.status(200).json(project)
          });
      })
      .catch(err => res.status(500).json({ error: "The project information could not be modified." }));
})




const port = process.env.PORT || 1973
server.listen(port, () => console.log(`\n== Party at port ${port} ==\n`));

