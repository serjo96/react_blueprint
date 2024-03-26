export class DependencyInjector {
  public static refreshAccessToken: () => Promise<string>;
  public static logout: () => Promise<void>;
  public static isRetryAttempt = false;

  public static injectRefreshTokenMethod(refreshTokenMethod: () => Promise<string>) {
    DependencyInjector.refreshAccessToken = refreshTokenMethod;
  }

  public static injectLogoutMethod(logout: ()=> Promise<void>) {
    DependencyInjector.logout = logout
  }
  public static changeRetryAttempt(flag: boolean) {
    this.isRetryAttempt = flag;
  }
}
