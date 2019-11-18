const express = require('express');
const router = express.Router();

const adminRouter = require('./Admin');
const userRouter = require('./User');
const placeEventRouter = require('./PlaceEvent');
const placeEventGroupRouter = require('./PlaceEventGroup');
const issueRouter = require('./Issue');
const netPromoterScoreRouter = require('./NetPromoterScore');

router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.use('/placeEvent', placeEventRouter);
router.use('/placeEventGroup', placeEventGroupRouter);
router.use('/issue', issueRouter);
router.use('/netPromoterScore', netPromoterScoreRouter);

module.exports = router;