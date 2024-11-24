/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class MedicoDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly especialidad: string;
}
