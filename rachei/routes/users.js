const express = require('express');
const router = express.Router();
const createUser = require('../controller/User/create');
const { readAllUsersGroup, readLoginUser, readAllUsers, readUser } = require('../controller/User/read');
const { updateUser } = require('../controller/User/update');

/* GET users listing. */
router.get('/group/:id', readAllUsersGroup);

router.get('/', readAllUsers);

router.get('/:id', readUser)

router.post('/create', createUser);

router.post('/login', readLoginUser);

router.post('/update/:id', updateUser);

module.exports = router;
