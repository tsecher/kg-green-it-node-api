export class EventEmitter {

  public cbs: any = {};

  /**
   * Listen events.
   *
   * @param {string} event
   * @param cb
   */
  on(event: string, cb: any) {
    this.cbs[event] = this.cbs[event] || [];
    this.cbs[event].push(cb);
  }

  /**
   * Emit event with data.
   *
   * @param {string} event
   * @param data
   */
  emit(event: string, data: any = {}) {
    this.cbs[event]?.forEach((cb: any) => cb(data));
  }
}