import { createApp } from 'vue'
import App from './App.vue'
import StandardButton from './components/ui/StandardButton.vue'

const app = createApp(App)

app.component('standard-button', StandardButton)


app.mount('#app')
