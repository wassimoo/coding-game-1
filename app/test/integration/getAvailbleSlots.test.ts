import request from "supertest";
import app from "../../src/index";

describe("GET /calendar/query", () => {
  it("should return available slots for 2023-10-01", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-01",
        products: ["SolarPanels"],
        language: "English",
        rating: "Silver",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { start_date: "2023-10-01T08:00:00.000Z", available_count: 1 },
    ]);
  });

  it("should return no available slots for 2023-10-02", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-02",
        products: ["Heatpumps"],
        language: "German",
        rating: "Gold",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return no available slots for 2023-10-04", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-04",
        products: ["Heatpumps"],
        language: "English",
        rating: "Silver",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return 400 for missing date", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        products: ["SolarPanels"],
        language: "German",
        rating: "Gold",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for invalid date format", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "invalid-date",
        products: ["SolarPanels"],
        language: "German",
        rating: "Gold",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for missing products", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-01",
        language: "German",
        rating: "Gold",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for invalid products format", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-01",
        products: "SolarPanels",
        language: "German",
        rating: "Gold",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for missing language", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-01",
        products: ["SolarPanels"],
        rating: "Gold",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for missing rating", async () => {
    const response = await request(app)
      .post("/calendar/query")
      .send({
        date: "2023-10-01",
        products: ["SolarPanels"],
        language: "German",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
