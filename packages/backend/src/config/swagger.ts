import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FOS Backend API',
      version: '1.0.0',
      description: 'FOS Backend Express Server with TypeScript and TypeORM',
      contact: {
        name: 'FOS Team',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'johndoe',
            },
            firstName: {
              type: 'string',
              description: 'First name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              example: '+250123456789',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
            isActive: {
              type: 'boolean',
              description: 'User active status',
              example: true,
            },
          },
        },
        CreateUserRequest: {
          type: 'object',
          required: ['email', 'username', 'password', 'confirmPassword', 'firstName', 'lastName'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'johndoe',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Password',
              example: 'password123',
            },
            confirmPassword: {
              type: 'string',
              description: 'Password confirmation',
              example: 'password123',
            },
            firstName: {
              type: 'string',
              description: 'First name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              description: 'Phone number (optional)',
              example: '+250123456789',
            },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'johndoe',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Password',
              example: 'password123',
            },
            confirmPassword: {
              type: 'string',
              description: 'Password confirmation',
              example: 'password123',
            },
            firstName: {
              type: 'string',
              description: 'First name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              example: '+250123456789',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Something went wrong',
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Validation error message',
              example: 'Validation failed',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    description: 'Field name',
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                  },
                },
              },
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Password',
              example: 'password123',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'username', 'password', 'confirmPassword', 'firstName', 'lastName'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'johndoe',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Password',
              example: 'password123',
            },
            confirmPassword: {
              type: 'string',
              description: 'Password confirmation',
              example: 'password123',
            },
            firstName: {
              type: 'string',
              description: 'First name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              description: 'Phone number (optional)',
              example: '+250123456789',
            },
          },
        },
        StandardResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the request was successful',
              example: true,
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
            message: {
              type: 'string',
              description: 'Optional message',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    description: 'Field name',
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                  },
                },
              },
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      description: 'User ID',
                      example: 1,
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'User email address',
                      example: 'user@example.com',
                    },
                    username: {
                      type: 'string',
                      description: 'Username',
                      example: 'johndoe',
                    },
                    firstName: {
                      type: 'string',
                      description: 'First name',
                      example: 'John',
                    },
                    lastName: {
                      type: 'string',
                      description: 'Last name',
                      example: 'Doe',
                    },
                    phone: {
                      type: 'string',
                      description: 'Phone number',
                      example: '+250123456789',
                    },
                    isActive: {
                      type: 'boolean',
                      description: 'User active status',
                      example: true,
                    },
                  },
                },
                token: {
                  type: 'string',
                  description: 'JWT access token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                expiresIn: {
                  type: 'integer',
                  description: 'Token expiration time in seconds',
                  example: 86400,
                },
              },
            },
          },
        },
        UserListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        DeleteUserResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'User deleted successfully',
                },
              },
            },
          },
        },
        RestoreUserResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'User restored successfully',
                },
                user: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJSDoc(options);