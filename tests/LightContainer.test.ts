import { LightContainer } from "../src/LightContainer";
import ShippingContainer from "../src/models/ShippingContainer";

describe("LightContainer class", () => {
  test("The destination and cargoWeight properties are set from the constructor parameters.", () => {
    const container: ShippingContainer = new LightContainer("Detroit", 100000);
    expect(container.destination).toBe("Detroit");
    expect(container.cargoWeight).toBe(100000);
  });
  test("cargoWeight defaults to 0, when the second constructor parameter is omitted.", () => {
    const container: ShippingContainer = new LightContainer("NYC");
    expect(container.destination).toBe("NYC");
    expect(container.cargoWeight).toBe(0);
  });
  test("getGrossWeight returns the cargoWeight", () => {
    const container: ShippingContainer = new LightContainer("Chicago", 200000);
    expect(container.getGrossWeight()).toBe(200000);
  });
  test("getGrossWeight returns the default cargoWeight of 0", () => {
    const container: ShippingContainer = new LightContainer("Chicago");
    expect(container.getGrossWeight()).toBe(0);
  });
});
