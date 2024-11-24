/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class DiagnosticoDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
}
