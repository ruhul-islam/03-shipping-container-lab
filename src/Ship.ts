import ShippingContainer from "./models/ShippingContainer";
import Transporter from "./models/Transporter";

export class Ship implements Transporter {
  maxWeight: number;
  containers: ShippingContainer[] = [];
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
  }
  addContainer(container: ShippingContainer): void {
    this.containers.push(container);
  }
  getTotalWeight(): number {
    if (this.containers) {
      return this.containers.reduce((pv, cv) => {
        return pv + cv.getGrossWeight();
      }, 0);
    } else {
      return 0;
    }
  }
  isOverweight(): boolean {
    if (this.getTotalWeight() > this.maxWeight) {
      return true;
    } else {
      return false;
    }
  }
}
