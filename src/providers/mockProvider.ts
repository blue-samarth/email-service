import { EmailProvider } from "../types";

export class MockEmailProvider implements EmailProvider {
    async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
        console.log(`MockEmailProvider: Sending email to ${to}`);
        return true; // Simulate a successful email send
    }
}
