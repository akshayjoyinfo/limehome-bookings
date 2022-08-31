import { Column } from "typeorm";

export class BaseEntity{
    @Column({
      name: 'created_at_utc',
      type: 'timestamp with time zone'
    })
    createdAtUtc: Date;
  
    
  
    @Column({
      name: 'created_by',
      length: 50,
    })
    createdBy: string;
  
    
  }