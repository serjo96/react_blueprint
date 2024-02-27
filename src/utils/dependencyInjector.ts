export class DependencyInjector {
  static refreshAccessToken: () => Promise<void>;

  static injectRefreshTokenMethod(refreshTokenMethod: () => Promise<void>) {
    DependencyInjector.refreshAccessToken = refreshTokenMethod;
  }
}
