import React from 'react';
import { mdiDeleteOutline, mdiFilter, mdiLockOutline, mdiTableLargeRemove } from '@mdi/js';
import { useIntl } from 'react-intl';
import { HStack, Text, ButtonGroup, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';

import { ClearFiltersIconButton, FiltersInput } from 'shared/Filters';
import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { Confirm } from 'shared/Confirm';

import { useNotImplementedYet } from 'hooks';

import { OffersCollectionFiltersModal } from './OffersCollectionFiltersModal';
import { useOffersCollectionCheckboxStore } from '../../application';

const OffersCollectionToolbox = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = useOffersCollectionCheckboxStore(store => store.items);

  const title = formatMessage({
    id: 'filters',
    defaultMessage: 'Filters',
  });

  if (items.length > 0) {
    return <SelectedToolbox />;
  }

  return (
    <HStack minH='56px' justify='space-between' w='100%'>
      <FiltersInput
        placeholder={`${formatMessage({
          id: 'search-employee-name-or-position',
          defaultMessage: `Type offer's name`,
        })}...`}
        filterName='name'
      />
      <HStack>
        <OffersCollectionFiltersModal isOpen={isOpen} onClose={onClose} />
        {isMobileOnly ? (
          <IconButton ml={4} title={title} variant='solid' path={mdiFilter} onClick={onOpen} />
        ) : (
          <>
            <ClearFiltersIconButton />
            <Button colorScheme='gray' onClick={onOpen} leftIcon={<Icon path={mdiFilter} />}>
              {title}
            </Button>
          </>
        )}
      </HStack>
    </HStack>
  );
};

const SelectedToolbox = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notImplementedYet = useNotImplementedYet();

  const backgroundColor = useColorModeValue('primary.200', 'primary.400');
  const selectedColor = useColorModeValue('gray.900', 'gray.900');

  const items = useOffersCollectionCheckboxStore(store => store.items);
  const clear = useOffersCollectionCheckboxStore(store => store.clear);

  return (
    <HStack minH='56px' borderRadius='7px' px={4} background={backgroundColor} justify='space-between' w='100%'>
      <Confirm isOpen={isOpen} onClose={onClose} onConfirm={clear} />
      <HStack>
        <IconButton
          icon={<Icon path={mdiTableLargeRemove} color={selectedColor} />}
          title={formatMessage({ id: 'clear-all', defaultMessage: 'Clear all' })}
          onClick={onOpen}
        />
        <Text fontWeight='500' color={selectedColor}>
          {formatMessage(
            { id: 'toolbox-selected', defaultMessage: '{count} items selected' },
            {
              count: <strong>{items.length}</strong>,
            },
          )}
        </Text>
      </HStack>
      <ButtonGroup>
        <Button
          variant='ghost'
          onClick={notImplementedYet}
          color={selectedColor}
          leftIcon={<Icon path={mdiLockOutline} color={selectedColor} />}
        >
          {formatMessage({ id: 'deactivate', defaultMessage: 'Deactivate' })}
        </Button>
        <Button
          variant='ghost'
          onClick={notImplementedYet}
          color={selectedColor}
          leftIcon={<Icon path={mdiDeleteOutline} color={selectedColor} />}
        >
          {formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export { OffersCollectionToolbox };
