import { ProgressBar } from 'react-loader-spinner';

const Loader = ({visible}) => {
  return (
    <ProgressBar
      visible={visible}
      height="80"
      width="80"
      barColor="blueviolet"
      borderColor='white'
      ariaLabel="progress-bar-loading"
    />
  );
};

export default Loader;
