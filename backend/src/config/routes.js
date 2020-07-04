const router = require('express').Router();

const UserController = require('./../app/controllers/user.controller');
const ProjectController = require('./../app/controllers/project.controller');
const TastController = require('./../app/controllers/task.controller');

// User's routes
router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.get('/user', UserController.logged);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

// Project's routes
router.get('/project', ProjectController.findByUser);
router.get('/project/:id', ProjectController.findById);
router.post('/project', ProjectController.store);
router.put('/project/:id', ProjectController.update);
router.delete('/project/:id', ProjectController.delete);

// Task's routes
router.post('/task/:projectId', TastController.store);
router.put('/task/:projectId/:id', TastController.update);
router.delete('/task/:projectId/:id', TastController.delete);

module.exports = router;
