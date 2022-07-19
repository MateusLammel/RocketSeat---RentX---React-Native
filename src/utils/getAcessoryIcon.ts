import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import GasolineSvg from "../assets/gasoline.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import ForceSvg from "../assets/force.svg";
import EnergySvg from "../assets/energy.svg";
import HybridSvg from "../assets/hybrid.svg";
import CarSvg from "../assets/car.svg";

export function getAcessoryIcon(type: string) {
  switch (type) {
    case "speed":
      return SpeedSvg;
    case "acceleration":
      return AccelerationSvg;
    case "gasoline":
      return GasolineSvg;
    case "exchange":
      return ExchangeSvg;
    case "people":
      return PeopleSvg;
    case "force":
      return ForceSvg;
    case "energy":
      return EnergySvg;
    case "hybrid":
      return HybridSvg;
    default:
      return CarSvg;
  }
}
