type EventHandler = (...args: any[]) => void;
type EventMap = Map<string, EventHandler[]>;

class EventEmitter {
  private events: EventMap = new Map();

  subscribe(eventName: string, fn: EventHandler): () => void {
    const handlers = this.events.get(eventName) || [];
    this.events.set(eventName, [...handlers, fn]);

    return () => {
      const handlers = this.events.get(eventName) || [];
      this.events.set(eventName, handlers.filter((handler) => handler !== fn));
    };
  }

  emit(eventName: string, ...args: any[]): void {
    console.log(eventName);
    console.log(args);
    const handlers = this.events.get(eventName) || [];
    handlers.forEach((fn) => {
      fn(...args);
    });
  }
}

export const eventEmitter = new EventEmitter();
