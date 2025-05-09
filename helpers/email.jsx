// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Html,
//   Preview,
//   Section,
//   Text,
// } from '@react-email/components';
// import * as React from 'react';

// const main = {
//   backgroundColor: '#ffffff',
//   color: '#24292e',
//   fontFamily:
//         '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
// };

// const container = {
//   maxWidth: '480px',
//   margin: '0 auto',
//   padding: '20px 0 48px',
// };

// const title = {
//   fontSize: '24px',
//   lineHeight: 1.25,
// };

// const section = {
//   padding: '24px',
//   border: 'solid 1px #dedede',
//   borderRadius: '5px',
//   textAlign: 'center',
// };

// const text = {
//   margin: '0 0 10px 0',
//   textAlign: 'left',
// };

// const button = {
//   fontSize: '14px',
//   backgroundColor: '#28a745',
//   color: '#fff',
//   lineHeight: 1.5,
//   borderRadius: '0.5em',
//   padding: '12px 24px',
// };

// const footer = {
//   color: '#6a737d',
//   fontSize: '12px',
//   textAlign: 'center',
//   marginTop: '60px',
// };

// export function Email(props) {
//   const {
//     userName, firstName, lastName, verificationToken,
//   } = props;

//   return (
//     <Html lang="en">
//       <Head />
//       <Preview>
//         Thank you for signing up,
//         {' '}
//         {userName}
//         !
//       </Preview>
//       <Body style={main}>
//         <Container style={container}>
//           <Text style={title}>
//             <strong>
//               @
//               {userName}
//             </strong>
//             , welcome to Global Green! 🌎
//           </Text>

//           <Section style={section}>
//             <Text style={text}>
//               Hey
//               {' '}
//               <strong>{`${firstName} ${lastName}`}</strong>
//               !
//             </Text>
//             <Text style={text}>
//               Please verify your email address by entering
//               the following token in the verification page:
//             </Text>

//             <Button style={button}>{verificationToken}</Button>
//           </Section>
//           <Text style={footer}>
//             Global Green. All rights reserved.
//           </Text>
//         </Container>
//       </Body>

//     </Html>
//   );
// }

// export default Email;

import React from 'react';

export function Email({ userName, firstName, lastName, verificationToken }) {
  return (
    <div>
      <head>
        <title>Welcome to Global Green</title>
      </head>
      <body
        style={{
          backgroundColor: '#ffffff',
          color: '#24292e',
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            padding: '20px 0 48px',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              lineHeight: 1.25,
            }}
          >
            <strong>@{userName}</strong>, welcome to Global Green! 🌎
          </h1>

          <div
            style={{
              padding: '24px',
              border: 'solid 1px #dedede',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 0 10px 0',
                textAlign: 'left',
              }}
            >
              Hey <strong>{`${firstName} ${lastName}`}</strong>!
            </p>
            <p
              style={{
                margin: '0 0 10px 0',
                textAlign: 'left',
              }}
            >
              Please verify your email address by entering the following token
              in the verification page:
            </p>

            <button
              style={{
                fontSize: '14px',
                backgroundColor: '#28a745',
                color: '#fff',
                lineHeight: 1.5,
                borderRadius: '0.5em',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {verificationToken}
            </button>
          </div>
          <p
            style={{
              color: '#6a737d',
              fontSize: '12px',
              textAlign: 'center',
              marginTop: '60px',
            }}
          >
            Global Green. All rights reserved.
          </p>
        </div>
      </body>
    </div>
  );
}

export default Email;
