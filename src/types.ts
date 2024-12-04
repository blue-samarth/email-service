// Purpose: Define core types and interfaces for the entire email service
// This provides type safety and a clear contract for how components interact

export enum EmailStatus {
    PENDING = 'PENDING',
    SENT = 'SENT',
    FAILED = 'FAILED'
  }
  
  export interface Email {
    to: string;
    from: string;
    subject: string;
    body: string;
    // Optional metadata
    id?: string;
    timestamp?: number;
  }
  
  export interface EmailProvider {
    // Contract for all email providers
    sendEmail(email: Email): Promise<boolean>;
  }
  
  export interface EmailServiceConfig {
    // Configuration options for the email service
    maxRetries?: number;
    baseDelay?: number;
    rateLimit?: number;
  }