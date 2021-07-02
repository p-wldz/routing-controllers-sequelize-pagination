import {
    Get,
    Param,
    JsonController,
    QueryParams,
} from 'routing-controllers'
import { PaginationDto } from '../types/dtos/pagination.dto';
import * as placeService from '../services/place.service';

@JsonController()
export default class {

    @Get('/places')
    async places(
        @QueryParams({ validate: false }) pagination?: PaginationDto
    ) {
        return await placeService.getPlacesWithPagination(pagination);
    }
}