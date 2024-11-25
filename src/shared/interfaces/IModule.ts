import { LucideIcon } from "lucide-react";
export interface IModule {
    name: string;
    label: string;
    icon: LucideIcon;
    subModules: ISubModule[];
}

export interface ISubModule {
    name: string;
    label: string;
    icon: LucideIcon;
}