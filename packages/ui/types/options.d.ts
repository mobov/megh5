import Vue, { VueConstructor } from 'vue';
declare global {
    interface Window {
        YT: {
            Player: any;
        };
        onYouTubeIframeAPIReady: any;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        staticClass?: string;
        class?: string;
        style?: ElementCSSInlineStyle | any;
        ref?: string;
        updated?: () => void;
        created?: () => void;
        mounted?: () => void;
        onClick?: (e: MouseEvent | TouchEvent) => void;
        onInput?: () => void;
        nativeOnClick?: (e: MouseEvent | TouchEvent) => void;
        value?: any;
    }
    interface DirectiveOptions {
        name: string;
        install?: (Vue: VueConstructor) => void;
    }
}
declare module 'vue/types/vue' {
    interface RawComponentOptions<V extends Vue = Vue, Data = {} | undefined, Methods = {} | undefined, Computed = {} | undefined, Props = {} | undefined> {
        name?: string;
        install?: (Vue: VueConstructor) => void;
        data: Data;
        methods: Methods;
        computed: {
            [C in keyof Computed]: (this: V) => Computed[C];
        };
        props: Props;
    }
    interface VueConstructor<V extends Vue = Vue, Options = Record<string, any>> {
        version: string;
        install?: (Vue: VueConstructor) => void;
        options: Options;
    }
}
