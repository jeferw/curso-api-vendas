import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(isAuthenticated);

ordersRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show,
);

ordersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.array().required(),
        },
    }),
    ordersController.create,
);

export default ordersRoutes;
