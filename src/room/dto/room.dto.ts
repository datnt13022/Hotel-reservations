import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
enum type {
    standard=0,
    delux=1,
    studio=2
}
export class RoomDto {
    @IsEnum(type)
    type:number
    @IsNotEmpty()
    @IsString()
    description:string
    @IsNotEmpty()
    @IsString()
    image:string
    @IsNumber()
    @IsNotEmpty()
    quantity:number
    @IsNumber()
    @IsNotEmpty()
    price:number
}
