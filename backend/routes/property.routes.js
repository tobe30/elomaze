import express from 'express';
import { createProperty, deleteProperty, getMyProperties, getProperties, getPropertiesByUser, getPropertyById, updateProperty } from '../controllers/property.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { allowRoles } from '../middleware/rbac.js';

const router = express.Router();

router.post('/create-property', protectRoute, allowRoles("agent", "admin"), createProperty);

router.get('/my-properties', protectRoute, allowRoles("agent"), getMyProperties);

router.get('/user/:id', getPropertiesByUser);

router.get('/', getProperties);

router.get('/:id', getPropertyById);

router.put('/:id', protectRoute, allowRoles("agent", "admin"), updateProperty);

router.delete('/:id', protectRoute, allowRoles("agent", "admin"), deleteProperty);

export default router;