import Route from '@ember/routing/route';

export default class BravoNovemberRoute extends Route {
  interval: number | undefined = 0;

  activate() {
    this.interval = setInterval(() => this.refresh(), 3000);
  }

  deactivate() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}
