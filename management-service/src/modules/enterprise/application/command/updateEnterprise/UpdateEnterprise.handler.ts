import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { UpdateEnterpriseErrors } from './UpdateEnterprise.errors';
import { UpdateEnterpriseCommand } from './UpdateEnterprise.command';
import { EnterpriseMap } from '../../../adapter';
import { EnterpriseKeys } from '../../../EnterpriseKeys';
import { Enterprise, EnterpriseRepository } from '../../../domain';

export type UpdateEnterpriseResponse = Either<
  | AppError.UnexpectedError
  | AppError.ValidationError
  | UpdateEnterpriseErrors.EnterpriseNotFoundError,
  Result<void>
>;

@CommandHandler(UpdateEnterpriseCommand)
export class UpdateEnterpriseHandler
  implements
    ICommandHandler<UpdateEnterpriseCommand, UpdateEnterpriseResponse> {
  constructor(
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private repository: EnterpriseRepository,
  ) {}

  async execute({
    enterpriseId,
    dto,
  }: UpdateEnterpriseCommand): Promise<UpdateEnterpriseResponse> {
    let enterprise: Enterprise;

    try {
      try {
        enterprise = await this.repository.getEnterpriseById(enterpriseId);
      } catch {
        return left(
          new UpdateEnterpriseErrors.EnterpriseNotFoundError(enterpriseId),
        );
      }

      const enterpriseOrError = EnterpriseMap.dtoToDomain(
        dto,
        enterprise.ownerId.id.toString(),
        enterpriseId,
      );
      if (!enterpriseOrError.isSuccess) {
        return left(Result.fail(enterpriseOrError.error));
      }

      const entity = await this.repository.persist(
        enterpriseOrError.getValue(),
      );
      entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
