import { NextResponse } from "next/server";
import { LeadSubmissionSchema } from "../../lib/validators";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = LeadSubmissionSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { status: "error", errors: result.error.errors },
                { status: 400 }
            );
        }

        const lead = result.data;

        // TODO: Integrate with CRM or Email Service (e.g. Resend, SendGrid)
        // For now, we log to the server console as requested.
        console.log("------------------------------------------------");
        console.log("NEW HOME VALUE LEAD RECEIVED");
        console.log("timestamp:", new Date().toISOString());
        console.log("Contact:", lead.email, lead.phone);
        console.log("Property:", lead.propertyDetails);
        console.log("Timeframe:", lead.timeframe);
        console.log("------------------------------------------------");

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Lead API Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
