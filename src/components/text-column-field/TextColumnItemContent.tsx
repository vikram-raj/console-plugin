import * as React from 'react';
import {
  Flex,
  FlexItem,
  TextInputTypes,
  Button,
  ButtonVariant,
  ButtonType,
  Tooltip,
} from '@patternfly/react-core';
import { GripVerticalIcon } from '@patternfly/react-icons/dist/esm/icons/grip-vertical-icon';
import { MinusCircleIcon } from '@patternfly/react-icons/dist/esm/icons/minus-circle-icon';
import { useTranslation } from 'react-i18next';
import {
  TextColumnItemProps,
  TextColumnFieldChildParameterProps,
  MergeNewValueUtil,
} from './text-column-types';
import InputField from '../pipelines-details/multi-column-field/InputField';

export type TextColumnItemContentProps = TextColumnItemProps & {
  previewDropRef: (node) => void | null;
  dragRef: (node) => void | null;
  opacity: number;
};

const DEFAULT_CHILDREN = (
  props: TextColumnFieldChildParameterProps,
  mergeNewValue: MergeNewValueUtil,
) => {
  const { name, onChange, ...otherProps } = props;

  return (
    <InputField
      {...otherProps}
      name={name}
      type={TextInputTypes.text}
      onChange={(e) => {
        if (onChange) {
          const values = mergeNewValue(e.target.value);
          onChange(values);
        }
      }}
    />
  );
};

const TextColumnItemContent: React.FC<TextColumnItemContentProps> = ({
  name,
  dndEnabled,
  children = DEFAULT_CHILDREN,
  idx,
  isReadOnly,
  placeholder,
  onChange,
  arrayHelpers,
  rowValues,
  disableDeleteRow,
  tooltipDeleteRow,
  previewDropRef,
  dragRef,
  opacity,
}) => {
  const { t } = useTranslation();

  const mergeNewValue: MergeNewValueUtil = (newValue) => {
    const values: string[] = [...rowValues];
    values[idx] = newValue;

    return values;
  };

  return (
    <div ref={previewDropRef} style={{ opacity }}>
      <Flex
        alignItems={{ default: 'alignItemsFlexStart' }}
        style={{ marginBottom: 'var(--pf-v5-global--spacer--sm)' }}
      >
        {dndEnabled && (
          <FlexItem style={{ cursor: 'move' }}>
            <div ref={dragRef}>
              <GripVerticalIcon />
            </div>
          </FlexItem>
        )}
        <FlexItem grow={{ default: 'grow' }}>
          {children(
            { name: `${name}.${idx}`, isReadOnly, placeholder, onChange },
            mergeNewValue,
          )}
        </FlexItem>
        {!isReadOnly && (
          <FlexItem>
            <Tooltip
              content={
                tooltipDeleteRow || t('plugin__pipelines-console-plugin~Remove')
              }
            >
              <Button
                aria-label={
                  tooltipDeleteRow ||
                  t('plugin__pipelines-console-plugin~Remove')
                }
                variant={ButtonVariant.plain}
                type={ButtonType.button}
                isInline
                isDisabled={disableDeleteRow}
                onClick={() => {
                  arrayHelpers.remove(idx);
                  if (onChange) {
                    const values = [...rowValues];
                    values.splice(idx, 1);
                    onChange(values);
                  }
                }}
              >
                <MinusCircleIcon />
              </Button>
            </Tooltip>
          </FlexItem>
        )}
      </Flex>
    </div>
  );
};

export default TextColumnItemContent;
