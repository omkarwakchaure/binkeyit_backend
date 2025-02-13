const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div>
  <p> Dear ${name},</p>
  <p>You are requested to password reset.Please use following otp code to reset your password.</p>
   <div style='background:gray; font-size:20px>
    ${otp}
   </div>
   <p>This otp is valid for only 1hr. Enter this otp in binkeyit website to proceed with resetting your password.</p>
   <br>
   <br>
   <p>Thanks</p>
   <p>Binkeyit Team</p>
  </div>
  `;
};
