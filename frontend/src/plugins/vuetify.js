import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    icons: 'mdi',
    theme: {
        themes: {
            light: {
                primary: colors.orange.darken1,
                secodary: colors.orange.lighten4,
                accent: colors.orange.base
            }
        }
    }
})
