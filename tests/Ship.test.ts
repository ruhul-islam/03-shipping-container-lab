import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import { Ship } from "../src/Ship";

describe("Ship class", () => {
  test("The maxWeight property is set from the constructor parameter.", () => {
    const container: Ship = new Ship(10000);
    expect(container.maxWeight).toBe(10000);
  });
  test("The containers property is set to an empty array in a new Ship instance", () => {
    const containers: Ship = new Ship(10000);
    expect(containers.containers).toEqual([]);
  });
  test("Calling addContainer adds to the containers array property.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit"));
    expect(ship.containers).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
    ]);
  });
  test("Calling addContainer twice adds both containers to the containers array property.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit"));
    ship.addContainer(new LightContainer("NYC", 1000));
    expect(ship.containers).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
      { destination: "NYC", cargoWeight: 1000 },
    ]);
  });
  test("getTotalWeight returns the combined gross weight of the containers in the array.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit"));
    ship.addContainer(new LightContainer("NYC", 1000));
    expect(ship.getTotalWeight()).toBe(1000);
  });
  test("getTotalWeight returns the combined gross weight of the containers in the array.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit", 450));
    ship.addContainer(new HeavyContainer(50, "NYC", 1000));
    expect(ship.getTotalWeight()).toBe(1500);
  });
  test("getTotalWeight returns 0 when containers is empty.", () => {
    const ship: Ship = new Ship(10000);
    expect(ship.getTotalWeight()).toBe(0);
  });
  test("isOverweight returns true when the total weight is greater than maxWeight.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Chicago", 10001));
    expect(ship.isOverweight()).toBe(true);
  });
  test("isOverweight returns false when the total weight is less than maxWeight.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Chicago", 9999));
    expect(ship.isOverweight()).toBe(false);
  });
  test("isOverweight returns false when the total weight is equal to maxWeight.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Chicago", 10000));
    expect(ship.isOverweight()).toBe(false);
  });
});
