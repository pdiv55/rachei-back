const express = require('express');
const router = express.Router();
const createGroup = require('../controller/Group/create');
const { updateGroup } = require('../controller/Group/update');
const { readAllGroups, readMyGroups, readGroup } = require('../controller/Group/read');

/* GET users listing. */
router.get('/', readAllGroups);

router.get('/user/', readMyGroups);

router.get('/:id', readGroup);

router.post('/create', createGroup);

router.post('/update/:id', updateGroup);

module.exports = router;
