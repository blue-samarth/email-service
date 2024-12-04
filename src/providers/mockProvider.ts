import { Email, EmailProvider } from '../types';

// Simulated email providers for testing and development
export class MockProviderA implements EmailProvider {
  async sendEmail(email: Email): Promise<boolean> {
    // Simulate potential failures for testing
    const randomFailure = Math.random() < 0.3; // 30% failure rate
    if (randomFailure) {
      throw new Error('MockProviderA: Simulated sending failure');
    }
    console.log('Email sent via MockProviderA');
    return true;
  }
}

export class MockProviderB implements EmailProvider {
  async sendEmail(email: Email): Promise<boolean> {
    // Different failure characteristics
    const randomFailure = Math.random() < 0.2; // 20% failure rate
    if (randomFailure) {
      throw new Error('MockProviderB: Simulated sending failure');
    }
    console.log('Email sent via MockProviderB');
    return true;
  }
}