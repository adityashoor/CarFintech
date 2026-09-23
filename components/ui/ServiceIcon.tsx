import { Bike, Briefcase, Car, Caravan, Cog, HardHat, Layers, ShieldCheck, Truck, Wallet, type LucideProps } from "lucide-react";
import type { Service } from "@/lib/content/services";

const icons: Record<Service["icon"], React.ComponentType<LucideProps>> = {
  car: Car,
  truck: Truck,
  cog: Cog,
  briefcase: Briefcase,
  bike: Bike,
  wallet: Wallet,
  caravan: Caravan,
  layers: Layers,
  shield: ShieldCheck,
  hardhat: HardHat,
};

export function ServiceIcon({ icon, ...props }: { icon: Service["icon"] } & LucideProps) {
  const Icon = icons[icon];
  return <Icon strokeWidth={1.6} {...props} />;
}
