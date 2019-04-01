import './core/styles/utils.scss';
import * as components from './entries';
const MegH5 = {
    installed: false,
    install(Vue, opts = {}) {
        if (MegH5.installed) {
            return;
        }
        MegH5.installed = true;
        const componentsList = opts.components || components;
        Object.values(componentsList).forEach((entry) => {
            Vue.use(entry);
        });
    },
    version: '1.0.0'
};
export * from './entries';
export * from './core';
export default MegH5;
