import { CreateBookingCommandHandler } from './commands/create-booking-command.handler';
import { IngestHotelsFromHereCommandHandler } from './commands/ingest-hotels-from-here-command.handler';
import { SerachHotelsQueryHandler } from './queries/search-hotels-query.handler';
import { GetHotelBookingsQueryHandler } from './queries/get-hotel-bookings.query.handler';



export const commandHandlers = [IngestHotelsFromHereCommandHandler, CreateBookingCommandHandler];
export const queryHandlers = [SerachHotelsQueryHandler, GetHotelBookingsQueryHandler];
