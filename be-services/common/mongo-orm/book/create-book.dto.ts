import { IsEmail, isInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ParseUUIDPipe } from "common/pipes/string.pipe";
export class CreateBookDtoFromUI {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    readonly fromPinCode: number;
    @IsNumber()
    @IsNotEmpty()
    readonly toPinCode: number;
    
    @IsString()
    readonly fromAddress: string;
    @IsString()
    readonly toAddress: string;
}

export class CreateBookDto extends CreateBookDtoFromUI{
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly status: string;
}