import { Router } from 'express';
import productsRoutes from '@modules/products/routs/products.routes';
import usersRoutes from '@modules/users/routs/users.routes';
import sessionsRoutes from '@modules/users/routs/sessions.routes';
import passwordRoutes from '@modules/users/routs/password.routes';
import profileRoutes from '@modules/users/routs/profile.routes';
import customersRoutes from '@modules/customers/routs/customers.routes';
import ordersRoutes from '@modules/orders/routs/orders.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
