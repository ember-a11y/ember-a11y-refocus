import Route from '@ember/routing/route';

export default class BravoNovemberRoute extends Route {
  activate() {
    this.interval = setInterval(() => this.refresh(), 3000);
  }

  deactivate() {
    clearInterval(this.interval);
    delete this.interval;
  }
}
