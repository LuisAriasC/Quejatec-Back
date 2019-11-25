const express = require('express');
const router = express.Router();

const adminRouter = require('./Admin');
const userRouter = require('./User');
const placeEventRouter = require('./PlaceEvent');
const placeEventGroupRouter = require('./PlaceEventGroup');
const issueRouter = require('./Issue');
const netPromoterScoreRouter = require('./NetPromoterScore');
const clientPlaceEventRouter = require('./ClientPlaceEvent');
const clientIssueRouter = require('./ClientIssue');
const clientScoreRouter = require('./ClientNetPromoterScore');

// Admin Routes
router.use('/admin/admin', adminRouter);
router.use('/admin/user', userRouter);
router.use('/admin/place-event', placeEventRouter);
router.use('/admin/place-event-group', placeEventGroupRouter);
router.use('/admin/issue', issueRouter);
router.use('/admin/net-promoter-score', netPromoterScoreRouter);

// Client routes
router.use('/client/placeEvent', clientPlaceEventRouter);
router.use('/client/issue', clientIssueRouter);
router.use('/client/score', clientScoreRouter);

module.exports = router;