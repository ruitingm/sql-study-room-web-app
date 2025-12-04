/**
 * - fetchProblemsApi(): sends a GET request to backend to retrieve all problems
 * - fetchReviewedProblemsApi(): sends a GET request to backend to retrieve problems filtered by review status
 * - Returns parsed JSON of problems on success
 */

import API_BASE_URL from "./config";

export async function fetchProblemsApi() {
  const response = await fetch(`${API_BASE_URL}/problems/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  return await response.json();
}

/**
 * Fetch problems filtered by review status
 * @param reviewed - true to get reviewed problems, false to get unreviewed problems
 */
export async function fetchReviewedProblemsApi(reviewed: boolean = false) {
  const response = await fetch(`${API_BASE_URL}/problems/?reviewed=${reviewed}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reviewed problems");
  }

  return await response.json();
}
