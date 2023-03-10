import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';
import { AddressDto } from './Address.dto';

export class CustomerDto {
  @ApiProperty()
  customerId: string;

  @ApiProperty()
  facilityId: string;

  @ApiProperty()
  isSystemic: boolean;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  description: string | null;

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];

  @ApiProperty()
  address: AddressDto;
}
