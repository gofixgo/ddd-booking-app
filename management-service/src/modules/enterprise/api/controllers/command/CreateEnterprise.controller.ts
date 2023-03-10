import { Response } from 'express';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  CreateEnterpriseDto,
  CreateEnterpriseCommand,
  CreateEnterpriseResponse,
} from 'modules/enterprise/application/command/createEnterprise';

import { createEnterpriseSchema } from '../../schemas';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class CreateEnterpriseController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.EnterpriseLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Post('enterprises')
  @ApiTags('Enterprises')
  @ApiResponse({ status: 201, description: 'Enterprise successfully created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createEnterprise(
    @Body() dto: CreateEnterpriseDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        createEnterpriseSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: CreateEnterpriseResponse = await this.commandBus.execute(
        new CreateEnterpriseCommand(dto),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.log('Enterprise successfully created');
      return this.ok(res, {
        enterpriseId: result.value.getValue().id.toString(),
      });
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
