import * as React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { TektonResource } from '../../../types';
import { PipelineBuilderFormikValues } from '../types';
import FormSelectField, {
  FormSelectFieldOption,
} from '../../common/FormSelectField';

type TaskSidebarResourceProps = {
  availableResources: TektonResource[];
  hasResource: boolean;
  name: string;
  resource: TektonResource;
};

interface ResourceLink {
  name: string;
  resource: string;
}

const TaskSidebarResource: React.FC<TaskSidebarResourceProps> = (props) => {
  const { t } = useTranslation('plugin__pipelines-console-plugin');
  const { getFieldMeta, setFieldValue } =
    useFormikContext<PipelineBuilderFormikValues>();
  const {
    availableResources,
    hasResource,
    name,
    resource: { name: resourceName, type: resourceType, optional = false },
  } = props;

  const dropdownResources = availableResources.filter(
    (resource) => resourceType === resource.type && !!resource.name?.trim(),
  );

  const currentLinkedResourceName =
    getFieldMeta<ResourceLink>(name).value?.resource;
  const currentLinkedResourceSelectable =
    currentLinkedResourceName &&
    dropdownResources.some(
      (resource) => resource.name === currentLinkedResourceName,
    );

  const options: FormSelectFieldOption[] = [
    {
      label: optional
        ? t('No {{resourceType}} resource', { resourceType })
        : t('Select {{resourceType}} resource...', {
            resourceType,
          }),
      value: '',
      isPlaceholder: true,
      isDisabled: !optional,
    },
  ];
  if (currentLinkedResourceName && !currentLinkedResourceSelectable) {
    options.push({
      label: currentLinkedResourceName,
      value: currentLinkedResourceName,
      isDisabled: true,
    });
  }
  options.push(
    ...dropdownResources.map((resource) => ({
      label: resource.name,
      value: resource.name,
    })),
  );

  return (
    <FormSelectField
      name={`${name}.resource`}
      label={resourceName}
      helpText={t('Only showing resources for this type ({{resourceType}}).', {
        resourceType,
      })}
      options={options}
      isDisabled={options.length === 1}
      onChange={(selectedResource: string) => {
        if (!hasResource) {
          setFieldValue(name, {
            name: resourceName,
            resource: selectedResource,
          });
        }
      }}
      required={!optional}
    />
  );
};

export default TaskSidebarResource;
