import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContactPerson } from 'shared/domain';

import { FacilityEntity } from '../../../facilities/infra';
import { EmployeeEntity } from '../../../employees/infra';
import { EntityName } from '../../adapter';

@Entity({ name: EntityName.Enterprise, schema: 'management' })
export class EnterpriseEntity extends AbstractEntity {
  @PrimaryColumn()
  enterprise_id: string;

  @Column()
  owner_id: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  details: {
    name: string;
    description: string;
    url: string;
    contactPerson: IContactPerson;
  };

  @OneToMany(() => FacilityEntity, (facility) => facility.enterprise, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  facilities: FacilityEntity[];

  @OneToMany(() => EmployeeEntity, (employee) => employee.enterprise, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employees: EmployeeEntity[];
}
