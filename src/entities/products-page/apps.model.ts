import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'applications' })
export class Applications extends Model<Applications> {
    @Column({ type: DataType.STRING, primaryKey: true, autoIncrement: true })
    id: string;
    @Column({ type: DataType.STRING })
    authorLink: string;
    @Column({ type: DataType.BLOB })
    authorPhoto: Buffer;
    @Column({ type: DataType.STRING })
    url: string;
    @Column({ type: DataType.STRING })
    description: string;
    @Column({ type: DataType.STRING })
    title: string;
}
