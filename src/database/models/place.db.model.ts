import {Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey, BeforeBulkCreate, BelongsTo, ForeignKey, NotNull, AllowNull, Unique} from 'sequelize-typescript';
import County from './county.db.model';
import Voivodeship from './voivodeship.db.model';

@Table
export default class Place extends Model<Place> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @Column(DataType.INTEGER)
    olxId: number;

    @Column(DataType.TEXT)
    name: string;

    @Column(DataType.TEXT)
    fullName: string;
    
    @AllowNull(false)
    @ForeignKey(() => Voivodeship)
    @Column(DataType.INTEGER)
    voivodeshipId: number;

    @BelongsTo(() => Voivodeship)
    voivodeship: Voivodeship;

    @AllowNull(true)
    @ForeignKey(() => County)
    @Column(DataType.INTEGER)
    countyId: number;

    @BelongsTo(() => County)
    county: County;

    @AllowNull(false)
    @Column(DataType.DECIMAL(20, 10))
    lat: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL(20, 10))
    lng: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    commune: string;


}
