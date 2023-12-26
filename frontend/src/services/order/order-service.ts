import { Order } from "@/store/reducers/orders";
import { HttpClient } from "../../infra/http-client/http-client";
import { tokenService } from "../auth/token-service";

export const orderService = {
  async getListOrder(ctx = null) {
    const token = tokenService.get(ctx);
    return await HttpClient(
      `${process.env.NEXT_PUBLIC_URL_API}/orders`,
      {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      }
    ).then(async (res) => {
      const body = await res.body;
      if (res.ok === false) {
        throw new Error(body.message);
      }
      return body;
    });
  },
  async create(order: any, ctx = null) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}` 
      },
      body: order,
      refresh: true,
    }).then(async (res) => {
      const body = await res.body;
      if (res.ok === false) {
        throw new Error(body.message);
      }
      return body ;
    });
  },
  async update(order:any, ctx = null) {
    const token = tokenService.get(ctx);
  
    return await HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${token}` },
      refresh: true,
      body: {status:order.status},
    }).then(async (res) => {
      const body = await res.body;

      if (res.ok === false) {
        return { errors: body.message };
      }
      return body ;
    });
  },
  async delete(id: any, ctx = null) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_URL_API}/orders/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
      refresh: true,
    }).then(async (res) => {
      const body = await res.body;
      if (res.ok === false) {
        return { errors: body.message };
      }
      return  body ;
    });
  },
};

