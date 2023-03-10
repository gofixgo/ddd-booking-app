import React from 'react';
import { InputField, MaskedInputField } from 'react-hook-form-chakra-fields';
import { FormattedMessage } from 'react-intl';

import { masks } from '../Builders';

interface IProps {
  required?: boolean;
}

const ContactPersonFields = ({ required = true }: IProps) => {
  return (
    <>
      <InputField
        colSpan={{ base: 4, md: 3 }}
        name='contactPerson.name'
        label={<FormattedMessage id='name' defaultMessage='Name' />}
        id='contact-person-name'
        required={required}
      />
      <MaskedInputField
        label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />}
        name='contactPerson.phone'
        id='contact-person-phone'
        guide
        mask={masks.phone}
        colSpan={{ base: 4, md: 3 }}
        required={required}
      />
      <MaskedInputField
        label={<FormattedMessage id='fax-number' defaultMessage='Fax' />}
        required={false}
        name='contactPerson.fax'
        id='contact-person-fax'
        guide
        mask={masks.phone}
        colSpan={{ base: 4, md: 3 }}
      />
      <InputField
        name='contactPerson.email'
        label={<FormattedMessage id='email-address' defaultMessage='Email address' />}
        id='contact-person-email'
        colSpan={{ base: 4, md: 3 }}
        required={required}
      />
    </>
  );
};

export { ContactPersonFields };
