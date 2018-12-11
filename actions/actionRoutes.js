const express = require('express');

const actionDb = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
      .then(actions => {
        console.log('\n*** actions ***', actions);
        res.status(200).json(actions);
      })
        .catch(err => res.status(500).json({ error: "The actions could not be retrieved. "}))
    })

router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionDb.get(id)
    .then(action=> {
    console.log('\n*** projects ***', action);
      res.status(200).json(action);
    })
    .catch(err => res.status(500).json({ error: "The action with this ID not be retrieved. "}))
})

router.post('/',  (req, res) => {
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    actionDb.insert(newAction)
      .then( newAct => {
          res.status(201).json(newAct);
      })
      .catch(err => res.status(500).json({ error: "This action could not be added. "}))
    })
    
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  actionDb.remove(id)
    .then(actionRemoved => {
        res.status(200).json(actionRemoved);
    })
    .catch(err => { res.status(500).json({ error: "This action could not be deleted."});
      });
  })

router.put('/:id', (req, res) => {
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

module.exports = router;