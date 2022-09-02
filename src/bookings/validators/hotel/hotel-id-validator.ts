import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Repository } from "typeorm";
import { HotelEntity } from "../../entities/hotel.entity";

@ValidatorConstraint({ name: 'HotelExists', async: true })
@Injectable()
export class HotelIdValidator implements ValidatorConstraintInterface {
  constructor(@InjectRepository(HotelEntity)
  private readonly repository: Repository<HotelEntity>) {}

  async validate(value: number) {
    try {
      await this.repository.findOneOrFail({
        where: [{ id: value}]
      })
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Hotel doesn't exist`;
  }
}