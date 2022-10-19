import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
enum type {
    standard=0,
    delux=1,
    studio=2
}
export class RoomDto {
    @IsEnum(type)
    @ApiProperty()
    type:number
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description:string
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    image:string
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quantity:number
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price:number
}
