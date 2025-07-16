export const resetPasswordHtml = (url: string, email: string) => {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Sentinel Password Reset</title>
  </head>
  <body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">
      You requested a password reset for your Sentinel account.
    </div>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#ffffff">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:30px">
              <tbody>
                <tr>
                  <td style="text-align:center;">
                    <span style="font-size:2rem;font-weight:bold;letter-spacing:2px;">Sentinel</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td data-id="__react-email-column" style="border-bottom:1px solid #e0e0e0;width:100%"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:1.5;margin-top:16px;margin-bottom:16px">Hi ${email},</p>
                    <p style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                      We received a request to reset your Sentinel account password. If you made this request, please click the button below to reset your password:
                    </p>
                    <p style="text-align:center;margin:24px 0;">
                      <a href="${url}" style="background-color:#4f46e5;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block;" target="_blank" rel="noopener" aria-label="Reset your Sentinel password">Reset Password</a>
                    </p>
                    <p style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                      If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                    <p style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                      For help or questions, please contact Sentinel Support.
                    </p>
                    <p style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                      Thanks,<br />The Sentinel Team
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto">
      <tbody>
        <tr>
          <td>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tbody style="width:100%">
                <tr style="width:100%">
                  <td style="text-align:center;padding:16px 0;color:#706a7b;font-size:12px;">
                    © ${new Date().getFullYear()} Sentinel, All Rights Reserved
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
};
