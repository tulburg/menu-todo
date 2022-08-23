import App from "./app";
import Theme from './theme';
export default {
  theme: Theme,
  useHash: true,
  routes: [
    { path: '/', name: 'App', component: App }
  ]
}
