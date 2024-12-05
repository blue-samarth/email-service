import crypto from 'crypto';
import { Email, EmailProvider, EmailStatus, EmailServiceConfig } from './types';

export class EmailService {
  private providers: EmailProvider[];
  private config: EmailServiceConfig;
  private sentEmails: Set<string> = new Set();
  private rateLimitTracker: Map<string, number> = new Map();

  constructor(
    providers: EmailProvider[], 
    config: EmailServiceConfig = {
      maxRetries: 3,
      baseDelay: 1000,
      rateLimit: 5
    }
  ) {
    this.providers = providers;
    this.config = config;
  }

  // Generate unique email identifier for idempotency
  private generateEmailId(email: Email): string {
    return crypto
      .createHash('md5')
      .update(JSON.stringify(email))
      .digest('hex');
  }

  // Implement retry mechanism with exponential backoff
  private async retryOperation<T>(
    operation: () => Promise<T>, 
    maxRetries: number = this.config.maxRetries || 3
  ): Promise<T> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await operation();
      } catch (error) {
        retries++;
        if (retries >= maxRetries) throw error;
        
        const delay = (this.config.baseDelay || 1000) * Math.pow(2, retries);
        await new Promise(resolve => setTimeout(resolve, delay));
        
      }
    }
    throw new Error('Max retries exceeded');
  }

  // Main email sending method
  async sendEmail(email: Email): Promise<EmailStatus> {
    // Idempotency check
    const emailId = this.generateEmailId(email);
    if (this.sentEmails.has(emailId)) {
        return EmailStatus.SENT;
    }

    // Attempt to send through multiple providers
    for (const provider of this.providers) {
        try {
            const sendOperation = () => provider.sendEmail(email);
            await this.retryOperation(sendOperation);
            
            // Mark as sent if successful
            this.sentEmails.add(emailId);
            return EmailStatus.SENT;
        } catch (error) {
            // Proper error handling for unknown error type
            if (error instanceof Error) {
                console.error(`Provider failed: ${error.message}`);
            } else {
                console.error('Unknown error occurred while sending email', error);
            }
            continue;
        }
    }

    // All providers failed
    return EmailStatus.FAILED;
    }
}