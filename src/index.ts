import { EmailService } from './emailService';
import { MockProviderA, MockProviderB } from './providers/mockProvider';
import { Email, EmailStatus } from './types';

async function main() {
  // Create providers
  const providerA = new MockProviderA();
  const providerB = new MockProviderB();

  // Initialize email service with providers
  const emailService = new EmailService([providerA, providerB]);

  // Example email
  const email: Email = {
    to: 'recipient@example.com',
    from: 'sender@example.com',
    subject: 'Test Email',
    body: 'This is a test email'
  };

  // Send email and log status
  const status = await emailService.sendEmail(email);
  console.log('Email send status:', status);
}

// Run the example
main().catch(console.error);