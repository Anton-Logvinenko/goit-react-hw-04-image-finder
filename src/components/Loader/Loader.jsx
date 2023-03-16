import { ThreeDots } from 'react-loader-spinner';

function Loader() {
  return (
    <ThreeDots
      height="400"
      width="400"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
}

export { Loader };
