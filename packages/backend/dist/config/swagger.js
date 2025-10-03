"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FOS Backend API',
            version: '1.0.0',
            description: 'Family of Singers Backend API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token'
                }
            },
            schemas: {
                Event: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            example: 'Family of Singers Christmas Concert'
                        },
                        subtitle: {
                            type: 'string',
                            example: 'A Magical Evening of Christmas Carols'
                        },
                        description: {
                            type: 'string',
                            example: 'Join us for a magical evening of Christmas carols and holiday classics...'
                        },
                        eventDate: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-15T00:00:00.000Z'
                        },
                        startTime: {
                            type: 'string',
                            example: '19:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '21:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Kigali Convention Centre'
                        },
                        address: {
                            type: 'string',
                            example: 'KG 2 Roundabout, Kigali, Rwanda'
                        },
                        capacity: {
                            type: 'integer',
                            example: 500
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: true
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Christmas', 'Gospel', 'Family', 'Community']
                        },
                        galleryImages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
                        },
                        featuredPerformers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Dr. Jean Baptiste'
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Conductor'
                                    },
                                    subtitle: {
                                        type: 'string',
                                        example: 'Artistic Director with 15+ years of experience'
                                    },
                                    role: {
                                        type: 'string',
                                        example: 'Conductor'
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'https://example.com/performer.jpg'
                                    }
                                }
                            }
                        },
                        venueType: {
                            type: 'string',
                            enum: ['indoor', 'outdoor'],
                            example: 'indoor'
                        },
                        organizerId: {
                            type: 'integer',
                            example: 1
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        }
                    }
                },
                CreateEventRequest: {
                    type: 'object',
                    required: ['title', 'description', 'eventDate', 'startTime', 'location', 'venueType'],
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Family of Singers Christmas Concert'
                        },
                        subtitle: {
                            type: 'string',
                            example: 'A Magical Evening of Christmas Carols'
                        },
                        description: {
                            type: 'string',
                            example: 'Join us for a magical evening of Christmas carols and holiday classics...'
                        },
                        eventDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-15'
                        },
                        startTime: {
                            type: 'string',
                            example: '19:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '21:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Kigali Convention Centre'
                        },
                        address: {
                            type: 'string',
                            example: 'KG 2 Roundabout, Kigali, Rwanda'
                        },
                        capacity: {
                            type: 'integer',
                            example: 500
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: true
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Christmas', 'Gospel', 'Family', 'Community']
                        },
                        galleryImages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['https://example.com/image1.jpg']
                        },
                        featuredPerformers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Dr. Jean Baptiste'
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Conductor'
                                    },
                                    subtitle: {
                                        type: 'string',
                                        example: 'Artistic Director with 15+ years of experience'
                                    },
                                    role: {
                                        type: 'string',
                                        example: 'Conductor'
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'https://example.com/performer.jpg'
                                    }
                                }
                            }
                        },
                        venueType: {
                            type: 'string',
                            enum: ['indoor', 'outdoor'],
                            example: 'indoor'
                        }
                    }
                },
                UpdateEventRequest: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Updated Event Title'
                        },
                        subtitle: {
                            type: 'string',
                            example: 'Updated Subtitle'
                        },
                        description: {
                            type: 'string',
                            example: 'Updated description...'
                        },
                        eventDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-20'
                        },
                        startTime: {
                            type: 'string',
                            example: '20:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '22:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Updated Location'
                        },
                        address: {
                            type: 'string',
                            example: 'Updated Address'
                        },
                        capacity: {
                            type: 'integer',
                            example: 600
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: false
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Updated', 'Tags']
                        },
                        galleryImages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['https://example.com/updated-image.jpg']
                        },
                        featuredPerformers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Updated Performer'
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Updated Title'
                                    },
                                    subtitle: {
                                        type: 'string',
                                        example: 'Updated Subtitle'
                                    },
                                    role: {
                                        type: 'string',
                                        example: 'Updated Role'
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'https://example.com/updated-performer.jpg'
                                    }
                                }
                            }
                        },
                        venueType: {
                            type: 'string',
                            enum: ['indoor', 'outdoor'],
                            example: 'outdoor'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Validation failed'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    property: {
                                        type: 'string',
                                        example: 'title'
                                    },
                                    constraints: {
                                        type: 'object',
                                        example: {
                                            isNotEmpty: 'title should not be empty'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                SpecialProgram: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            example: 'Young Voices Academy'
                        },
                        subtitle: {
                            type: 'string',
                            example: 'Nurturing the Next Generation of Musical Talent'
                        },
                        description: {
                            type: 'string',
                            example: 'A comprehensive music education program for children and teenagers aged 8-18...'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-01-15'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-15'
                        },
                        startTime: {
                            type: 'string',
                            example: '09:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '12:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Family of Singers Music Center'
                        },
                        address: {
                            type: 'string',
                            example: 'KG 2 Roundabout, Kigali, Rwanda'
                        },
                        capacity: {
                            type: 'integer',
                            example: 30
                        },
                        monthlyTuition: {
                            type: 'number',
                            example: 50000
                        },
                        currency: {
                            type: 'string',
                            example: 'RWF'
                        },
                        minAge: {
                            type: 'integer',
                            example: 8
                        },
                        maxAge: {
                            type: 'integer',
                            example: 18
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: true
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Education', 'Youth', 'Vocal Training', 'Community']
                        },
                        galleryImages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['https://example.com/image1.jpg']
                        },
                        instructors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Dr. Jean Baptiste'
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Program Director'
                                    },
                                    subtitle: {
                                        type: 'string',
                                        example: 'Music Education Specialist with 20+ years of experience'
                                    },
                                    role: {
                                        type: 'string',
                                        example: 'Program Director'
                                    },
                                    qualifications: {
                                        type: 'string',
                                        example: 'PhD in Music Education, Certified Voice Instructor'
                                    },
                                    experience: {
                                        type: 'string',
                                        example: '20+ years in youth development'
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'https://example.com/instructor.jpg'
                                    }
                                }
                            }
                        },
                        curriculum: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    phase: {
                                        type: 'string',
                                        example: 'Foundation Skills'
                                    },
                                    duration: {
                                        type: 'string',
                                        example: '3 months'
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'Building the fundamental skills every young singer needs'
                                    },
                                    skills: {
                                        type: 'array',
                                        items: {
                                            type: 'string'
                                        },
                                        example: ['Basic vocal technique', 'Pitch recognition', 'Breathing exercises']
                                    }
                                }
                            }
                        },
                        whatsIncluded: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Weekly group classes', 'Individual voice coaching', 'Music theory instruction']
                        },
                        schedule: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    day: {
                                        type: 'string',
                                        example: 'Saturday'
                                    },
                                    startTime: {
                                        type: 'string',
                                        example: '09:00'
                                    },
                                    endTime: {
                                        type: 'string',
                                        example: '12:00'
                                    },
                                    activity: {
                                        type: 'string',
                                        example: 'Group Classes'
                                    }
                                }
                            }
                        },
                        directorId: {
                            type: 'integer',
                            example: 1
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        }
                    }
                },
                CreateSpecialProgramRequest: {
                    type: 'object',
                    required: ['title', 'description', 'startDate', 'endDate', 'startTime', 'endTime', 'location', 'capacity', 'monthlyTuition', 'currency', 'minAge', 'maxAge'],
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Young Voices Academy'
                        },
                        subtitle: {
                            type: 'string',
                            example: 'Nurturing the Next Generation of Musical Talent'
                        },
                        description: {
                            type: 'string',
                            example: 'A comprehensive music education program for children and teenagers aged 8-18...'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-01-15'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-15'
                        },
                        startTime: {
                            type: 'string',
                            example: '09:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '12:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Family of Singers Music Center'
                        },
                        address: {
                            type: 'string',
                            example: 'KG 2 Roundabout, Kigali, Rwanda'
                        },
                        capacity: {
                            type: 'integer',
                            example: 30
                        },
                        monthlyTuition: {
                            type: 'number',
                            example: 50000
                        },
                        currency: {
                            type: 'string',
                            example: 'RWF'
                        },
                        minAge: {
                            type: 'integer',
                            example: 8
                        },
                        maxAge: {
                            type: 'integer',
                            example: 18
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: true
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Education', 'Youth', 'Vocal Training']
                        },
                        galleryImages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['https://example.com/image1.jpg']
                        },
                        instructors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Dr. Jean Baptiste'
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Program Director'
                                    },
                                    subtitle: {
                                        type: 'string',
                                        example: 'Music Education Specialist'
                                    },
                                    role: {
                                        type: 'string',
                                        example: 'Program Director'
                                    },
                                    qualifications: {
                                        type: 'string',
                                        example: 'PhD in Music Education'
                                    },
                                    experience: {
                                        type: 'string',
                                        example: '20+ years experience'
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'https://example.com/instructor.jpg'
                                    }
                                }
                            }
                        },
                        curriculum: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    phase: {
                                        type: 'string',
                                        example: 'Foundation Skills'
                                    },
                                    duration: {
                                        type: 'string',
                                        example: '3 months'
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'Building fundamental skills'
                                    },
                                    skills: {
                                        type: 'array',
                                        items: {
                                            type: 'string'
                                        },
                                        example: ['Basic vocal technique', 'Pitch recognition']
                                    }
                                }
                            }
                        },
                        whatsIncluded: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Weekly group classes', 'Individual voice coaching']
                        },
                        schedule: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    day: {
                                        type: 'string',
                                        example: 'Saturday'
                                    },
                                    startTime: {
                                        type: 'string',
                                        example: '09:00'
                                    },
                                    endTime: {
                                        type: 'string',
                                        example: '12:00'
                                    },
                                    activity: {
                                        type: 'string',
                                        example: 'Group Classes'
                                    }
                                }
                            }
                        }
                    }
                },
                UpdateSpecialProgramRequest: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Updated Program Title'
                        },
                        subtitle: {
                            type: 'string',
                            example: 'Updated Subtitle'
                        },
                        description: {
                            type: 'string',
                            example: 'Updated description...'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-02-01'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-31'
                        },
                        startTime: {
                            type: 'string',
                            example: '10:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '13:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Updated Location'
                        },
                        address: {
                            type: 'string',
                            example: 'Updated Address'
                        },
                        capacity: {
                            type: 'integer',
                            example: 40
                        },
                        monthlyTuition: {
                            type: 'number',
                            example: 60000
                        },
                        currency: {
                            type: 'string',
                            example: 'RWF'
                        },
                        minAge: {
                            type: 'integer',
                            example: 10
                        },
                        maxAge: {
                            type: 'integer',
                            example: 20
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: false
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Updated', 'Tags']
                        },
                        galleryImages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['https://example.com/updated-image.jpg']
                        },
                        instructors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Updated Instructor'
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Updated Title'
                                    },
                                    subtitle: {
                                        type: 'string',
                                        example: 'Updated Subtitle'
                                    },
                                    role: {
                                        type: 'string',
                                        example: 'Updated Role'
                                    },
                                    qualifications: {
                                        type: 'string',
                                        example: 'Updated Qualifications'
                                    },
                                    experience: {
                                        type: 'string',
                                        example: 'Updated Experience'
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'https://example.com/updated-instructor.jpg'
                                    }
                                }
                            }
                        },
                        curriculum: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    phase: {
                                        type: 'string',
                                        example: 'Updated Phase'
                                    },
                                    duration: {
                                        type: 'string',
                                        example: '4 months'
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'Updated description'
                                    },
                                    skills: {
                                        type: 'array',
                                        items: {
                                            type: 'string'
                                        },
                                        example: ['Updated skill 1', 'Updated skill 2']
                                    }
                                }
                            }
                        },
                        whatsIncluded: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Updated benefit 1', 'Updated benefit 2']
                        },
                        schedule: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    day: {
                                        type: 'string',
                                        example: 'Sunday'
                                    },
                                    startTime: {
                                        type: 'string',
                                        example: '10:00'
                                    },
                                    endTime: {
                                        type: 'string',
                                        example: '13:00'
                                    },
                                    activity: {
                                        type: 'string',
                                        example: 'Updated Activity'
                                    }
                                }
                            }
                        }
                    }
                },
                Schedule: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            example: 'Weekly Rehearsal'
                        },
                        description: {
                            type: 'string',
                            example: 'Regular weekly rehearsal for all choir members'
                        },
                        scheduleDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-15'
                        },
                        startTime: {
                            type: 'string',
                            example: '18:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '20:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Presbyterian Church of Rwanda'
                        },
                        address: {
                            type: 'string',
                            example: 'KG 2 Roundabout, Kigali, Rwanda'
                        },
                        eventType: {
                            type: 'string',
                            enum: ['rehearsal', 'performance', 'outreach', 'recording', 'meeting', 'other'],
                            example: 'rehearsal'
                        },
                        status: {
                            type: 'string',
                            enum: ['confirmed', 'tentative', 'cancelled', 'completed'],
                            example: 'confirmed'
                        },
                        isRecurring: {
                            type: 'boolean',
                            example: true
                        },
                        recurrencePattern: {
                            type: 'string',
                            enum: ['weekly', 'monthly', 'yearly', 'none'],
                            example: 'weekly'
                        },
                        recurrenceInterval: {
                            type: 'integer',
                            example: 1
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        }
                    }
                },
                CreateScheduleRequest: {
                    type: 'object',
                    required: ['title', 'scheduleDate', 'startTime', 'endTime', 'eventType'],
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Weekly Rehearsal'
                        },
                        description: {
                            type: 'string',
                            example: 'Regular weekly rehearsal for all choir members'
                        },
                        scheduleDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-15'
                        },
                        startTime: {
                            type: 'string',
                            example: '18:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '20:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Presbyterian Church of Rwanda'
                        },
                        address: {
                            type: 'string',
                            example: 'KG 2 Roundabout, Kigali, Rwanda'
                        },
                        eventType: {
                            type: 'string',
                            enum: ['rehearsal', 'performance', 'outreach', 'recording', 'meeting', 'other'],
                            example: 'rehearsal'
                        },
                        status: {
                            type: 'string',
                            enum: ['confirmed', 'tentative', 'cancelled', 'completed'],
                            example: 'tentative'
                        },
                        isRecurring: {
                            type: 'boolean',
                            example: true
                        },
                        recurrencePattern: {
                            type: 'string',
                            enum: ['weekly', 'monthly', 'yearly', 'none'],
                            example: 'weekly'
                        },
                        recurrenceInterval: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 52,
                            example: 1
                        }
                    }
                },
                UpdateScheduleRequest: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Updated Weekly Rehearsal'
                        },
                        description: {
                            type: 'string',
                            example: 'Updated description'
                        },
                        scheduleDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-20'
                        },
                        startTime: {
                            type: 'string',
                            example: '19:00'
                        },
                        endTime: {
                            type: 'string',
                            example: '21:00'
                        },
                        location: {
                            type: 'string',
                            example: 'Updated Location'
                        },
                        address: {
                            type: 'string',
                            example: 'Updated Address'
                        },
                        eventType: {
                            type: 'string',
                            enum: ['rehearsal', 'performance', 'outreach', 'recording', 'meeting', 'other'],
                            example: 'performance'
                        },
                        status: {
                            type: 'string',
                            enum: ['confirmed', 'tentative', 'cancelled', 'completed'],
                            example: 'confirmed'
                        },
                        isRecurring: {
                            type: 'boolean',
                            example: false
                        },
                        recurrencePattern: {
                            type: 'string',
                            enum: ['weekly', 'monthly', 'yearly', 'none'],
                            example: 'none'
                        },
                        recurrenceInterval: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 52,
                            example: 2
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        }
                    }
                },
                Commission: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            example: 'Corporate Event Performance'
                        },
                        description: {
                            type: 'string',
                            example: 'Professional choral performance for corporate event'
                        },
                        amount: {
                            type: 'number',
                            format: 'decimal',
                            example: 200000
                        },
                        duration: {
                            type: 'string',
                            example: '2 hours'
                        },
                        inclusions: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Professional Performance', 'Sound System', 'Event Coordination']
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-15T10:30:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-15T10:30:00.000Z'
                        }
                    }
                },
                CreateCommissionRequest: {
                    type: 'object',
                    required: ['title', 'amount'],
                    properties: {
                        title: {
                            type: 'string',
                            maxLength: 255,
                            example: 'Corporate Event Performance'
                        },
                        description: {
                            type: 'string',
                            example: 'Professional choral performance for corporate event'
                        },
                        amount: {
                            type: 'number',
                            minimum: 0,
                            example: 200000
                        },
                        duration: {
                            type: 'string',
                            example: '2 hours'
                        },
                        inclusions: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Professional Performance', 'Sound System', 'Event Coordination']
                        }
                    }
                },
                UpdateCommissionRequest: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            maxLength: 255,
                            example: 'Updated Corporate Event Performance'
                        },
                        description: {
                            type: 'string',
                            example: 'Updated description'
                        },
                        amount: {
                            type: 'number',
                            minimum: 0,
                            example: 250000
                        },
                        duration: {
                            type: 'string',
                            example: '3 hours'
                        },
                        inclusions: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Professional Performance', 'Sound System', 'Event Coordination', 'Custom Repertoire']
                        }
                    }
                },
                Booking: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        fullName: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            example: '+250788123456'
                        },
                        eventLocation: {
                            type: 'string',
                            example: 'Kigali Convention Centre, KG 2 Roundabout'
                        },
                        eventDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-25'
                        },
                        duration: {
                            type: 'string',
                            enum: ['30_minutes', '1_hour', '1.5_hours', '2_hours', '3_hours', '4_hours', 'full_day', 'multiple_days'],
                            example: '2_hours'
                        },
                        additionalMessage: {
                            type: 'string',
                            example: 'Please include Christmas carols in the performance'
                        },
                        commissionId: {
                            type: 'integer',
                            example: 1
                        },
                        customEventType: {
                            type: 'string',
                            example: 'Graduation Ceremony'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
                            example: 'pending'
                        },
                        confirmedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-15T10:30:00.000Z'
                        },
                        completedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-25T18:00:00.000Z'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-15T10:30:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-12-15T10:30:00.000Z'
                        }
                    }
                },
                CreateBookingRequest: {
                    type: 'object',
                    required: ['fullName', 'email', 'phoneNumber', 'eventLocation', 'eventDate'],
                    properties: {
                        fullName: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 255,
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 20,
                            example: '+250788123456'
                        },
                        eventLocation: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 255,
                            example: 'Kigali Convention Centre, KG 2 Roundabout'
                        },
                        eventDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-25'
                        },
                        duration: {
                            type: 'string',
                            enum: ['30_minutes', '1_hour', '1.5_hours', '2_hours', '3_hours', '4_hours', 'full_day', 'multiple_days'],
                            example: '2_hours'
                        },
                        additionalMessage: {
                            type: 'string',
                            maxLength: 1000,
                            example: 'Please include Christmas carols in the performance'
                        },
                        commissionId: {
                            type: 'integer',
                            example: 1
                        },
                        customEventType: {
                            type: 'string',
                            maxLength: 255,
                            example: 'Graduation Ceremony'
                        }
                    }
                },
                UpdateBookingRequest: {
                    type: 'object',
                    properties: {
                        fullName: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 255,
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 20,
                            example: '+250788123456'
                        },
                        eventLocation: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 255,
                            example: 'Kigali Convention Centre, KG 2 Roundabout'
                        },
                        eventDate: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-25'
                        },
                        duration: {
                            type: 'string',
                            enum: ['30_minutes', '1_hour', '1.5_hours', '2_hours', '3_hours', '4_hours', 'full_day', 'multiple_days'],
                            example: '2_hours'
                        },
                        additionalMessage: {
                            type: 'string',
                            maxLength: 1000,
                            example: 'Please include Christmas carols in the performance'
                        },
                        commissionId: {
                            type: 'integer',
                            example: 1
                        },
                        customEventType: {
                            type: 'string',
                            maxLength: 255,
                            example: 'Graduation Ceremony'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
                            example: 'confirmed'
                        }
                    }
                },
                Contact: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        fullName: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            example: '+250 788 123 456'
                        },
                        subject: {
                            type: 'string',
                            enum: ['general_inquiry', 'event_booking', 'commission_request', 'support', 'feedback', 'other'],
                            example: 'event_booking'
                        },
                        message: {
                            type: 'string',
                            example: 'I would like to book your band for our wedding ceremony...'
                        },
                        status: {
                            type: 'string',
                            enum: ['new', 'in_progress', 'responded', 'closed'],
                            example: 'new'
                        },
                        adminNotes: {
                            type: 'string',
                            example: 'Called client, discussed pricing, sent proposal'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        }
                    }
                },
                CreateContactRequest: {
                    type: 'object',
                    required: ['fullName', 'email', 'subject', 'message'],
                    properties: {
                        fullName: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 255,
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            maxLength: 20,
                            example: '+250 788 123 456'
                        },
                        subject: {
                            type: 'string',
                            enum: ['general_inquiry', 'event_booking', 'commission_request', 'support', 'feedback', 'other'],
                            example: 'event_booking'
                        },
                        message: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 2000,
                            example: 'I would like to book your band for our wedding ceremony...'
                        }
                    }
                },
                UpdateContactRequest: {
                    type: 'object',
                    properties: {
                        fullName: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 255,
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            maxLength: 20,
                            example: '+250 788 123 456'
                        },
                        subject: {
                            type: 'string',
                            enum: ['general_inquiry', 'event_booking', 'commission_request', 'support', 'feedback', 'other'],
                            example: 'event_booking'
                        },
                        message: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 2000,
                            example: 'I would like to book your band for our wedding ceremony...'
                        },
                        status: {
                            type: 'string',
                            enum: ['new', 'in_progress', 'responded', 'closed'],
                            example: 'responded'
                        },
                        adminNotes: {
                            type: 'string',
                            maxLength: 1000,
                            example: 'Called client, discussed pricing, sent proposal'
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            example: 'password123'
                        }
                    }
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['email', 'username', 'password', 'confirmPassword', 'firstName', 'lastName'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'user@example.com'
                        },
                        username: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 50,
                            example: 'johndoe'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            example: 'password123'
                        },
                        confirmPassword: {
                            type: 'string',
                            minLength: 6,
                            example: 'password123'
                        },
                        firstName: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 50,
                            example: 'John'
                        },
                        lastName: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 50,
                            example: 'Doe'
                        },
                        phone: {
                            type: 'string',
                            example: '+250788123456'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'integer',
                                            example: 1
                                        },
                                        email: {
                                            type: 'string',
                                            format: 'email',
                                            example: 'user@example.com'
                                        },
                                        username: {
                                            type: 'string',
                                            example: 'johndoe'
                                        },
                                        firstName: {
                                            type: 'string',
                                            example: 'John'
                                        },
                                        lastName: {
                                            type: 'string',
                                            example: 'Doe'
                                        },
                                        phone: {
                                            type: 'string',
                                            example: '+250788123456'
                                        }
                                    }
                                },
                                token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                },
                                expiresIn: {
                                    type: 'integer',
                                    example: 86400
                                }
                            }
                        }
                    }
                },
                ApiResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Operation completed successfully'
                        },
                        data: {
                            type: 'object',
                            description: 'Response data (varies by endpoint)'
                        }
                    }
                },
                Video: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        url: {
                            type: 'string',
                            example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        },
                        title: {
                            type: 'string',
                            example: 'Amazing Performance Video'
                        },
                        description: {
                            type: 'string',
                            example: 'A beautiful performance from our latest concert'
                        },
                        type: {
                            type: 'string',
                            enum: ['performance', 'worship', 'concert'],
                            example: 'performance'
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: false
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-01-01T00:00:00.000Z'
                        }
                    }
                },
                CreateVideoRequest: {
                    type: 'object',
                    required: ['url', 'title', 'type'],
                    properties: {
                        url: {
                            type: 'string',
                            format: 'uri',
                            maxLength: 500,
                            example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        },
                        title: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 255,
                            example: 'Amazing Performance Video'
                        },
                        description: {
                            type: 'string',
                            maxLength: 1000,
                            example: 'A beautiful performance from our latest concert'
                        },
                        type: {
                            type: 'string',
                            enum: ['performance', 'worship', 'concert'],
                            example: 'performance'
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: false
                        }
                    }
                },
                UpdateVideoRequest: {
                    type: 'object',
                    properties: {
                        url: {
                            type: 'string',
                            format: 'uri',
                            maxLength: 500,
                            example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        },
                        title: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 255,
                            example: 'Amazing Performance Video'
                        },
                        description: {
                            type: 'string',
                            maxLength: 1000,
                            example: 'A beautiful performance from our latest concert'
                        },
                        type: {
                            type: 'string',
                            enum: ['performance', 'worship', 'concert'],
                            example: 'performance'
                        },
                        isActive: {
                            type: 'boolean',
                            example: true
                        },
                        isFeatured: {
                            type: 'boolean',
                            example: false
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/controllers/*.ts', './src/routes/*.ts']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map