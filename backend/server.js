import { serve } from "bun";
import { Hono } from "hono";
import testRouter from "./routes/test.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, World!");
});

app.route("/test", testRouter);

Bun.serve({
  fetch: app.fetch,
  port: 8000
});

console.log("Server running on http://localhost:8000");











// // Set CORS headers
// const headers = new Headers({
//   "Access-Control-Allow-Origin": "*", // Allow all domains
//   "Content-Type": "application/json", // Specify the content type
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allowed methods
//   "Access-Control-Allow-Headers": "Content-Type, Authorization" // Allowed headers
// });

// // Handle OPTIONS method for preflight requests
// if (request.method === "OPTIONS") {
//   return new Response(null, { headers, status: 204 });
// }

// return new Response(JSON.stringify({ message: "Hello from Bun!" }), { headers, status: 200 });


// // // Example GET endpoint
// // if (request.url.endsWith("/data") && request.method === "GET") {
// // }

// // // Default response if no routes match
// // return new Response("Not Found", { status: 404 });