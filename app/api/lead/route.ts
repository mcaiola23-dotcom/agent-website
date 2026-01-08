import { NextResponse } from "next/server";
import { LeadSubmissionSchema } from "../../lib/validators";
import { writeClient } from "../../lib/sanity.server";

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

        // Logging for immediate debug
        console.log("------------------------------------------------");
        console.log("NEW HOME VALUE LEAD RECEIVED");
        console.log("Contact:", lead.email, lead.phone);
        console.log("------------------------------------------------");

        // Prepare Sanity Document
        const doc = {
            _type: 'lead',
            source: lead.source || 'unknown',
            fullName: lead.name,
            email: lead.email,
            phone: lead.phone,
            // Property details are optional now
            address: lead.propertyDetails?.address,
            propertyType: lead.propertyDetails?.propertyType,
            beds: lead.propertyDetails?.beds,
            baths: lead.propertyDetails?.baths,
            sqft: lead.propertyDetails?.sqft,

            timeframe: lead.timeframe,
            notes: lead.message, // Map message to notes
            createdAt: new Date().toISOString(),
        };

        // Create in Sanity
        // Note: writeClient requires SANITY_API_WRITE_TOKEN to be set.
        // If not set, it might throw or just fail auth.
        try {
            if (process.env.SANITY_API_WRITE_TOKEN) {
                const response = await writeClient.create(doc);
                return NextResponse.json({ success: true, id: response._id });
            } else {
                console.warn("SANITY_API_WRITE_TOKEN not set. Lead not saved to Sanity.");
                // We still return success to the UI because the email/logging part (conceptual) succeeded
                return NextResponse.json({ success: true, saved: false, message: "Server configuration pending" });
            }
        } catch (sanityError) {
            console.error("Sanity Write Error:", sanityError);
            // Don't fail the user request if Sanity write fails, but log it critical
            return NextResponse.json({ success: true, saved: false, error: "Persistence failed" });
        }

    } catch (error) {
        console.error("Lead API Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
