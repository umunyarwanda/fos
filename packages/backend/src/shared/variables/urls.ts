export const BASE_URL = 'http://localhost:3000/api';

export const EVENTS_URL = {
  BASE: `/api/events`,
  GET_EVENT_BY_ID: `/events/:id`,
  CREATE_EVENT: `/events`,
  UPDATE_EVENT: `/events/:id`,
  DELETE_EVENT: `/events/:id`,
}

export const USERS_URL = {
  BASE: `/api/users`,
  GET_USER_BY_ID: `/users/:id`,
  CREATE_USER: `/users`,
  UPDATE_USER: `/users/:id`,
  DELETE_USER: `/users/:id`,
}

export const BOOKINGS_URL = {
  BASE: `/api/bookings`,
  GET_PENDING_BOOKINGS: `/bookings/pending`,
  GET_BOOKING_BY_ID: `/bookings/:id`,
  CREATE_BOOKING: `/bookings`,
  UPDATE_BOOKING: `/bookings/:id`,
  DELETE_BOOKING: `/bookings/:id`,
}

export const COMMISSIONS_URL = {
  BASE: `/api/commissions`,
  GET_COMMISSION_BY_ID: `/commissions/:id`,
  CREATE_COMMISSION: `/commissions`,
  UPDATE_COMMISSION: `/commissions/:id`,
  DELETE_COMMISSION: `/commissions/:id`,
}

export const SPECIAL_PROGRAMS_URL = {
  BASE: `/api/special-programs`,
  GET_SPECIAL_PROGRAM_BY_ID: `/special-programs/:id`,
  CREATE_SPECIAL_PROGRAM: `/special-programs`,
  UPDATE_SPECIAL_PROGRAM: `/special-programs/:id`,
  DELETE_SPECIAL_PROGRAM: `/special-programs/:id`,
}

export const CONTACTS_URL = {
  BASE: `/api/contacts`,
  GET_CONTACT_BY_ID: `/contacts/:id`,
  CREATE_CONTACT: `/contacts`,
  UPDATE_CONTACT: `/contacts/:id`,
  DELETE_CONTACT: `/contacts/:id`,
}

export const SCHEDULES_URL = {
  BASE: `/api/schedules`,
  GET_SCHEDULE_BY_ID: `/schedules/:id`,
  CREATE_SCHEDULE: `/schedules`,
  UPDATE_SCHEDULE: `/schedules/:id`,
  DELETE_SCHEDULE: `/schedules/:id`,
}

export const AUTH_URL = {
  BASE: `/api/auth`,
  REGISTER: `/register`,
  LOGIN: `/login`,
}

export const UPLOAD_URL = {
  BASE: `/api/upload`,
  UPLOAD_IMAGE: `/upload`,
}
