import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ISocialLink } from 'src/model';

@Table({ tableName: 'developers' })
export class Developers extends Model<Developers> {
    @Column({ allowNull: false, type: DataType.STRING, primaryKey: true })
    id: string;
    @Column({ type: DataType.STRING })
    name: string;
    @Column({ type: DataType.ARRAY(DataType.STRING) })
    info: string[];
    @Column({ type: DataType.BLOB('long') })
    photo: Buffer;
    @Column({ type: DataType.ARRAY(DataType.STRING) })
    skills: string[];
    @Column({ type: DataType.JSON })
    socials: ISocialLink;
}
