import { Router, Request, Response } from "express";
import sessionRoutes from "modules/users/infra/http/routes/SessionRoutes";
import userRoutes from "modules/users/infra/http/routes/UserRoutes";

const routes = Router();

routes.use('/api/', sessionRoutes);
routes.use('/api/users', userRoutes);

routes.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Funcionando' });
});

export default routes;