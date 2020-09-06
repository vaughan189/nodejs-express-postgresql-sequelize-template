import { Router } from 'express';
import UserRoutes from './UserRoutes';

const router = Router();

router.use('/user', UserRoutes);

export default router;
