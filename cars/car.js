class Car {
  gas = 0;
  model = 'not defined';
  company = 'not defined';
  year = 'not specified';
  wheels = 4;
  kmPerLt = 0;
  kms = 0;
  tank = 0;
  price = 0;
  salePrice = 0;
  minimumSalePrice = 0;
  color = 'not specified';
  hybrid = false;

  constructor(props) {
    this.model = props.model;
    this.company = props.company;
    this.color = props.color;
    this.kmPerLt = props.kmPerLt;
    this.tank = props.tank;
    this.price = props.price;
    this.salePrice =
      props.price -
      props.price * 0.005 * (new Date().getFullYear() - props.year);
    this.year = props.year;
    this.minimumSalePrice = this.price * 0.2;
  }

  currentSalePrice = () => {
    return this.salePrice;
  };

  availableGasSpace = () => {
    return this.tank - this.gas;
  };

  addGas = (liters) => {
    if (liters > this.availableGasSpace()) {
      this.gas = this.tank;
    } else {
      this.gas += liters;
    }
  };

  currentGas = () => {
    return this.gas;
  };

  maximumDistanceToTravel = () => {
    return this.gas * this.kmPerLt;
  };

  devaluationByKms = () => {
    const devaluationRate = this.kms * 0.00005 * this.price;
    if (this.salePrice - devaluationRate < this.minimumSalePrice) {
      this.salePrice -= devaluationRate;
    } else {
      this.salePrice = this.minimumSalePrice;
    }
  };

  move = (kms) => {
    if (kms > this.maximumDistanceToTravel()) {
      this.kms += this.maximumDistanceToTravel();
      this.gas -= this.maximumDistanceToTravel() / this.kmPerLt;
    } else {
      this.kms += kms;
      this.gas -= kms / this.kmPerLt;
    }
    this.devaluationByKms();
  };
}
module.exports = Car;
