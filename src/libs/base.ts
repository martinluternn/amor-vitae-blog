const API_URL = <string>process.env.NEXT_PUBLIC_BASE_URL;

export default async function fetchAPI(params = "") {
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(API_URL + params, {
    headers,
    method: "GET",
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json;
}
