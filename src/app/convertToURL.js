const convertToURL = (imageName) => `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${imageName}`;
export default convertToURL;
