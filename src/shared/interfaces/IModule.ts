import { LucideIcon } from "lucide-react";

export interface IModule {
    name: string;
    subModules: ISubModule[];
}

export interface ISubModule {
    name: string;
    icon: LucideIcon;
}