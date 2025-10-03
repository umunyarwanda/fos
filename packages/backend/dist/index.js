"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./config/database");
const swagger_1 = require("./config/swagger");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const specialProgramRoutes_1 = __importDefault(require("./routes/specialProgramRoutes"));
const scheduleRoutes_1 = __importDefault(require("./routes/scheduleRoutes"));
const commissionRoutes_1 = __importDefault(require("./routes/commissionRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
const urls_1 = require("./shared/variables/urls");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'FOS Backend API Server',
        version: '1.0.0',
        status: 'running'
    });
});
app.use(urls_1.USERS_URL.BASE, userRoutes_1.default);
app.use(urls_1.EVENTS_URL.BASE, eventRoutes_1.default);
app.use(urls_1.SPECIAL_PROGRAMS_URL.BASE, specialProgramRoutes_1.default);
app.use(urls_1.SCHEDULES_URL.BASE, scheduleRoutes_1.default);
app.use(urls_1.COMMISSIONS_URL.BASE, commissionRoutes_1.default);
app.use(urls_1.BOOKINGS_URL.BASE, bookingRoutes_1.default);
app.use(urls_1.CONTACTS_URL.BASE, contactRoutes_1.default);
app.use(urls_1.AUTH_URL.BASE, authRoutes_1.default);
app.use(urls_1.UPLOAD_URL.BASE, upload_routes_1.default);
app.use(urls_1.VIDEOS_URL.BASE, videoRoutes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'FOS Backend API Documentation'
}));
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl
    });
});
const startServer = async () => {
    try {
        await (0, database_1.initializeDatabase)();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map