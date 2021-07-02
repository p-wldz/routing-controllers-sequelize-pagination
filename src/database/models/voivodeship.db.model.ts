import {Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey} from 'sequelize-typescript';

@Table
export default class Voivodeship extends Model<Voivodeship> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.TEXT)
    name: string;
}
