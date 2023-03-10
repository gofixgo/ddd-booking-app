import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm/index';

import { AbstractEntity } from 'shared/core';
import { IContact, IContactPerson } from 'shared/domain/types';

import {
  Currency,
  IAddress,
  IBusinessCategory,
  IWorkingDay,
} from '../../../domain/types';
import { OfferEntity } from '../offer';
import { EnterpriseEntity } from '../../../../enterprise/infra';
import { CustomerEntity } from '../../../../customers/infra/typeorm';
import { EntityName } from '../../../adapter';

@Entity({ name: EntityName.Facility, schema: 'management' })
export class FacilityEntity extends AbstractEntity {
  @PrimaryColumn()
  facility_id: string;

  @Column({ unique: true })
  slug: string;

  @Column('jsonb')
  details: {
    name: string;
    description: string;
    currency: Currency;
    contactPerson: IContactPerson;
    address: IAddress;
    businessCategories: IBusinessCategory[];
    contacts: IContact[];
    workingDays: IWorkingDay[];
  };

  @OneToMany(() => OfferEntity, (offer) => offer.facility, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  offers: OfferEntity[];

  @OneToMany(() => CustomerEntity, (customer) => customer.facility, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customers: CustomerEntity[];

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.facilities)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @Column()
  enterprise_id: string;
}
