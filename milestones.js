'use strict';

(function(context) {

  class Milestone {
    constructor(topic) {
      this.topic = topic;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }

    link(externalPromise) {
      if (this.externalPromise) throw new Error('Milestone is already linked to a promise');

      this.externalPromise = externalPromise;
      this.externalPromise.then(this.resolve).catch(this.reject);
      return this;
    }

    reached() {
      return this.promise;
    }
  }

  class Milestones {
    constructor() {
      this.registry = {};
    }

    register(topic, promise) {
      return this.getOrCreate(topic).link(promise);
    }

    getOrCreate(topic) {
      if (!this.registry[topic]) {
        this.registry[topic] = new Milestone(topic);
      }
      return this.registry[topic];
    }

    when() {
      let topics = Array.prototype.slice.call(arguments, 0);
      return Promise.all(topics.map((topic) => this.getOrCreate(topic).reached()))
    }
  }

  if (typeof(window) !== 'undefined') {
    window.Milestones = Milestones;
  } else {
    module.exports = Milestones;
  }

})();

