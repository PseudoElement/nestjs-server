import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'games' })
export class Games extends Model<Games> {
    @Column({ allowNull: false, type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;
    @Column({ type: DataType.STRING })
    authorLink: string;
    @Column({ type: DataType.BLOB })
    appPhoto: Buffer;
    @Column({ type: DataType.STRING })
    url: string;
    @Column({ type: DataType.STRING })
    description: string;
    @Column({ type: DataType.STRING })
    title: string;
}
