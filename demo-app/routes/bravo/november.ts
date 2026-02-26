import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class BravoNovemberRoute extends Route {
  @service declare readonly router: RouterService;

  interval: number | undefined = 0;

  activate() {
    this.interval = setInterval(() => this.router.refresh(), 3000);
  }

  deactivate() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}
