const express = require('express')

const Adopter = require('./adopters-model')
const router = express.Router()

// ADOPTERS ENDPOINTS
// ADOPTERS ENDPOINTS
// ADOPTERS ENDPOINTS
router.get('/', (req, res) => {
  Adopter.find(req.query)
    .then(adopters => {
      res.status(200).json(adopters);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the adopters' });
    });
});

router.get('/:id', (req, res) => {
  Adopter.findById(req.params.id)
    .then(adopter => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: 'Adopter not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the adopter' });
    });
});

router.get('/:id/dogs', (req, res) => {//sometimes a resource makes sense in the context of another resource. so we want to get the dog by that specific adopter. so this is a nested route. another example is blog posts. blog posts have comments. we could have an endpoint to get comments of a specific blog post /api/blogpost/3(blogpostid)/comments
  Adopter.findDogs(req.params.id)
    .then(dogs => {
      if (dogs.length > 0) {
        res.status(200).json(dogs);
      } else {
        res.status(404).json({ message: 'No dogs for this adopter' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the dogs for this adopter' });
    });
});

router.post('/', (req, res) => {
  Adopter.add(req.body)
    .then(adopter => {
      res.status(201).json(adopter);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error adding the adopter' });
    });
});

router.delete('/:id', (req, res) => {
  Adopter.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The adopter has been nuked' });
      } else {
        res.status(404).json({ message: 'The adopter could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error removing the adopter' });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Adopter.update(req.params.id, changes)
    .then(adopter => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: 'The adopter could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error updating the adopter' });
    });
});

module.exports = router