import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'messages' })
export class Messages extends Model<Messages> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
    id: number;
    @Column({ type: DataType.STRING })
    authorEmail: string;
    @Column({ type: DataType.DATE })
    createdAt: Date;
    @Column({ type: DataType.STRING })
    text: string;
}
