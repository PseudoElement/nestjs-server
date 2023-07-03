import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'messages' })
export class Messages extends Model<Messages> {
    @Column({ type: DataType.STRING, primaryKey: true })
    id: string;
    @Column({ type: DataType.STRING })
    authorEmail: string;
    @Column({ type: DataType.DATE })
    createdAt: Date;
    @Column({ type: DataType.STRING })
    text: string;
}
