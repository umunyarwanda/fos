"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIDEOS_URL = exports.UPLOAD_URL = exports.AUTH_URL = exports.SCHEDULES_URL = exports.CONTACTS_URL = exports.SPECIAL_PROGRAMS_URL = exports.COMMISSIONS_URL = exports.BOOKINGS_URL = exports.USERS_URL = exports.EVENTS_URL = exports.BASE_URL = void 0;
exports.BASE_URL = 'http://localhost:3000/api';
exports.EVENTS_URL = {
    BASE: `/api/events`,
    GET_EVENT_BY_ID: `/events/:id`,
    CREATE_EVENT: `/events`,
    UPDATE_EVENT: `/events/:id`,
    DELETE_EVENT: `/events/:id`,
};
exports.USERS_URL = {
    BASE: `/api/users`,
    GET_USER_BY_ID: `/users/:id`,
    CREATE_USER: `/users`,
    UPDATE_USER: `/users/:id`,
    DELETE_USER: `/users/:id`,
};
exports.BOOKINGS_URL = {
    BASE: `/api/bookings`,
    GET_PENDING_BOOKINGS: `/bookings/pending`,
    GET_BOOKING_BY_ID: `/bookings/:id`,
    CREATE_BOOKING: `/bookings`,
    UPDATE_BOOKING: `/bookings/:id`,
    DELETE_BOOKING: `/bookings/:id`,
};
exports.COMMISSIONS_URL = {
    BASE: `/api/commissions`,
    GET_COMMISSION_BY_ID: `/commissions/:id`,
    CREATE_COMMISSION: `/commissions`,
    UPDATE_COMMISSION: `/commissions/:id`,
    DELETE_COMMISSION: `/commissions/:id`,
};
exports.SPECIAL_PROGRAMS_URL = {
    BASE: `/api/special-programs`,
    GET_SPECIAL_PROGRAM_BY_ID: `/special-programs/:id`,
    CREATE_SPECIAL_PROGRAM: `/special-programs`,
    UPDATE_SPECIAL_PROGRAM: `/special-programs/:id`,
    DELETE_SPECIAL_PROGRAM: `/special-programs/:id`,
};
exports.CONTACTS_URL = {
    BASE: `/api/contacts`,
    GET_CONTACT_BY_ID: `/contacts/:id`,
    CREATE_CONTACT: `/contacts`,
    UPDATE_CONTACT: `/contacts/:id`,
    DELETE_CONTACT: `/contacts/:id`,
};
exports.SCHEDULES_URL = {
    BASE: `/api/schedules`,
    GET_SCHEDULE_BY_ID: `/schedules/:id`,
    CREATE_SCHEDULE: `/schedules`,
    UPDATE_SCHEDULE: `/schedules/:id`,
    DELETE_SCHEDULE: `/schedules/:id`,
};
exports.AUTH_URL = {
    BASE: `/api/auth`,
    REGISTER: `/register`,
    LOGIN: `/login`,
};
exports.UPLOAD_URL = {
    BASE: `/api/upload`,
    UPLOAD_IMAGE: `/upload`,
};
exports.VIDEOS_URL = {
    BASE: `/api/videos`,
    GET_VIDEO_BY_ID: `/videos/:id`,
    CREATE_VIDEO: `/videos`,
    UPDATE_VIDEO: `/videos/:id`,
    DELETE_VIDEO: `/videos/:id`,
};
//# sourceMappingURL=urls.js.map