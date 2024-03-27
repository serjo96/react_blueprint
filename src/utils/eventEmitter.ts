type EventHandler = (...args: any[]) => void;
type EventMap = Map<string, EventHandler[]>;

class EventEmitter {
  private events: EventMap = new Map();

  subscribe(eventName: EventName, fn: EventHandler): () => void {
    const handlers = this.events.get(eventName) || [];
    this.events.set(eventName, [...handlers, fn]);

    return () => {
      const handlers = this.events.get(eventName) || [];
      this.events.set(
        eventName,
        handlers.filter(handler => handler !== fn)
      );
    };
  }

  emit(eventName: EventName, ...args: any[]): void {
    const handlers = this.events.get(eventName) || [];
    handlers.forEach(fn => {
      fn(...args);
    });
  }
}

export const eventEmitter = new EventEmitter();

// Add your events
export enum EventName {
  NOTIFICATION = 'notification',
}
