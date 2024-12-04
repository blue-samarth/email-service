import { EmailService } from "./emailService";
import { MockEmailProvider } from "./providers/mockProvider";

// Initialize the mock provider and email service
const mockProvider = new MockEmailProvider();
const emailService = new EmailService([mockProvider]);

// Use the email service
emailService.sendEmail("test@example.com", "Hello", "This is a test email")
    .then(() => console.log("Email sent successfully"))
    .catch(error => console.error("Failed to send email:", error));
