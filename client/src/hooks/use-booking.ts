import { useMutation } from "@tanstack/react-query";
import { type InsertBooking } from "@shared/schema";
import { api } from "@shared/routes";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaVKvqeWb4UEkj09G1mWOf-QHOjQ7CEqzUG9yZxLIquWH6OmbfI2DNydXumK4pNuRH/exec";

export function useSubmitBooking() {
  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      // 1. Submit to local API as a reliable backup
      try {
        await fetch(api.bookings.create.path, {
          method: api.bookings.create.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (e) {
        console.error("Local booking backup failed, proceeding with Google Script...", e);
      }

      // 2. Submit to Google Apps Script (Standard Form submission)
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value ? String(value) : '');
      });

      // We use no-cors because the Google Script lives on a different origin
      // and doesn't explicitly allow our frontend's origin via CORS headers
      // It will still execute the POST on Google's end.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // Because of no-cors, we can't parse the response, so we assume success
      // if the network request didn't throw an error.
      return true;
    }
  });
}
