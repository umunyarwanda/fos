import { Request, Response } from 'express';
export declare class UsersController {
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static getUserById(req: Request, res: Response): Promise<void>;
    static createUser(req: Request, res: Response): Promise<void>;
    static updateUser(req: Request, res: Response): Promise<void>;
    static deleteUser(req: Request, res: Response): Promise<void>;
    static restoreUser(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=users.controller.d.ts.map