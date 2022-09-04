import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class ApiContracts {
  public static LIMEHOME_BOOKINGS_API_Health = {
    description: 'Status for Limehome Bookings API',
    summary: 'Health check endpoint for Limehome Bookings API',
    tags: ['Status'],
  } as OperationObject;

  public static LIMEHOME_BOOKINGS_API_Here_Hotels = {
    description: 'Retrieve Hotels then import to LIME HOME DB based on the Coordinates',
    summary: 'Retrieve Hotels then import to LIME HOME DB based on the Coordinates',
    tags: ['Here'],
  } as OperationObject;

  public static LIMEHOME_BOOKINGS_API_Hotels_Search= {
    description: 'Search Hotels from Lime Home booking DB',
    summary: 'Search Hotels from Lime Home booking DB',
    tags: ['LimeHome'],
  } as OperationObject;

  public static LIMEHOME_BOOKINGS_API_Hotels_Booking = {
    description: 'Book room(s) in LimeHome activated hotels',
    summary: 'Book room(s) in LimeHome activated hotels',
    tags: ['LimeHome'],
  } as OperationObject;

  public static LIMEHOME_BOOKINGS_API_Hotels_Retrieve_Bookings = {
    description: 'Get Bookings in Given Hotel',
    summary: 'Get Bookings in Given Hotel',
    tags: ['LimeHome'],
  } as OperationObject;
}


