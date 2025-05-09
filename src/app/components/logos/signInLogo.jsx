import { React } from 'react';
import Image from 'next/image';

function SignInLogo() {
  const signInLogoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={signInLogoStyle}>
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        style={{ paddingTop: '9px' }}
        alt="organization logo"
      />
      <div>Global Green Scholars</div>
    </div>
  );
}

export default SignInLogo;
