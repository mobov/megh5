import { createDecorator } from 'vue-class-component'

export const NoCache = createDecorator((options, key) => {
    // component options should be passed to the callback
    // and update for the options object affect the component
    // @ts-ignore
    options.computed[key].cache = false
})
