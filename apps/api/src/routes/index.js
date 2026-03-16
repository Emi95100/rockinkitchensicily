import { Router } from 'express';
import healthCheck from './health-check.js';
import stripeRouter from './stripe.js';
import bookingsRouter from './bookings.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/stripe', stripeRouter);
    router.use('/bookings', bookingsRouter);

    return router;
};
