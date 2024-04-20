import { Hono } from "hono";

const test = new Hono();

test.get("/", (c) => {
    return c.text("TEST ROUTE WORKS!");
});

export default test