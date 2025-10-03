import { ICreateBookingReqDto } from "./ICreateBookingReqDto";
import { BookingStatus } from '../../../../shared/enum/EBooking.enum';
export interface IUpdateBookingReqDto extends ICreateBookingReqDto {
    status?: BookingStatus;
    confirmedAt?: Date;
    completedAt?: Date;
}
//# sourceMappingURL=IUpdateBookingReqDto.d.ts.map