import React from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiAccount } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Header = () => {
  const { formatMessage } = useIntl();

  const title = formatMessage({
    id: 'add-employee',
    defaultMessage: 'Add employee',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='employees-heading' defaultMessage='Employees' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='employees-subheading' defaultMessage='Manage your employee list' />
        </Text>
      </VStack>
      {isMobileOnly ? (
        <IconButton colorScheme='primary' variant='solid' title={title} icon={<Icon path={mdiAccount} color='gray.800' />} />
      ) : (
        <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />}>
          {title}
        </Button>
      )}
    </Flex>
  );
};

export { Header };
