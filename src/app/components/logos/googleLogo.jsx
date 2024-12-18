import { React } from 'react';
import Image from 'next/image';

function GoogleLogo() {
  return (
    <Image
      src="/google_logo.svg"
      width={35}
      height={35}
      style={{ padding: '0px', margin: '0px', marginRight: '5px' }}
      alt="organization logo"
    />
  );
}

export default GoogleLogo;
