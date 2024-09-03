import { 
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
 } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

//varibaction-email
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successFully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Error sending email: ${error}`);
  }
};


//welcome-email
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "81fc0298-6257-4079-b588-c89beff0850e",
      template_variables: {
        company_info_name: "Jerin Auth Company",
        name: name,
      },
    });

    console.log("Welcome email sent successFully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

//reset password token

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
      const response = await mailtrapClient.send({
          from: sender,
          to: recipient,
          subject: "Reset your password",
          html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
          category: "Password Reset",
      });

      // if (response && response.success) {
      //     console.log('Password reset email sent successfully');
      // } else {
      //     console.error('Failed to send password reset email', response);
      //     throw new Error('Failed to send password reset email');
      // }
      
  } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Error sending password reset email');
  }
}


//sendresetemailsuccess
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    // Ensure sender and template are defined
    if (!sender || !PASSWORD_RESET_SUCCESS_TEMPLATE) {
      throw new Error('Email sender or template not defined');
    }

    // Send the email
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    // Log the response for debugging purposes
    console.log("Password reset success email sent:", response);

  } catch (error) {
    console.error('Error sending reset success email:', error.message);
    
    // Re-throw the error to handle it in the calling function
    throw new Error('Failed to send password reset success email');
  }
}
