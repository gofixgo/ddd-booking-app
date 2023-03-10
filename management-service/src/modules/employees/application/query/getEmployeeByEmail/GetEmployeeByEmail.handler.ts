import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { EmployeeDto } from '../../dto';
import { GetEmployeeByEmailErrors } from './GetEmployeeByEmail.errors';
import { GetEmployeeByEmailQuery } from './GetEmployeeByEmail.query';
import { EmployeeQuery } from '../../../adapter';
import { EmployeeKeys } from '../../../EmployeeKeys';

export type GetEmployeeByEmailResponse = Either<
  AppError.UnexpectedError | GetEmployeeByEmailErrors.EmployeeDoesNotExistError,
  Result<EmployeeDto>
>;

@QueryHandler(GetEmployeeByEmailQuery)
export class GetEmployeeByEmailHandler
  implements
    IQueryHandler<GetEmployeeByEmailQuery, GetEmployeeByEmailResponse> {
  constructor(
    @Inject(EmployeeKeys.EmployeeQuery)
    private employeeQuery: EmployeeQuery,
  ) {}

  async execute({
    employeeEmail,
  }: GetEmployeeByEmailQuery): Promise<GetEmployeeByEmailResponse> {
    let dto;

    try {
      try {
        dto = await this.employeeQuery.getEmployeeByEmail(employeeEmail);
      } catch {
        return left(
          new GetEmployeeByEmailErrors.EmployeeDoesNotExistError(employeeEmail),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
