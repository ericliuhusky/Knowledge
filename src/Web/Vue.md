# Vue

npx @vue/cli create todotasks-vue
cd todotasks-vue
npm run serve

npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/vue-fontawesome@latest

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

-
npm i element-ui

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

v-bind == :
v-on == @
{{}}

## React

npx create-react-app todotasks-react
cd todotasks-react
npm start
npm run build

npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome

npm install antd --save

import { DatePicker } from 'antd'
import 'antd/dist/antd.css'
