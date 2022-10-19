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
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsEnum(Role)
    role:number;
    
}
