import React from 'react';
import {
  FontAwesomeIcon,
  Props as IconProps,
} from '@fortawesome/react-fontawesome';

type Props = {} & IconProps;
const Icon: React.FC<Props> = ({ ...rest }) => {
  return <FontAwesomeIcon {...rest} />;
};

export default Icon;
