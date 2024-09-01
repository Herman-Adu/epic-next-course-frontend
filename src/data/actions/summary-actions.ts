"use server";

import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { flattenAttributes } from "@/lib/utils";
import { redirect } from "next/navigation";

interface Payload {
  data: {
    title?: string;
    videoId: string;
    summary: string;
  };
}

export async function createSummaryAction(payload: Payload) {
  // check to see if user is loggeed in and authorised with a token
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  // post summary data to strapi and redirect to summaries details page
  const data = await mutateData("POST", "/api/summaries", payload);
  const flattenedData = flattenAttributes(data);
  console.log("Flatterend data: ", flattenAttributes);
  redirect("/dashboard/summaries/" + flattenedData.id);
}
