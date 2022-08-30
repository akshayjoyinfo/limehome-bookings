import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class ApiContracts {
  public static LIMEHOME_BOOKINGS_API_Health = {
    description: 'Status for Limehome Bookings API',
    summary: 'Health check endpoint for Limehome Bookings API',
    tags: ['Status'],
  } as OperationObject;

  public static LIMEHOME_BOOKINGS_API_Here_Hotels = {
    description: 'Retrieve Hotels based on the Coordinates',
    summary: 'Retrieve Hotels based on the Coordinates via HERE Api',
    tags: ['Here'],
  } as OperationObject;
}
