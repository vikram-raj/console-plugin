import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { BUILDER_NODE_ADD_RADIUS } from './const';
import InstallingNodeDecorator from './InstallingNodeDecorator';

import './LoadingTask.scss';
import { truncateMiddle } from './truncate-middle';
import { t } from '../utils/common-utils';

type LoadingTaskProps = {
  width: number;
  height: number;
  name: string;
};

const LoadingTask: React.FC<LoadingTaskProps> = ({ width, height, name }) => {
  const textRef = React.useRef();
  const truncatedName = React.useMemo(
    () => truncateMiddle(name, { length: 10, truncateEnd: true }),
    [name],
  );
  return (
    <g>
      <rect
        width={width}
        height={height}
        rx={15}
        className={'opp-pipeline-vis-loading-node'}
      />
      <g>
        <InstallingNodeDecorator
          x={0}
          y={BUILDER_NODE_ADD_RADIUS / 4}
          content={t('Installing')}
        />
      </g>
      <Tooltip triggerRef={textRef} content={name}>
        <text
          ref={textRef}
          className="opp-pipeline-vis-loading-node__name"
          x={width / 2}
          y={height / 2 + 1}
        >
          {truncatedName}
        </text>
      </Tooltip>
    </g>
  );
};

export default LoadingTask;
