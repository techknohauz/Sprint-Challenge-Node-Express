const express = require('express');

const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectDb.get()
      .then(projects => {
        console.log('\n*** projects ***', projects);
        res.status(200).json(projects);
      })
      .catch(err => res.status(500).json({ error: "The projects could not be retrieved. "}))
    })

router.get('/projectActions/:id', (req, res) => {
  projectDb.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => res.status(500).json({ error: "The projects could not be retrieved. "}))
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectDb.get(id)
      .then(project => {
      console.log('\n*** projects ***', project);
        res.status(200).json(project);
      })
      .catch(err => res.status(500).json({ error: "The project with this ID not be retrieved. "}))
  })
  
  router.post('/', (req, res) => {
      const { name, description } = req.body;
      const newAction = { name, description };
      projectDb.insert(newAction)
        .then( newProject => {
          console.log('\n*** projects ***', newProject);
          res.status(200).json(newProject);
        })
        .catch(err => res.status(500).json({ error: "This project could not be added. "}))
  })
      
  router.delete('/:id', (req, res) => {
      const { id } = req.params;
      projectDb.remove(id)
        .then(projectRemoved => {
          res.status(200).json(projectRemoved);
        })
        .catch(err => { res.status(500).json({ error: "This project could not be deleted."});
        });
    })
    
    router.put('/:id', (req, res) => {
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
  
  
  

  module.exports = router;