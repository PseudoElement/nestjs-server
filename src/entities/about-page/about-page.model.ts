import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'developer-cards' })
export class DeveloperCards extends Model<DeveloperCards> {
    @Column({ allowNull: false, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @Column({ type: DataType.STRING })
    name: string;
    @Column({ type: DataType.STRING })
    post: string;
    @Column({ type: DataType.STRING })
    info: string;
    @Column({ type: DataType.STRING })
    path_to_page: string;
    @Column({ type: DataType.BLOB('long') })
    photo: Buffer;
}
