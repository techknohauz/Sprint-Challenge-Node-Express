const express = require('express');
const router = express.Router();
// database
const actionDb = require('../data/helpers/actionModel');

// GET actions
router.get('/', (_, res) => {
  actionDb.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "500 error", err });
    });
});

// GET actions by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  actionDb.get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "404 error" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "500 error", err });
    });
});

// CREATE new action
router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;

  actionDb.insert({ project_id, description, notes })
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(err => res.status(500).json({ message: "500 error" }))
});

// UPDATE action
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;

  actionDb.update(id, { project_id, description, notes })
    .then(action => {
      if (action) {
        res.status(200).json({ message: `Action ${action.id} updated` });
      } else {
        res.status(404).json({ message: "404 error" });
      }
    })
    .catch(err => res.status(500).json({ message: "500 error" }))
});

// DELETE action
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  actionDb.remove(id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} action(s) deleted` });
      } else {
        res.status(404).json({ message: "404 error" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "500 error", err });
    });
});

module.exports = router;