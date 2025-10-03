import { ICreateBookingReqDto } from "./ICreateBookingReqDto";
import { BookingStatus } from '../../../entities/Booking';
export interface IUpdateBookingReqDto extends ICreateBookingReqDto {
    status?: BookingStatus;
}
//# sourceMappingURL=IUpdateBookingReqDto.d.ts.map