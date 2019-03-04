import { VNodeData } from 'vue';
export declare enum Mode {
    light = "light",
    night = "night"
}
export declare type mode = 'light' | 'night';
export declare enum UiMode {
    x = "x",
    y = "y",
    xy = "xy",
    none = "none"
}
export declare type uiMode = 'x' | 'y' | 'xy' | 'none';
export interface UiNodeData extends VNodeData {
    props: {
        float?: boolean;
        floatIndex?: number;
        x?: number | string;
        y?: number | string;
        height?: number | string;
        width?: number | string;
        bgSrc?: string;
        text?: string;
        logo?: string;
        termsText?: string;
        termsLink?: string;
        policyText?: string;
        policyLink?: string;
        copyright?: string;
    };
}
export interface UiNode {
    name: string;
    nodeData: UiNodeData;
    children?: UiNode[];
}
export interface UiModule extends UiNode {
    title: string;
    cover: string;
    uiConfig: {
        moveMode: uiMode;
        sizeMode: uiMode;
    };
}
export interface ProjectData {
    name: string;
    version: string;
    dependencies: any;
    UiNodes: UiNode[];
}
