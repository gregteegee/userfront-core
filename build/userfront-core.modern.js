import e from"js-cookie";import t from"axios";const n="https://api.userfront.com/v0/",r=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g;function a(e){try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(r))}catch(e){return!0}}function o(e){var t,n;if(e){if("string"==typeof e)throw new Error(e);if(null!=e&&null!=(t=e.response)&&null!=(n=t.data)&&n.message)throw new Error(e.response.data.message);throw e}}const s={user:{},mode:a()?"test":"live"};function i(){["access","id","refresh"].map(t=>{try{const n=e.get(s[t+"TokenName"]);s[t+"Token"]=n}catch(e){console.warn(`Problem setting ${t} token.`)}})}function c(t,n,r){const a=`${r}.${s.tenantId}`;n=n||{secure:"live"===s.mode,sameSite:"Lax"},"refresh"===r&&(n.sameSite="Strict"),e.set(a,t,n)}function d(t){e.remove(t),e.remove(t,{secure:!0,sameSite:"Lax"}),e.remove(t,{secure:!0,sameSite:"None"}),e.remove(t,{secure:!1,sameSite:"Lax"}),e.remove(t,{secure:!1,sameSite:"None"})}function u(){d(s.accessTokenName),d(s.idTokenName),d(s.refreshTokenName),s.accessToken=void 0,s.idToken=void 0,s.refreshToken=void 0}function h(e){c(e.access.value,e.access.cookieOptions,"access"),c(e.id.value,e.id.cookieOptions,"id"),c(e.refresh.value,e.refresh.cookieOptions,"refresh"),i()}function w(e){if(window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function l(e){try{document}catch(e){return}if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&window.location.assign(`${t.pathname}${t.hash}${t.search}`)}async function f({}){}function m(e){if(!e)throw new Error("Missing provider");if(!s.tenantId)throw new Error("Missing tenant ID");let t=`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${s.tenantId}&origin=${window.location.origin}`;const n=w("redirect");return n&&(t+="&redirect="+encodeURIComponent(n)),t}function p(){if(!s.idToken)return console.warn("Cannot define user: missing ID token");s.user=s.user||{};const e=function(e){try{const t=e.split(".")[1];return JSON.parse(atob(t))}catch(e){console.error("Problem decoding JWT payload",e)}}(s.idToken),t=["email","username","name","image","data","confirmedAt","createdAt","updatedAt","mode","userId","userUuid","tenantId","isConfirmed"];for(const n of t){if("update"===n)return;s.user[n]=e[n]}}const g=s.user;g.update=async function(e){return!e||Object.keys(e).length<1?console.warn("Missing user properties to update"):(await t.put(n+"self",e,{headers:{authorization:"Bearer "+s.accessToken}}),await async function(){}(),p(),s.user)};let k=[],y=!1;var v={addInitCallback:function(e){e&&"function"==typeof e&&k.push(e)},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");s.tenantId=e,s.accessTokenName="access."+e,s.idTokenName="id."+e,s.refreshTokenName="refresh."+e,i(),s.idToken&&p();try{k.length>0&&k.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})}),k=[]}catch(e){}},registerUrlChangedEventListener:function(){if(!y){y=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},logout:async function(){if(!s.accessToken)return u();try{const{data:e}=await t.get(n+"auth/logout",{headers:{authorization:"Bearer "+s.accessToken}});u(),l(e.redirectTo)}catch(e){u()}},setMode:async function(){try{const{data:e}=await t.get(`${n}tenants/${s.tenantId}/mode`);s.mode=e.mode||"test"}catch(e){s.mode="test"}},login:async function({method:e,email:r,username:a,emailOrUsername:i,password:c,token:d,uuid:u}={}){if(!e)throw new Error('Userfront.login called without "method" property.');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return function(e){if(!e)throw new Error("Missing provider");const t=m(e);window.location.assign(t)}(e);case"password":return async function({email:e,username:r,emailOrUsername:a,password:i}){try{const{data:o}=await t.post(n+"auth/basic",{tenantId:s.tenantId,emailOrUsername:e||r||a,password:i});if(!o.tokens)throw new Error("Please try again.");h(o.tokens),await f(o),l(w("redirect")||o.redirectTo||"/")}catch(e){o(e)}}({email:r,username:a,emailOrUsername:i,password:c});case"link":return async function(e,r){try{if(e=e||w("token"),r=r||w("uuid"),!e||!r)return;const{data:a}=await t.put(n+"auth/link",{token:e,uuid:r,tenantId:s.tenantId});if(!a.tokens)throw new Error("Problem logging in.");h(a.tokens),l(w("redirect")||a.redirectTo||"/")}catch(e){o(e)}}(d,u);default:throw new Error('Userfront.login called with invalid "method" property.')}},resetPassword:async function({uuid:e,token:r,password:a}){try{if(r=r||w("token"),e=e||w("uuid"),!r||!e)throw new Error("Missing token or uuid");const{data:o}=await t.put(n+"auth/reset",{tenantId:s.tenantId,uuid:e,token:r,password:a});if(!o.tokens)throw new Error("There was a problem resetting your password. Please try again.");h(o.tokens),l(w("redirect")||o.redirectTo||"/")}catch(e){o(e)}},sendLoginLink:async function(e){try{const{data:r}=await t.post(n+"auth/link",{email:e,tenantId:s.tenantId});return r}catch(e){throw new Error("Problem sending link.")}},sendResetLink:async function(e){try{const{data:r}=await t.post(n+"auth/reset/link",{email:e,tenantId:s.tenantId});return r}catch(e){throw new Error("Problem sending link.")}},signup:async function({method:e,username:r,name:a,email:o,password:i,data:c}={}){if(!e)throw new Error('Userfront.signup called without "method" property.');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return function(e){if(!e)throw new Error("Missing provider");const t=m(e);window.location.assign(t)}(e);case"password":return async function({username:e,name:r,email:a,password:o,userData:i}){try{const{data:c}=await t.post(n+"auth/create",{tenantId:s.tenantId,username:e,name:r,email:a,password:o,data:i});if(!c.tokens)throw new Error("Please try again.");h(c.tokens),await f(c),l(w("redirect")||c.redirectTo||"/")}catch(e){var c,d;if(null!=e&&null!=(c=e.response)&&null!=(d=c.data)&&d.message)throw new Error(e.response.data.message);throw e}}({username:r,name:a,email:o,password:i,userData:c});default:throw new Error('Userfront.signup called with invalid "method" property.')}},store:s,accessToken:function(){return s.accessToken=e.get(s.accessTokenName),s.accessToken},idToken:function(){return s.idToken=e.get(s.idTokenName),s.idToken},redirectIfLoggedIn:async function(){if(!s.accessToken)return u();if(w("redirect"))return l(w("redirect"));try{const{data:e}=await t.get(n+"self",{headers:{authorization:"Bearer "+s.accessToken}});e.tenant&&e.tenant.loginRedirectPath&&l(e.tenant.loginRedirectPath)}catch(e){u()}},user:g,isTestHostname:a};export default v;
//# sourceMappingURL=userfront-core.modern.js.map
