const express = require('express');
const router = express.Router();
// database
const projectDb = require('../data/helpers/projectModel');

// GET projects
router.get('/', (_, res) => {
  projectDb.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "500 error", err });
    });
});

// GET project by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  projectDb.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "404 error" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "500 error", err });
    });
});

// GET projectActions
router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  projectDb.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "500 error", err });
    });
})

// CREATE new project
router.post('/', (req, res) => {
  const { name, description } = req.body;

  projectDb.insert({ name, description })
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => res.status(500).json({ message: "500 error" }))
});

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  projectDb.update(id, { name, description })
    .then(project => {
      console.log(project)
      if (project) {
        res.status(200).json({ message: `Project ${project.id} updated` });
      } else {
        res.status(404).json({ message: "404 error" });
      }
    })
    .catch(err => res.status(500).json({ message: "500 error" }));
})

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projectDb.remove(id)
    .then(count => {
      console.log(count)
      if (count) {
        res.status(200).json({ message: `${count} project(s) deleted` });
      } else {
        res.status(404).json({ message: "404 error" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "500 error" });
    });
});

module.exports = router;