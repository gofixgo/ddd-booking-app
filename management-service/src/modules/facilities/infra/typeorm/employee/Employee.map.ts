import { Contact, Contacts, UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import {
  Employee,
  EmployeeName,
  EmployeePosition,
  FacilityId,
} from '../../../domain';
import { BuildEmployeeDto } from '../../BuildEmployee.dto';

export class EmployeeMap {
  public static dtoToDomain<T extends BuildEmployeeDto>(
    dto: T,
    facilityId: string,
    employeeId?: string,
  ): Result<Employee> {
    const name = EmployeeName.create({ value: dto.employeeName });
    const position = EmployeePosition.create({
      value: dto.position,
    });
    const contactList: Contact[] = [];

    dto.contacts.forEach(contact => {
      contactList.push(Contact.create(contact).getValue());
    });

    const contacts = Contacts.create(contactList);

    return Employee.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        name: name.getValue(),
        position: position.getValue(),
        contacts,
      },
      new UniqueEntityID(employeeId),
    );
  }

  public static entityToDomain(entity: any): Employee {
    const name = EmployeeName.create({ value: entity.details.name });
    const position = EmployeePosition.create({
      value: entity.details.position,
    });
    const contactList: Contact[] = [];

    entity.details.contacts.forEach(contact => {
      contactList.push(Contact.create(contact).getValue());
    });

    const contacts = Contacts.create(contactList);

    const employeeOfError = Employee.create(
      {
        facilityId: FacilityId.create(
          new UniqueEntityID(entity.facility_id),
        ).getValue(),
        name: name.getValue(),
        position: position.getValue(),
        contacts,
      },
      new UniqueEntityID(entity.employee_id),
    );

    if (!employeeOfError.isSuccess) {
      console.log(employeeOfError.error);
    }

    return employeeOfError.getValue();
  }

  public static entityToDomainBulk(entities: any[]): Employee[] {
    return entities.map(entity => this.entityToDomain(entity));
  }

  public static toPersistence(employee: Employee): Partial<any> {
    return {
      employee_id: employee.employeeId.id.toString(),
      facility_id: employee.facilityId,
      details: {
        name: employee.name.value,
        position: employee.position.value,
        contacts: employee.contacts.getItems().map(contact => contact.props),
      },
    };
  }
}