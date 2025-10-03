"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatus = exports.Duration = void 0;
var Duration;
(function (Duration) {
    Duration["HALF_HOUR"] = "30_minutes";
    Duration["ONE_HOUR"] = "1_hour";
    Duration["ONE_AND_HALF_HOURS"] = "1.5_hours";
    Duration["TWO_HOURS"] = "2_hours";
    Duration["THREE_HOURS"] = "3_hours";
    Duration["FOUR_HOURS"] = "4_hours";
    Duration["FULL_DAY"] = "full_day";
    Duration["MULTIPLE_DAYS"] = "multiple_days";
})(Duration || (exports.Duration = Duration = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["IN_PROGRESS"] = "in_progress";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["CANCELLED"] = "cancelled";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
//# sourceMappingURL=EBooking.enum.js.map