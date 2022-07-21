import {
  findContainersByDestination,
  findOverweightTransporters,
  isSafeToAddContainer,
} from "../src/functions";
import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import ShippingContainer from "../src/models/ShippingContainer";
import Transporter from "../src/models/Transporter";
import { Ship } from "../src/Ship";
import { Truck } from "../src/Trucker";

describe("findContainersByDestination function", () => {
  test("Do a test case with an array of LightContainer.", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
    ];
    expect(findContainersByDestination(shippingContainers, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
    ]);
  });
  test("Do a test case with an array that has a mix of LightContainer and HeavyContainer.", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
      new HeavyContainer(50, "Miami"),
    ];
    expect(findContainersByDestination(shippingContainers, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
    ]);
  });
  test("Do a test case with an array that has a mix of LightContainer and HeavyContainer.", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
      new HeavyContainer(50, "Miami"),
      new HeavyContainer(50, "Detroit", 1000),
    ];
    expect(findContainersByDestination(shippingContainers, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
      { tareWeight: 50, destination: "Detroit", cargoWeight: 1000 },
    ]);
  });
  test("Do a test case where none of the containers match the destination. (Expect an empty array as the result.)", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
      new HeavyContainer(50, "Miami"),
      new HeavyContainer(50, "Detroit", 1000),
    ];
    expect(findContainersByDestination(shippingContainers, "New York")).toEqual(
      []
    );
  });
  test("Do a test case with an empty array. ", () => {
    const shippingContainers: ShippingContainer[] = [];
    expect(findContainersByDestination(shippingContainers, "New York")).toEqual(
      []
    );
  });
});

describe("findOverweightTransporters function", () => {
  test("Do a test case with an array of Trucks, some overweight, some not.", () => {
    const truck1: Truck = new Truck(100);
    truck1.addContainer(new LightContainer("Detroit", 50));
    const truck2: Truck = new Truck(100);
    truck2.addContainer(new HeavyContainer(50, "Detroit", 100));
    const arrayOfTrucks: Transporter[] = [truck1, truck2];
    expect(findOverweightTransporters(arrayOfTrucks)).toEqual([truck2]);
  });
  test("Do a test case with an array that has a mix of Truck and Ship, some overweight, some not", () => {
    const truck1: Truck = new Truck(100);
    truck1.addContainer(new LightContainer("Detroit", 50));
    const truck2: Truck = new Truck(100);
    truck2.addContainer(new HeavyContainer(50, "Detroit", 100));
    const ship1: Ship = new Ship(100);
    ship1.addContainer(new LightContainer("NYC", 150));
    const arrayOfTrucksAndShips: Transporter[] = [truck1, truck2, ship1];
    expect(findOverweightTransporters(arrayOfTrucksAndShips)).toEqual([
      truck2,
      ship1,
    ]);
  });
  test("Do a test case with an array of Transporters where none are overweight. (Expect an empty array as the result.)", () => {
    const truck1: Truck = new Truck(100);
    truck1.addContainer(new LightContainer("Detroit", 50));
    const truck2: Truck = new Truck(100);
    truck2.addContainer(new HeavyContainer(50, "Detroit", 10));
    const ship1: Ship = new Ship(100);
    ship1.addContainer(new LightContainer("NYC", 15));
    const arrayOfTrucksAndShips: Transporter[] = [truck1, truck2, ship1];
    expect(findOverweightTransporters(arrayOfTrucksAndShips)).toEqual([]);
  });
  test("Do a test case with an empty array. (Expect an empty array as the result.)", () => {
    const arrayOfTrucks: Transporter[] = [];
    expect(findOverweightTransporters(arrayOfTrucks)).toEqual([]);
  });
});

describe("isSafeToAddContainer function", () => {
  test("isSafeToAddContainer returns true for an empty ship and empty LightContainer when transporter maxWeight is 5000.", () => {
    let ship1: Ship = new Ship(5000);
    let container: ShippingContainer = new LightContainer("Detroit");
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a LightContainer with some cargo, but less than maxWeight.", () => {
    let ship1: Ship = new Ship(5000);
    let container: ShippingContainer = new LightContainer("Detroit", 5000);
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a HeavyContainer with some cargo, but less than maxWeight.", () => {
    let ship1: Ship = new Ship(5000);
    let container: ShippingContainer = new HeavyContainer(
      1000,
      "Detroit",
      4000
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a HeavyContainer with some cargo, but less than maxWeight.", () => {
    let ship1: Ship = new Ship(5000);
    ship1.addContainer(new LightContainer("NYC", 1000));
    ship1.addContainer(new HeavyContainer(1000, "NYC", 1000));
    let container: ShippingContainer = new HeavyContainer(
      1000,
      "Detroit",
      1000
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("Create a ship with one or more containers already added. isSafeToAddContainer returns false for a container that is too heavy to be added to this ship.", () => {
    let ship1: Ship = new Ship(5000);
    ship1.addContainer(new LightContainer("NYC", 1000));
    ship1.addContainer(new HeavyContainer(1000, "NYC", 1000));
    let container: ShippingContainer = new HeavyContainer(
      1000,
      "Detroit",
      2000
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(false);
  });
});
