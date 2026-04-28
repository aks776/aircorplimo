import { useMutation } from "@tanstack/react-query";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby5LHyJtMQhsOJn8mznYv8jq4_Hb2RfxXrhIllQcHOhfGfQQLYtCIXHgf3ytGrGW00/exec";

export type BookingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  stops?: string[]; // multiple stops
  dateTime: string;
  vehicleType: string;
  message?: string;
};

export function useSubmitBooking() {
  return useMutation({
    mutationFn: async (data: BookingData) => {
      // Basic validation (except stops)
      for (const [key, value] of Object.entries(data)) {
        if (key !== "stops" && (!value || (typeof value === "string" && value.trim() === ""))) {
          throw new Error(`Field "${key}" is required.`);
        }
      }

      // Prepare payload: keep stops as array
      const payload = {
        ...data,
        stops: data.stops ? data.stops.filter(s => s.trim() !== "") : [],
      };

      // Send to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server response:", text);
        throw new Error("Booking submission failed");
      }

      // Parse response safely
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return { status: "success", raw: text };
      }
    },
  });
}