import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class Users extends Model<Users> {
    @Column({ allowNull: false, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({
        type: DataType.STRING,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @Column({ type: DataType.STRING })
    password: string;
}
