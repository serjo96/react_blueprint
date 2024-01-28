export class ErrorHandler {
  static logError(error: unknown) {
    console.error(error);
    // Здесь может быть интеграция с внешним логгером, например, Sentry
  }

  static showErrorToUser(message: string) {
    // Отображение ошибки пользователю, например, с помощью toast-уведомлений
  }

  static handle(error: unknown) {
    this.logError(error);
    this.showErrorToUser("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
  }
}
