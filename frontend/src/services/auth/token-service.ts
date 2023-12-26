import { destroyCookie, parseCookies, setCookie } from "nookies";

export const tokenService = {
  save(accessToken: string, ctx = null) {
    setCookie(ctx, "ACCESS_TOKEN", accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  },
  get(ctx = null) {
    const cookies = parseCookies(ctx);
    return cookies["ACCESS_TOKEN"];
  },
  getCookies(ctx = null) {
    const cookies = parseCookies(ctx);
    return cookies;
  },
  delete(ctx = null) {
    destroyCookie(ctx, "ACCESS_TOKEN");

    destroyCookie(ctx, "REFRESH_TOKEN");
  },
};
