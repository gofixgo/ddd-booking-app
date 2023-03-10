import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonGroup } from '@chakra-ui/react';

import { ContactType } from 'types';
import { ContactInputs, FormProvider, useForm } from 'shared/FormV2';
import { IndentLabel, IndentList, List } from 'shared/IndentiationList';
import { Divider, Header, Heading, ListItem, SubHeading } from 'shared/DescriptionListV2';

import { CreateFacilityFormDto } from '../../../application/types';
import { useFacilityFormStore } from '../createFacilityFormStore';
import { FormStepHeader } from '../FormStepHeader';
import { PreviousStepButton } from '../PreviousStepButton';
import { NextStepButton } from '../NextStepButton';
import { ContactPersonInputs } from './ContactPersonInputs';
import { Form } from '../Form';

const ContactStep = () => {
  const { formatMessage } = useIntl();
  const step = useFacilityFormStore(store => store.step);
  const data = useFacilityFormStore(store => store.data);

  const methods = useForm<Partial<CreateFacilityFormDto>>({
    defaultValues: {
      ...data,
      contacts:
        data.contacts && data.contacts.length > 0
          ? data.contacts
          : [
              {
                type: ContactType.Phone,
                value: '',
              },
              {
                type: ContactType.Email,
                value: '',
              },
            ],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form id='add-facility-third-step'>
        <List>
          <ListItem>
            <FormStepHeader>
              {formatMessage({
                id: 'add-facility-step-three',
                defaultMessage: 'Step 3: Contact and administration info',
              })}
            </FormStepHeader>
          </ListItem>
          <IndentLabel>
            <Header>
              <Heading>
                {formatMessage({
                  id: 'contact',
                  defaultMessage: 'Contact',
                })}
              </Heading>
              <SubHeading>
                {formatMessage({
                  id: 'facility-contact-description',
                  defaultMessage: 'The contact list necessary for communication between the facility and its customers.',
                })}
              </SubHeading>
            </Header>
          </IndentLabel>
          <IndentList columns={12} spacingY={6}>
            <ContactInputs />
          </IndentList>
          <Divider />
          <IndentLabel>
            <Header>
              <Heading>
                {formatMessage({
                  id: 'facility-contact-person',
                  defaultMessage: 'Contact person',
                })}
              </Heading>
              <SubHeading>
                {formatMessage({
                  id: 'contact-person-description-info',
                  defaultMessage: 'Data of the person who can be contacted by the booking service administrator.',
                })}
              </SubHeading>
            </Header>
          </IndentLabel>
          <IndentList columns={6} spacingY={6}>
            <ContactPersonInputs />
          </IndentList>
          <Divider />
          <IndentLabel>
            <ButtonGroup>
              <PreviousStepButton formStep={step} />
              <NextStepButton formStep={step} />
            </ButtonGroup>
          </IndentLabel>
        </List>
      </Form>
    </FormProvider>
  );
};

export { ContactStep };
