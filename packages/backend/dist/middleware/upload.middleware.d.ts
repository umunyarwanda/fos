import { Request, Response, NextFunction, RequestHandler } from 'express';
export declare const uploadSingle: RequestHandler;
export declare const uploadMultiple: RequestHandler;
export declare const handleUploadError: (error: any, req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=upload.middleware.d.ts.map