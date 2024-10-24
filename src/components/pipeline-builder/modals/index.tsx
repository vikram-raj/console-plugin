import * as React from 'react';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import { global_warning_color_100 as warningColor } from '@patternfly/react-tokens/dist/js/global_warning_color_100';
import ModalContent from './ModalContent';
import { ModalComponent } from '@openshift-console/dynamic-plugin-sdk/lib/app/modal-support/ModalProvider';
import {
  ModalBody,
  ModalComponentProps,
  ModalSubmitFooter,
  ModalTitle,
  ModalWrapper,
} from '../../modals/modal';
import { useTranslation } from 'react-i18next';

type ModalCallback = () => void;

type RemoveModalProps = {
  taskName: string;
  onRemove: ModalCallback;
};

const RemoveTaskModal: ModalComponent<
  RemoveModalProps & ModalComponentProps
> = ({ taskName, closeModal, onRemove }) => {
  const { t } = useTranslation('plugin__pipelines-console-plugin');

  const onSubmit = (e) => {
    onRemove();
    closeModal();
    e.preventDefault();
  };

  return (
    <ModalWrapper onClose={closeModal}>
      <form onSubmit={onSubmit} name="form" className="modal-content">
        <ModalTitle>{t('Remove task')}</ModalTitle>
        <ModalBody>
          <ModalContent
            icon={<ExclamationTriangleIcon color={warningColor.value} />}
            title={t('Remove {{taskName}}?', {
              taskName,
            })}
            message={t('Are you sure you want to remove {{taskName}}?', {
              taskName,
            })}
          />
        </ModalBody>
        <ModalSubmitFooter
          inProgress={false}
          submitText={t('Confirm')}
          cancel={closeModal}
          cancelText={t('Cancel')}
          submitDanger
        />
      </form>
    </ModalWrapper>
  );
};

export default RemoveTaskModal;
