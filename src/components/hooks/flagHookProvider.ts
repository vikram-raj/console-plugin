import {
  K8sResourceCommon,
  SetFeatureFlag,
  k8sGet,
} from '@openshift-console/dynamic-plugin-sdk';
import * as React from 'react';
import {
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_APPROVALS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTASKS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTASK_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTRIGGERSBINDINGS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTRIGGERSBINDING_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_EVENTLISTENERS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_EVENTLISTENER_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUNS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAIL_APPROVALS_TAB,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAIL_OUTPUT_TAB,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAIL_TASKRUNS_TAB,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINES_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINES_NAV_OPTION,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINE_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINE_DETAIL_METRICS_TAB,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_REPOSITORIES_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_REPOSITORY_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKRUNS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKRUN_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKS_NAV_OPTION,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASK_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERBINDINGS_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERBINDING_DETAILS,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERS_NAV_OPTION,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERTEMPLATES_LIST,
  FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERTEMPLATE_DETAILS,
  FLAG_PIPELINE_TEKTON_RESULT_INSTALLED,
} from '../../consts';
import { TektonResultModel } from '../../models';

export const useFlagHookProvider = (setFeatureFlag: SetFeatureFlag) => {
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAIL_TASKRUNS_TAB,
    true,
  );
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAIL_OUTPUT_TAB,
    true,
  );

  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINES_NAV_OPTION, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKS_NAV_OPTION, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERS_NAV_OPTION, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINES_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUNS_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_REPOSITORIES_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKS_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKRUNS_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTASKS_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_EVENTLISTENERS_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERTEMPLATES_LIST, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERBINDINGS_LIST, true);
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTRIGGERSBINDINGS_LIST,
    true,
  );
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINE_DETAILS, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAILS, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_REPOSITORY_DETAILS, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASK_DETAILS, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TASKRUN_DETAILS, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTASK_DETAILS, true);
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_EVENTLISTENER_DETAILS, true);
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERTEMPLATE_DETAILS,
    true,
  );
  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_TRIGGERBINDING_DETAILS, true);
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_CLUSTERTRIGGERSBINDING_DETAILS,
    true,
  );

  setFeatureFlag(FLAG_HIDE_STATIC_PIPELINE_PLUGIN_APPROVALS_LIST, true);
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINERUN_DETAIL_APPROVALS_TAB,
    true,
  );
};

export const useTektonResultInstallProvider = (
  setFeatureFlag: SetFeatureFlag,
) => {
  const [data, setData] = React.useState<K8sResourceCommon>();
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const resource = await k8sGet({
          model: TektonResultModel,
          name: 'result',
        });
        setData(resource);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetch();
  }, []);
  setFeatureFlag(FLAG_PIPELINE_TEKTON_RESULT_INSTALLED, data ? true : false);
  setFeatureFlag(
    FLAG_HIDE_STATIC_PIPELINE_PLUGIN_PIPELINE_DETAIL_METRICS_TAB,
    data ? true : false,
  );
};
