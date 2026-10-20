import { IsEmail, IsString, IsStrongPassword } from "class-validator";


export class createUserDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}