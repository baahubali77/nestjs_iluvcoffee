import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {

    // @Type(()=>Number)


    @IsPositive()
    @IsOptional()
    limit: number;

    @IsPositive()
    @IsOptional()
    offset: number;
}
