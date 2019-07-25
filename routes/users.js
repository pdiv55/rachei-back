const express = require('express');
const router = express.Router();
const { readAllUsersGroup, readAllUsers, readUser } = require('../controller/User/read');
const { updateUser } = require('../controller/User/update');

/* GET users listing. */
router.get('/group/:id', readAllUsersGroup);

router.get('/', readAllUsers);

router.get('/:id', readUser)

router.post('/update/:id', updateUser);

module.exports = router;
