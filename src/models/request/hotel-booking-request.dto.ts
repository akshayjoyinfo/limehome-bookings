import { IsDate, IsDefined, IsEmail, IsInstance, IsInt, IsNotEmptyObject, IsNumber, IsPhoneNumber, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { HotelIdValidator } from "../../bookings/validators/hotel/hotel-id-validator";
import { BookingAvailableValidator } from "../../bookings/validators/booking/booking_available.validator";

export class HotelBookngParam{
    @IsInt()
    @Validate(HotelIdValidator)
    hotelId: number
}

export class GuestDetail {
    @ApiProperty()
    @MaxLength(50)
    @MinLength(1)
    name: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsPhoneNumber()
    phone: string
}


export class CreateHotelBookingRequest{
    @ApiProperty()
    @IsInt()
    @Validate(HotelIdValidator)
    hotelId: number

    @ApiProperty()
    @IsDate()
    checkInDate: Date

    @ApiProperty()
    @IsDate()
    checkOutDate: Date
    
    @ApiProperty()
    @IsNumber()
    amount: number

    @ApiProperty()
    @IsInt()
    rooms: number
    
    @ApiProperty()
    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @Type(() => GuestDetail)
    guest: GuestDetail
}

