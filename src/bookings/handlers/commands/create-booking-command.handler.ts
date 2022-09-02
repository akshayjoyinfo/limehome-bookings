import { BadRequestException, UseFilters } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { validate } from "class-validator";
import { AppExceptionFilter } from "../../../utils/filters/app-exception.filter";
import { CreateBookingCommand } from "../../commands/create-booking.command";
import { IngestHotelsFromHereCommand } from "../../commands/ingest-hotels-from-here.command";

@CommandHandler(CreateBookingCommand)
@UseFilters(AppExceptionFilter)
export class CreateBookingCommandHandler
  implements ICommandHandler<CreateBookingCommand>
{
    constructor(){}

    async execute(command: CreateBookingCommand): Promise<CreateBookingCommand> {
        var validationResults= await validate(command);

        if(validationResults.length>0){
            throw new BadRequestException(validationResults);
        }
        return command;
    }

    
    transformDatesForBookingRequest(command: CreateBookingCommand){

        const timePortion = new Date().getTime() % (3600 * 1000 * 24);
        var checkIn = new Date((+command.bookingRequest.checkInDate - timePortion)+(15*60*60*1000));

        var checkOut = new Date((+command.bookingRequest.checkOutDate - timePortion)+(11*60*60*1000));

        console.log(checkIn);
        console.log(checkOut);
    }

}