import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

enum Role{
    ADMIN=0,
    USER=1,
    CHEF=2
}
export class AdminFnDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
    @IsEnum(Role)
    @ApiProperty()
    role:number;
    
}
