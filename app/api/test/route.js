import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "API працює! Ресторан «Веранда»",
    timestamp: new Date().toISOString(),
  });
}
