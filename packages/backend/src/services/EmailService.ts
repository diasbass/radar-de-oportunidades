import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Inicializa o cliente do Resend com a nossa chave de API
const resend = new Resend(process.env.RESEND_API_KEY);

interface AlertEmailParams {
  to: string;
  projectName: string;
  targetApy: number;
  currentApy: number;
}

class EmailService {
  public async sendAlertEmail({ to, projectName, targetApy, currentApy }: AlertEmailParams) {
    console.log(`Sending alert email to: ${to}`);
    
    try {
      const { data, error } = await resend.emails.send({
        from: 'DeFi Yield Finder <onboarding@resend.dev>',
        to: [to],
        subject: `🚀 APY Alert for ${projectName}!`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hi there!</h2>
            <p>Your alert for the <strong>${projectName}</strong> opportunity has been triggered.</p>
            <p>
              You set an alert to be notified when the APY exceeded 
              <strong>${targetApy}%</strong>.
            </p>
            <p>
              The current APY is now <strong>${currentApy.toFixed(2)}%</strong>!
            </p>
            <a 
              href="#" 
              style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #22d3ee; color: #0f172a; text-decoration: none; border-radius: 5px; font-weight: bold;"
            >
              View Opportunity
            </a>
            <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">
              You received this email because you created an alert on DeFi Yield Finder.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
      }

      console.log('Email sent successfully:', data);
      return { success: true, data };

    } catch (error) {
      console.error('An exception occurred while sending email:', error);
      return { success: false, error };
    }
  }
}

export default EmailService;