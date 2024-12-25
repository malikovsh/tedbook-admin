import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

const COOKIE_NAMES = {
  ACCESS_TOKEN: '_access',
  REFRESH_TOKEN: '_refresh',
};

export class TokenService {
  static setTokenFromData(data: {
    accessToken: string;
    refreshToken?: string;
  }) {
    if (!data.accessToken) {
      console.warn('No access token provided.');
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(data.accessToken);
      const accessTokenExpiry = decodedToken.exp * 1000;
      const expiresInMinutes = Math.max(
        (accessTokenExpiry - Date.now()) / 1000 / 60,
        0,
      );
      Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, data.accessToken, {
        expires: expiresInMinutes / (60 * 24),
        secure: true,
        sameSite: 'Strict',
      });
    } catch (error) {
      console.error('Failed to decode access token:', error);
    }
  }

  static setRefreshTokenFromData(data: { refreshToken: string }) {
    if (!data.refreshToken) {
      this.clearTokens();
      window.location.href = '/auth/login';
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(data.refreshToken);
      const refreshTokenExpiry = decodedToken.exp * 1000;

      const expiresInDays = Math.max(
        (refreshTokenExpiry - Date.now()) / 1000 / 60 / 60 / 24,
        0,
      );

      Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, data.refreshToken, {
        expires: expiresInDays > 30 ? 30 : expiresInDays,
        secure: true,
        sameSite: 'Strict',
      });
    } catch (error) {
      console.error('Failed to decode refresh token:', error);
    }
  }

  static getAccessToken(): string | undefined {
    return Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);
  }

  static isAccessTokenExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) return true;

    const decodedToken: DecodedToken = jwtDecode(accessToken);
    const expiryDate = decodedToken.exp * 1000;
    return Date.now() > expiryDate;
  }

  static clearTokens() {
    Object.values(COOKIE_NAMES).forEach((cookieName) =>
      Cookies.remove(cookieName),
    );
  }
}

export function deleteCookie(name: string) {
  Cookies.remove(name);
}

export function setCookieWithoutDays(name: string, value: string) {
  Cookies.set(name, value, { secure: true, sameSite: 'Strict' });
}
