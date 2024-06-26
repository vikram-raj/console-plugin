import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PipelineRunWorkspace } from '../../types';

type EmptyDirectoriesSectionProps = {
  workspaces: PipelineRunWorkspace[];
};

const EmptyDirectoriesSection: React.FC<EmptyDirectoriesSectionProps> = ({
  workspaces,
}) => {
  const { t } = useTranslation('plugin__pipelines-console-plugin');

  if (!workspaces || workspaces.length === 0) return null;

  const emptyDirectoryWorkspaces = workspaces.filter(
    (workspace) => !!workspace.emptyDir,
  );
  if (emptyDirectoryWorkspaces.length === 0) return null;

  return (
    <dl data-test-id="empty-directories-section">
      <dt>{t('Empty Directories')}</dt>
      <dd>
        {emptyDirectoryWorkspaces.map((workspace) => (
          <div key={workspace.name} data-test-id="empty-directory-workspace">
            {t(`Empty Directory ({{workspaceName}})`, {
              workspaceName: workspace.name,
            })}
          </div>
        ))}
      </dd>
    </dl>
  );
};

export default EmptyDirectoriesSection;
