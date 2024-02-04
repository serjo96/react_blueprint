import {eventEmitter} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/NotificationWrapper";

export class ErrorHandler {
  static logError(error: unknown) {
    console.error(error);
    // Here may to add logging like e.g Sentry
  }

  static showErrorToUser(message?: string,) {
    eventEmitter.emit('notification', { message: message || 'An error has occurred', type: NotificationStatus.INFO });
  }

  static handle(error: {message: string}) {
    this.logError(error);
    this.showErrorToUser(error?.message);
  }
}
