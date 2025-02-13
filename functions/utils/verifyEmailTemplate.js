const verifyEmailTemplate = ({ name, url }) => {
  return ` 
    <p>Dear ${name},</p>
    <p> Thank you for registering with Binkeyit </p>
    <a href=${url} style='color:white; background-color: blue; border-radius: 5px; margin-top:10px'> 
        Verify Email 
    </a>
  `;
};

export default verifyEmailTemplate;
