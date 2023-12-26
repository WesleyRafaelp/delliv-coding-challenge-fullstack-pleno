import { useEffect, useState } from "react";
import { authService } from "./auth-service";
import { useRouter } from "next/router";

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    authService.getSession()
      .then((userSession) => {
        setSession(userSession)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  return {
    data: session,
    error,
    loading,
  }
}

export function withSessionHOC(WrappedComponent) {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();

    if (session.loading) {
      return ( <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75">
      <div className="loader ease-linear border rounded-full border-t-4 border-gray-900 h-12 w-12"></div>
    </div>);
    }

    if (!session.loading && session.error) {
      router.push('/?error=401');
    }

    const modifiedProps = {
      ...props,
      session: session.data?.data,
    };

    return <WrappedComponent { ...modifiedProps } />;
  };
}


export function withSession(functionCtx) {
  return async (ctx) => {
  
    try {
      const session = await authService.getSession(ctx);

      
      const modifiedContext = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      
      return functionCtx(modifiedContext);
    } catch (err) {
      
      console.error(err);
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}
