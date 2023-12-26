import { parseCookies, setCookie } from "nookies";

export async function HttpClient(fetchUrl: string, fetchOptions: any) {
  const hasFile = fetchOptions.body instanceof FormData;
  let cookies = parseCookies(fetchOptions?.ctx);
  const options = {
    ...fetchOptions,
    headers: {
      ...(hasFile ? null : { "Content-Type": "application/json" }),
      ...fetchOptions.headers,
    },
    body: hasFile
    ? fetchOptions.body
    : fetchOptions.body
    ? typeof fetchOptions.body === 'object'
      ? JSON.stringify(fetchOptions.body)
      : fetchOptions.body
    : null,
    credentials: "include",
  };
  return fetch(fetchUrl, options)
    .then(async (resServer) => {
     
      return {
        ok: resServer.ok,
        status: resServer.status,
        statusText: resServer.statusText,
        body: await resServer.json(),
        cookies: cookies,
      };
    })
    .then(async (res: any) => {

        if (!res) {
            throw new Error('Server response is undefined');
        }
    
      if (!fetchOptions.refresh) {
        return res;
      }
      if (res.status !== 401) {
        return res;
      }

      try {
        const isServer = fetchOptions?.ctx ? fetchOptions?.ctx : null;
        const current = fetchOptions?.cookies?.req?.cookies.REFRESH_TOKEN;
        
        const refreshResponse = await HttpClient(
          `${process.env.NEXT_PUBLIC_URL_API}/auth/refresh-token`,
          {
            method: "POST",
            credential: "include",
            headers: {
              "Content-Type": "application/json",
              Cookie: `REFRESH_TOKEN=${
                current ? current : cookies.REFRESH_TOKEN
              }; ACCESS_TOKEN=${cookies["ACCESS_TOKEN"]}`,
            },
            body: {
              refresh_token: current ? current : cookies.REFRESH_TOKEN,
            },
          }
        );

        if (!refreshResponse.ok) {
          throw new Error("Token invalid");
        }

        const newAccessToken = refreshResponse.body.access_token;
        const newRefreshToken = refreshResponse.body.refresh_token;

        setCookie(null, "ACCESS_TOKEN", newAccessToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });

        if (isServer) {
          setCookie(fetchOptions.ctx, "REFRESH_TOKEN", newRefreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
          });
          setCookie(fetchOptions.ctx, "ACCESS_TOKEN", newAccessToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
          });
        }
        cookies = {
          ACCESS_TOKEN: newAccessToken,
          REFRESH_TOKEN: newRefreshToken,
        };

        
        const retryResponse: {
          ok: boolean;
          status: number;
          statusText: string;
          body: any; 
          cookies: any;
        } = await HttpClient(fetchUrl, {
          ...options,
          refresh: false,
          headers: { "Authorization": `Bearer ${newAccessToken}` },
        });

        retryResponse.cookies = cookies;

        return retryResponse;
      } catch (err) {
  
        console.error(err);
      }
    });
}
