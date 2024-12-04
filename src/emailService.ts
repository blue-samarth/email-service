import { EmailProvider } from "./types";

export class EmailService {
    private providers: EmailProvider[];

    constructor(providers: EmailProvider[]) {
        this.providers = providers;
    }

    async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
        for (const provider of this.providers) {
            try {
                return await provider.sendEmail(to, subject, body);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Provider failed: ${error.message}`);
                } else {
                    console.error(`Unknown error occurred: ${String(error)}`);
                }
            }
        }
        throw new Error("All providers failed");
    }
    
}
