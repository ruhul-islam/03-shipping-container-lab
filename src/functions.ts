import ShippingContainer from "./models/ShippingContainer";
import Transporter from "./models/Transporter";
import { Ship } from "./Ship";

export const findContainersByDestination = (
  containers: ShippingContainer[],
  destination: string
): ShippingContainer[] => {
  return containers.filter((container) => {
    return container.destination === destination;
  });
};

export const findOverweightTransporters = (
  transporters: Transporter[]
): Transporter[] => {
  return transporters.filter((transporter) => {
    return transporter.isOverweight();
  });
};

export const isSafeToAddContainer = (
  ship: Ship,
  container: ShippingContainer
): boolean => {
  //   return ship.getTotalWeight() + container.getGrossWeight() <= ship.maxWeight
  //     ? true
  //     : false;
  return ship.getTotalWeight() + container.getGrossWeight() <= ship.maxWeight;
};
