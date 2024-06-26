import { K8sKind } from '@openshift-console/dynamic-plugin-sdk';

export type MenuAction = {
  label?: string; // omit for t(model.labelKey), which fallbacks to model.label if labelKey is unavailable
  model?: K8sKind;
  onSelection?: (
    key: string,
    thisAction: MenuAction,
    currentURL: string,
  ) => string | undefined;
};

export type MenuActions = { [key: string]: MenuAction };

export type SecondaryButtonAction = {
  label: string;
  href: string;
};
