import { Entity } from 'shared/domain';
import { Result } from 'shared/core';

import { OfferId } from './OfferId';
import { FacilityId } from './FacilityId';
import { OfferName } from './OfferName';
import { OfferVariants } from './OfferVariants';

interface IProps {
  offerId: OfferId;
  facilityId: FacilityId;
  offerName: OfferName;
  variants: OfferVariants;
}

export class Offer extends Entity<IProps> {
  get offerId() {
    return OfferId.create(this._id).getValue();
  }

  get facilityId() {
    return this.props.facilityId.id.toString();
  }

  get name() {
    return this.props.offerName;
  }

  get variants() {
    return this.props.variants;
  }

  public static create(props: IProps): Result<Offer> {
    return Result.ok(new Offer(props));
  }
}
