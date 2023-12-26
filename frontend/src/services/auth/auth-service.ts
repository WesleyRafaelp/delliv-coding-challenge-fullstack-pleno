import { HttpClient } from "../../infra/http-client/http-client";
import { tokenService } from "./token-service";

export const authService = {
  async login(user: any) {
    return await HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, {
      method: "POST",
      body: user,
    }).then(async (res: any) => {
      if (!res.ok) throw new Error("Email or password invalid");
      
      const body = await res.body;

      tokenService.save(body.access_token);
    });
  },
  async getSession(ctx = null) {
    const token = tokenService.get(ctx);
    return await HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/auth/session`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
      refresh: true,
      ctx,
    }).then(async (res: any) => {
      if (res.ok === false) throw new Error("Token invalid");
      const body = await res.body;
      const cookies = res.cookies;
    
      return { message: body.message, data: body.data };
    });
  },
  async logout(ctx = null) {
  
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/auth/logout`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      refresh: true,
    }).then(async (res: any) => {
     
      if (!res.ok) throw new Error("Error logout");

      tokenService.delete(ctx);
      const body = await res.body;
  
      return { message: body.message };
    });
  },
};
