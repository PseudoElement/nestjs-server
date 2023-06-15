import { Entity, PrimaryColumn, Column } from 'typeorm'
import { Genders } from './model';

@Entity('users')
export class User {
    @PrimaryColumn() id: number;
    @Column({ name: 'login', type: 'varchar' }) login: string;
    @Column({ name: 'email', type: 'varchar' }) email: string;
    @Column({ name: 'phone', type: 'varchar' }) phone: string;
    @Column({ name: 'password', type: 'varchar' }) password: string;
    @Column({ name: 'name_first', type: 'varchar' }) nameFirst: string;
    @Column({ name: 'name_last', type: 'varchar' }) nameLast: string;
    @Column({ name: 'name_patronymic', type: 'varchar', nullable: true }) namePatronymic: string;
    @Column({ name: 'display_name', type: 'varchar', nullable: true }) displayName: string;
    @Column({ name: 'birth_date', type: 'timestamp', nullable: true }) birthDate: Date;
    @Column({ name: 'gender', type: 'enum', enum: Genders, default: Genders.MALE, nullable: true }) gender: Genders | null;
    @Column({ name: 'is_cookies_accepted', type: 'varchar', default: false }) isCookiesAccepted: boolean;
}
