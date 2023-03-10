import React from 'react';
import { SimpleGrid, chakra } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';

import { FormProvider, useForm, TextInput, Select, NumberInput, MoneyInput, CurrencyInput } from 'shared/FormV2';

import { IAddOfferDto, PriceModel } from '../../application/types';
import { useFacilityContextSelector } from '../../../context';

interface IProps {
  onSubmit: (model: IAddOfferDto) => void;
}

const AddOfferForm = ({ onSubmit }: IProps) => {
  const { formatMessage } = useIntl();
  const currency = useFacilityContextSelector(state => state.currency);

  const methods = useForm<IAddOfferDto>({
    defaultValues: {
      offerName: '',
      duration: '' as unknown as number,
      price: {
        value: '',
        type: PriceModel.Constant,
        currency,
      },
    },
  });

  const options = [
    {
      value: PriceModel.Variable,
      label: formatMessage({ id: 'price-model-variable', defaultMessage: 'Variable' }),
    },
    {
      value: PriceModel.Until,
      label: formatMessage({ id: 'price-model-until', defaultMessage: 'Until' }),
    },
    {
      value: PriceModel.Constant,
      label: formatMessage({ id: 'price-model-constant', defaultMessage: 'Constant' }),
    },
    {
      value: PriceModel.Free,
      label: formatMessage({ id: 'price-model-free', defaultMessage: 'Free' }),
    },
  ];

  return (
    <chakra.form id='add-offer-form' data-testid='add-offer-form' noValidate onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <SimpleGrid columns={6} spacing={6} data-testid='debug-footer'>
          <TextInput name='offerName' colSpan={6} isRequired>
            <FormattedMessage id='offer-name' defaultMessage='Offer name' />
          </TextInput>
          <NumberInput
            name='duration'
            colSpan={{ base: 6, md: 4 }}
            isRequired
            register={{
              validate(duration: number) {
                if (duration % 5 == 0) {
                  return true;
                }

                return formatMessage({
                  id: 'duration-invalid-format',
                  defaultMessage: 'Invalid format: must be divisible by 5',
                });
              },
            }}
          >
            <FormattedMessage id='duration-of-offer-min' defaultMessage='Duration of the service (min)' />
          </NumberInput>
          <MoneyInput name='price.value' colSpan={{ base: 4, md: 4 }} isRequired>
            <FormattedMessage id='service-value' defaultMessage={`Service's value`} />
          </MoneyInput>
          <CurrencyInput name='price.currency' colSpan={{ base: 2, md: 2 }} />
          <Select options={options} name='price.type' colSpan={{ base: 4, md: 3 }} isRequired>
            <FormattedMessage id='price-type' defaultMessage='Price type' />
          </Select>
        </SimpleGrid>
      </FormProvider>
    </chakra.form>
  );
};

export { AddOfferForm };
