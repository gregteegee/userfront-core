function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=e(require("js-cookie")),r=e(require("axios"));const n="https://api.userfront.com/v0/",o=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g;function i(e){try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(o))}catch(e){return!0}}function s(e){var t,r;if(e){if("string"==typeof e)throw new Error(e);if(null!=e&&null!=(t=e.response)&&null!=(r=t.data)&&r.message)throw new Error(e.response.data.message);throw e}}const a={user:{},tokens:{},mode:i()?"test":"live"};function c(){["access","id","refresh"].map(e=>{try{const r=t.get(a.tokens[e+"TokenName"]);a.tokens[e+"Token"]=r}catch(t){console.warn(`Problem setting ${e} token.`)}})}const u=a.tokens;function d(e,r,n){const o=`${n}.${a.tenantId}`;r=r||{secure:"live"===a.mode,sameSite:"Lax"},"refresh"===n&&(r.sameSite="Strict"),t.set(o,e,r)}function h(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}function f(){h(a.tokens.accessTokenName),h(a.tokens.idTokenName),h(a.tokens.refreshTokenName),a.tokens.accessToken=void 0,a.tokens.idToken=void 0,a.tokens.refreshToken=void 0}function l(e){d(e.access.value,e.access.cookieOptions,"access"),d(e.id.value,e.id.cookieOptions,"id"),e.refresh&&e.refresh.value&&d(e.refresh.value,e.refresh.cookieOptions,"refresh"),c()}function m(e){if("object"==typeof window&&"object"==typeof window.location&&window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function w(e,{redirect:t}={}){if(!1===t||"object"!=typeof document||"object"!=typeof window)return;try{document&&window}catch(e){return}if(t&&(e=t),!e)return;const r=document.createElement("a");r.href=e,r.pathname!==window.location.pathname&&window.location.assign(`${r.pathname}${r.hash}${r.search}`)}function p(){if(!a.tokens.idToken)return console.warn("Cannot define user: missing ID token");a.user=a.user||{};const e=function(e){try{const t=e.split(".")[1].replace("-","+").replace("_","/");return JSON.parse(atob(t))}catch(e){console.error("Problem decoding JWT payload",e)}}(a.tokens.idToken),t=["email","username","name","image","data","confirmedAt","createdAt","updatedAt","mode","userId","userUuid","tenantId","isConfirmed"];for(const r of t){if("update"===r)return;a.user[r]=e[r]}}const k=a.user;function v(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}const g=function({}){return Promise.resolve()},P=function(){try{const e=v(function(){return Promise.resolve(function(){try{const e=t.get(a.tokens.refreshTokenName);return Promise.resolve(v(function(){return Promise.resolve(r.get(n+"auth/refresh",{headers:{authorization:"Bearer "+e}})).then(function({data:e,status:t}){if(200!==t)throw new Error(e.message||"Problem with request");if(e.tokens)return l(e.tokens),e;throw new Error("Problem setting cookies")})},function(e){var t,r;if(null!=e&&null!=(t=e.response)&&null!=(r=t.data)&&r.message)throw new Error(e.response.data.message);throw e}))}catch(e){return Promise.reject(e)}}()).then(function(){p()})},function(e){console.warn("Refresh failed: "+e.message)});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}};function y(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}function T({provider:e,redirect:t}){if(!e)throw new Error("Missing provider");if(!a.tenantId)throw new Error("Missing tenant ID");let r=`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${a.tenantId}&origin=${window.location.origin}`,n=t||m("redirect");return!1===t&&(n="object"==typeof document&&document.location.pathname),n&&(r+="&redirect="+encodeURIComponent(n)),r}a.user.update=function(e){try{return!e||Object.keys(e).length<1?Promise.resolve(console.warn("Missing user properties to update")):Promise.resolve(r.put(n+"self",e,{headers:{authorization:"Bearer "+a.tokens.accessToken}})).then(function(){return Promise.resolve(P()).then(function(){return a.user})})}catch(e){return Promise.reject(e)}};let E=[],I=!1;module.exports={addInitCallback:function(e){e&&"function"==typeof e&&E.push(e)},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");a.tenantId=e,a.tokens=a.tokens||{},a.tokens.accessTokenName="access."+a.tenantId,a.tokens.idTokenName="id."+a.tenantId,a.tokens.refreshTokenName="refresh."+a.tenantId,c(),a.tokens.idToken&&p();try{E.length>0&&E.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})}),E=[]}catch(e){}},registerUrlChangedEventListener:function(){if(!I){I=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},logout:function(){try{if(!a.tokens.accessToken)return Promise.resolve(f());const e=function(e,t){try{var o=Promise.resolve(r.get(n+"auth/logout",{headers:{authorization:"Bearer "+a.tokens.accessToken}})).then(function({data:e}){f(),w(e.redirectTo)})}catch(e){return t()}return o&&o.then?o.then(void 0,t):o}(0,function(){f()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setMode:function(){try{const e=function(e,t){try{var o=Promise.resolve(r.get(`${n}tenants/${a.tenantId}/mode`)).then(function({data:e}){a.mode=e.mode||"test"})}catch(e){return t()}return o&&o.then?o.then(void 0,t):o}(0,function(){a.mode="test"});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},refresh:P,login:function({method:e,email:t,username:o,emailOrUsername:i,password:c,token:u,uuid:d,redirect:h}={}){try{if(!e)throw new Error('Userfront.login called without "method" property.');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function({provider:e,redirect:t}){if(!e)throw new Error("Missing provider");const r=T({provider:e,redirect:t});window.location.assign(r)}({provider:e,redirect:h}));case"password":return function({email:e,username:t,emailOrUsername:o,password:i,redirect:c}){try{return Promise.resolve(y(function(){return Promise.resolve(r.post(n+"auth/basic",{tenantId:a.tenantId,emailOrUsername:e||t||o,password:i})).then(function({data:e}){if(e.tokens)return l(e.tokens),Promise.resolve(g(e)).then(function(){return w(m("redirect")||e.redirectTo||"/",{redirect:c}),e});throw new Error("Please try again.")})},function(e){s(e)}))}catch(e){return Promise.reject(e)}}({email:t,username:o,emailOrUsername:i,password:c,redirect:h});case"link":return function({token:e,uuid:t,redirect:o}={}){try{return Promise.resolve(y(function(){if(e=e||m("token"),t=t||m("uuid"),e&&t)return Promise.resolve(r.put(n+"auth/link",{token:e,uuid:t,tenantId:a.tenantId})).then(function({data:e}){if(e.tokens)return l(e.tokens),Promise.resolve(g(e)).then(function(){return w(m("redirect")||e.redirectTo||"/",{redirect:o}),e});throw new Error("Problem logging in.")})},function(e){s(e)}))}catch(e){return Promise.reject(e)}}({token:u,uuid:d,redirect:h});default:throw new Error('Userfront.login called with invalid "method" property.')}}catch(e){return Promise.reject(e)}},resetPassword:function({uuid:e,token:t,password:o,redirect:i}){try{return Promise.resolve(y(function(){if(t=t||m("token"),e=e||m("uuid"),!t||!e)throw new Error("Missing token or uuid");return Promise.resolve(r.put(n+"auth/reset",{tenantId:a.tenantId,uuid:e,token:t,password:o})).then(function({data:e}){if(e.tokens)return l(e.tokens),w(m("redirect")||e.redirectTo||"/",{redirect:i}),e;throw new Error("There was a problem resetting your password. Please try again.")})},function(e){s(e)}))}catch(e){return Promise.reject(e)}},sendLoginLink:function(e){try{return Promise.resolve(y(function(){return Promise.resolve(r.post(n+"auth/link",{email:e,tenantId:a.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link.")}))}catch(e){return Promise.reject(e)}},sendResetLink:function(e){try{return Promise.resolve(y(function(){return Promise.resolve(r.post(n+"auth/reset/link",{email:e,tenantId:a.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link.")}))}catch(e){return Promise.reject(e)}},signup:function({method:e,username:t,name:o,email:i,password:s,data:c,redirect:u}={}){try{if(!e)throw new Error('Userfront.signup called without "method" property.');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function({provider:e,redirect:t}){if(!e)throw new Error("Missing provider");const r=T({provider:e,redirect:t});window.location.assign(r)}({provider:e,redirect:u}));case"password":return function({username:e,name:t,email:o,password:i,userData:s,redirect:c}={}){try{return Promise.resolve(y(function(){return Promise.resolve(r.post(n+"auth/create",{tenantId:a.tenantId,username:e,name:t,email:o,password:i,data:s})).then(function({data:e}){if(e.tokens)return l(e.tokens),Promise.resolve(g(e)).then(function(){return w(m("redirect")||e.redirectTo||"/",{redirect:c}),e});throw new Error("Please try again.")})},function(e){var t,r;if(null!=e&&null!=(t=e.response)&&null!=(r=t.data)&&r.message)throw new Error(e.response.data.message);throw e}))}catch(e){return Promise.reject(e)}}({username:t,name:o,email:i,password:s,userData:c,redirect:u});default:throw new Error('Userfront.signup called with invalid "method" property.')}}catch(e){return Promise.reject(e)}},store:a,tokens:u,accessToken:function(){return a.tokens.accessToken=t.get(a.tokens.accessTokenName),a.tokens.accessToken},idToken:function(){return a.tokens.idToken=t.get(a.tokens.idTokenName),a.tokens.idToken},redirectIfLoggedIn:function(){try{if(!a.tokens.accessToken)return Promise.resolve(f());if(m("redirect"))return Promise.resolve(w(m("redirect")));const e=function(e,t){try{var o=Promise.resolve(r.get(n+"self",{headers:{authorization:"Bearer "+a.tokens.accessToken}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&w(e.tenant.loginRedirectPath)})}catch(e){return t()}return o&&o.then?o.then(void 0,t):o}(0,function(){f()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},user:k,isTestHostname:i};
//# sourceMappingURL=userfront-core.js.map
