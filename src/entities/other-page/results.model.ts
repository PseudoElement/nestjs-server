import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'random-wheel-results' })
export class RandomWheelResults extends Model<RandomWheelResults> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
    id: number;
    @Column({ type: DataType.STRING })
    username: string;
    @Column({ type: DataType.DATE })
    createdAt: Date;
    @Column({ type: DataType.STRING })
    value: string;
}
