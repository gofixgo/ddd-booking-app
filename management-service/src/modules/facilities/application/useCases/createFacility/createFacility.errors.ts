import { Result, UseCaseError } from 'shared/core';

export namespace CreateFacilityErrors {
  export class SlugAlreadyExistsError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `slugAlreadyExists`,
      });
    }
  }
}
