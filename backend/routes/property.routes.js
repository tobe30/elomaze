import express from 'express';
import { createProperty } from '../controllers/property.controller.js';
import { protectRoute, verifyAgent } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create-property', protectRoute, verifyAgent, createProperty);

export default router;