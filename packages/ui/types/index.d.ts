import { VueConstructor, Component } from 'vue';
export declare type ComponentOrPack = Component & {
    $subcomponents?: Record<string, ComponentOrPack>;
};
export interface MegH5UseOptions {
    components?: Record<string, ComponentOrPack>;
}
export interface MegH5Plugin {
    installed: boolean;
    install: (Vue: VueConstructor, opts: MegH5UseOptions) => void;
    version: string;
}
declare const MegH5: MegH5Plugin;
export * from './entries';
export * from './core';
export default MegH5;
