import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;

        const showProfile = new ShowProfileService();

        const user = await showProfile.execute({ userId });

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = request.user.id;
        const { name, email, password, old_password } = request.body;

        const updateUser = new UpdateProfileService();

        const user = await updateUser.execute({
            userId,
            name,
            email,
            password,
            oldPassword: old_password,
        });

        return response.json(classToClass(user));
    }
}
