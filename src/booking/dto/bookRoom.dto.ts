import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

enum status {
  ACTIVE = 0,
  DISABLE = 1,
  CANCEL = 2,
  EDITED = 3,
  BOOKED = 4,
}
export class BookRoomDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startDate: Date
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  endDate: Date
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userId: Number;
  @IsNumber({}, { each: true })
  @ApiProperty()
  roomIds: Number[]
  @IsNotEmpty()
  @IsEnum(status)
  @ApiProperty()
  status: Number
}

export interface Book {
  id: number
  createAt: string
  updateAt: string
  startDate: string
  endDate: string
  userId: number
  status: number
}
