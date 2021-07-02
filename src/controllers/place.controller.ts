import {
    Get,
    Param,
    JsonController,
} from 'routing-controllers'
import County from '../database/models/county.db.model';
import Voivodeship from '../database/models/voivodeship.db.model';
import Place from '../database/models/place.db.model'

@JsonController()
export default class {

    @Get('/places')
    async places() {
        const places = await Place.findAll({
            include: [
                Voivodeship, County
            ]
        });
        return places.map(place => place.toJSON());

    }
}