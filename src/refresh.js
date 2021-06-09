import { store } from "./store.js";
import { getIframe } from "./iframe.js";

export async function refresh() {
  const iframe = getIframe();
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    {
      type: "refresh",
      tenantId: store.tenantId,
    },
    "https://auth.userfront.net"
  );
}

export async function exchange({ session, nonce }) {
  const iframe = getIframe();
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    {
      type: "exchange",
      tenantId: store.tenantId,
      payload: {
        session,
        nonce,
      },
    },
    "https://auth.userfront.net"
  );
}

// async function refresh() {
//   const res = await axios.get({
//     url: `${apiUrl}auth/refresh`,
//     headers: {
//       authorization: `Bearer ${store.accessToken}`,
//     },
//   });
//   if (!res || !res.data || !res.data.tokens) {
//     throw new Error("Problem refreshing tokens.");
//   }

//   setCookiesAndTokens(res.data.tokens);
//   setUser();
// }
