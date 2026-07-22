import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Oops!</h1>

      {isRouteErrorResponse(error) ? (
        <>
          <h2>
            {error.status} - {error.statusText}
          </h2>
          <p>{error.data}</p>
        </>
      ) : (
        <>
          <h2>Something went wrong.</h2>
          <p>{error?.message}</p>
        </>
      )}
    </div>
  );
}