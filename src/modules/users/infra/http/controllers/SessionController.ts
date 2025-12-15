import { Request, Response } from "express";
import CreateSessionService from "modules/users/services/CreateSessionService";
import { container } from "tsyringe";

class SessionController {
    async create(request: Request, response: Response) {
        const {email, password} = request.body;

        const createSessionService = container.resolve(CreateSessionService);

        const session = await createSessionService.execute({
            email,
            password
        });

        response.json(session);
    }
}

export default SessionController;