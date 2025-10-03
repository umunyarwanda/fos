import { Request, Response, NextFunction } from 'express';
export declare function validateDto<T extends object>(dtoClass: new () => T): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validation.middleware.d.ts.map