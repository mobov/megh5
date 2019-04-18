import { createDecorator } from 'vue-class-component'

export const NoCache = createDecorator((options, key) => {
    // @ts-ignore
    options.computed[key].cache = false
})
