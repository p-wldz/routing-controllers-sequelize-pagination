import {Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey, AllowNull, Unique, ForeignKey, BelongsTo} from 'sequelize-typescript';
import Place from './place.db.model';

@Table
export default class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(42))
    email: string;

    @AllowNull
    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    photo: string;

    @Column(DataType.STRING)
    phoneNumber: string;

    @AllowNull
    @ForeignKey(() => Place)
    @Column(DataType.INTEGER)
    placeId: number;

    @BelongsTo(() => Place)
    place: Place;
}
