import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Genders } from 'src/model';

@Table({ tableName: 'Users', timestamps: false })
export class Users extends Model<Users> {
    @Column({ allowNull: false, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING }) nameFirst: string;

    @Column({ type: DataType.STRING }) nameLast: string;

    @Column({
        type: DataType.STRING,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @Column({ type: DataType.DATE, allowNull: true }) createdAt?: Date | null;
    @Column({ type: DataType.DATE, allowNull: true }) updatedAt?: Date | null;

    @Column({ type: DataType.STRING })
    password: string;

    @Column({ type: DataType.ENUM, values: ['Male', 'Female'], allowNull: true, defaultValue: Genders.MALE })
    gender: Genders;

    @Column({ type: DataType.STRING })
    birthDate: Date | null;
}
