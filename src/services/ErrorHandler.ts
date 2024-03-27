import { eventEmitter, EventName } from '~/utils/eventEmitter';
import { NotificationStatus } from '~/components/notification-wrapper';

export class ErrorHandler {
  static logError(error: unknown) {
    console.error(error);
    // Here may to add logging like e.g Sentry
  }

  static showErrorToUser(message?: string) {
    eventEmitter.emit(EventName.NOTIFICATION, {
      message: message || 'An error has occurred',
      type: NotificationStatus.ERROR,
    });
  }

  static handle(error: { message: string }) {
    this.logError(error);
    this.showErrorToUser(error?.message);
  }
}
