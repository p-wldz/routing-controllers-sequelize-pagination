import { IsNumber } from "class-validator";

export class PaginationDto {
  search: string;
  order: string;
  filters: string;
  @IsNumber()
  page: number = 1;
  @IsNumber()
  limit: number = 5;
}
