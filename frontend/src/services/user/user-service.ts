import { HttpClient } from "../../infra/http-client/http-client";
import { tokenService } from "../auth/token-service";

export const userService = {
  async getProfile(user: any, ctx = null) {
    const token = tokenService.get(ctx);
    return HttpClient(
      `${process.env.NEXT_PUBLIC_URL_API}/users/${user.data.sub}`,
      {
        method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
      }
    ).then(async (res) => {
      const body = await res.body;
      if (res.ok === false) {
        return { errors: body.message };
      }
      return { data: body };
    });
  },
  async create(user: any) {
    return await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      const body = await res.json();
      if (res.ok === false) {
        return { errors: body.message };
      }
      return { data: body };
    });
  },
  async update(cookies: any, user: any, ctx = null) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/users/update`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      refresh: true,
      cookies,
      body: user,
    }).then(async (res) => {
      const body = await res.body;
      if (res.ok === false) {
        return { errors: body.message };
      }
      return { data: body };
    });
  },
};
