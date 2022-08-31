import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class HereHotelSyncRequest {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  distance = 500;
}
