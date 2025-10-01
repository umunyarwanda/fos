import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Transform plain object to class instance
      const dto = plainToClass(dtoClass, req.body);
      
      // Validate the DTO
      const errors = await validate(dto);
      
      if (errors.length > 0) {
        const errorMessages = errors.map(error => {
          return {
            property: error.property,
            constraints: error.constraints
          };
        });
        
        res.status(400).json({
          message: 'Validation failed',
          errors: errorMessages
        });
        return;
      }
      
      // Attach validated DTO to request object
      req.body = dto;
      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      res.status(500).json({ message: 'Internal server error during validation' });
    }
  };
}