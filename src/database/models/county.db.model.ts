import { Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey, BelongsTo, ForeignKey, NotNull, AllowNull } from 'sequelize-typescript';
import Voivodeship from './voivodeship.db.model';

@Table
export default class County extends Model<County> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.TEXT)
    name: string;

    @AllowNull
    @ForeignKey(() => Voivodeship)
    @Column(DataType.INTEGER)
    voivodeshipId: number;

    @BelongsTo(() => Voivodeship)
    voivodeship: Voivodeship;
}