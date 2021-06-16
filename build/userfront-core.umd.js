!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("js-cookie"),require("axios")):"function"==typeof define&&define.amd?define(["js-cookie","axios"],t):(e=e||self).core=t(e.jsCookie,e.axios)}(this,function(e,t){e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;const n="https://api.userfront.com/v0/",r=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g;function o(e){try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(r))}catch(e){return!0}}const i={user:{},mode:o()?"test":"live"};function s(){["access","id","refresh"].map(t=>{try{const n=e.get(i[t+"TokenName"]);i[t+"Token"]=n}catch(e){console.warn(`Problem setting ${t} token.`)}})}function a(t,n,r){const o=`${r}.${i.tenantId}`;n=n||{secure:"live"===i.mode,sameSite:"Lax"},"refresh"===r&&(n.sameSite="Strict"),e.set(o,t,n)}function c(t){e.remove(t),e.remove(t,{secure:!0,sameSite:"Lax"}),e.remove(t,{secure:!0,sameSite:"None"}),e.remove(t,{secure:!1,sameSite:"Lax"}),e.remove(t,{secure:!1,sameSite:"None"})}function u(){c(i.accessTokenName),c(i.idTokenName),c(i.refreshTokenName),i.accessToken=void 0,i.idToken=void 0,i.refreshToken=void 0}function d(e){a(e.access.value,e.access.cookieOptions,"access"),a(e.id.value,e.id.cookieOptions,"id"),a(e.refresh.value,e.refresh.cookieOptions,"refresh"),s()}function h(e){if(window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function f(e){try{document}catch(e){return}if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&window.location.assign(`${t.pathname}${t.hash}${t.search}`)}let l;const m={};function p(e){try{m[e.data.messageId].resolve(e.data)}catch(e){}}function w(e){if(e&&"https://auth.userfront.net"===e.origin&&e.data&&e.data.type){if(200!==e.data.status&&"logout"!==e.data.type)return console.warn(`Problem with ${e.data.type} request.`),function(e){try{m[e.data.messageId].reject()}catch(e){}}(e);switch(e.data.type){case"exchange":return void p(e);case"refresh":return d(e.data.body.tokens),void p(e);case"logout":p(e);break;default:return}}}let v=!1;function g(){if(!v)try{window.addEventListener("message",w),v=!0}catch(e){}}const k=function({}){return Promise.resolve()};function y(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function P(e){if(!e)throw new Error("Missing provider");if(!i.tenantId)throw new Error("Missing tenant ID");let t=`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${i.tenantId}&origin=${window.location.origin}`;const n=h("redirect");return n&&(t+="&redirect="+encodeURIComponent(n)),t}function T(){if(!i.idToken)return console.warn("Cannot define user: missing ID token");i.user=i.user||{};const e=function(e){try{const t=e.split(".")[1];return JSON.parse(atob(t))}catch(e){console.error("Problem decoding JWT payload",e)}}(i.idToken),t=["email","username","name","image","data","confirmedAt","createdAt","updatedAt","mode","userId","userUuid","tenantId","isConfirmed"];for(const n of t){if("update"===n)return;i.user[n]=e[n]}}const I=i.user;I.update=function(e){try{return!e||Object.keys(e).length<1?Promise.resolve(console.warn("Missing user properties to update")):Promise.resolve(t.put(n+"self",e,{headers:{authorization:"Bearer "+i.accessToken}})).then(function(){return Promise.resolve(Promise.resolve()).then(function(){return T(),i.user})})}catch(e){return Promise.reject(e)}};let E=[],j=!1;return{addInitCallback:function(e){e&&"function"==typeof e&&E.push(e)},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");i.tenantId=e,i.accessTokenName="access."+e,i.idTokenName="id."+e,i.refreshTokenName="refresh."+e,function(){try{if(l)return;const e=document.getElementById("uf-auth-frame");if(e)return l=e,void g();l=document.createElement("iframe"),l.src="https://auth.userfront.net",l.id="uf-auth-frame",l.style.width="0px",l.style.height="0px",l.style.display="none",document.body.appendChild(l),g()}catch(e){}}(),s(),i.idToken&&T();try{E.length>0&&E.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})}),E=[]}catch(e){}},registerUrlChangedEventListener:function(){if(!j){j=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},logout:function(){try{if(!i.accessToken)return Promise.resolve(u());const e=function(e,r){try{var o=Promise.resolve(t.get(n+"auth/logout",{headers:{authorization:"Bearer "+i.accessToken}})).then(function({data:e}){u(),f(e.redirectTo)})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){u()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setMode:function(){try{const e=function(e,r){try{var o=Promise.resolve(t.get(`${n}tenants/${i.tenantId}/mode`)).then(function({data:e}){i.mode=e.mode||"test"})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){i.mode="test"});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},login:function({method:e,email:r,username:o,emailOrUsername:s,password:a,token:c,uuid:u}={}){try{if(!e)return Promise.reject('Userfront.login called without "method" property');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=P(e);window.location.assign(t)}(e));case"password":return function({email:e,username:r,emailOrUsername:o,password:s}){try{return Promise.resolve(t.post(n+"auth/basic",{tenantId:i.tenantId,emailOrUsername:e||r||o,password:s})).then(function({data:e}){return function(){if(e.tokens)return d(e.tokens),Promise.resolve(k(e)).then(function(){f(h("redirect")||e.redirectTo||"/")});throw new Error("Please try again.")}()})}catch(e){return Promise.reject(e)}}({email:r,username:o,emailOrUsername:s,password:a});case"link":return function(e,r){try{return e||(e=h("token")),r||(r=h("uuid")),e&&r?Promise.resolve(t.put(n+"auth/link",{token:e,uuid:r,tenantId:i.tenantId})).then(function({data:e}){if(!e.tokens)throw new Error("Problem logging in.");d(e.tokens),f(h("redirect")||e.redirectTo||"/")}):Promise.resolve()}catch(e){return Promise.reject(e)}}(c,u);default:return Promise.reject('Userfront.login called with invalid "method" property')}}catch(e){return Promise.reject(e)}},resetPassword:function({uuid:e,token:r,password:o}){try{if(r||(r=h("token")),e||(e=h("uuid")),!r||!e)throw new Error("Missing token or uuid");return Promise.resolve(t.put(n+"auth/reset",{tenantId:i.tenantId,uuid:e,token:r,password:o})).then(function({data:e}){if(!e.tokens)throw new Error("There was a problem resetting your password. Please try again.");d(e.tokens),f(h("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}},sendLoginLink:function(e){try{return Promise.resolve(y(function(){return Promise.resolve(t.post(n+"auth/link",{email:e,tenantId:i.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},sendResetLink:function(e){try{return Promise.resolve(y(function(){return Promise.resolve(t.post(n+"auth/reset/link",{email:e,tenantId:i.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},signup:function({method:e,username:r,name:o,email:s,password:a}={}){try{if(!e)return Promise.reject('Userfront.signup called without "method" property');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=P(e);window.location.assign(t)}(e));case"password":return function({username:e,name:r,email:o,password:s}){try{return Promise.resolve(t.post(n+"auth/create",{tenantId:i.tenantId,username:e,name:r,email:o,password:s})).then(function({data:e}){return function(){if(e.tokens)return d(e.tokens),Promise.resolve(k(e)).then(function(){f(h("redirect")||e.redirectTo||"/")});throw new Error("Please try again.")}()})}catch(e){return Promise.reject(e)}}({username:r,name:o,email:s,password:a});default:return Promise.reject('Userfront.signup called with invalid "method" property')}}catch(e){return Promise.reject(e)}},store:i,accessToken:function(){return i.accessToken=e.get(i.accessTokenName),i.accessToken},idToken:function(){return i.idToken=e.get(i.idTokenName),i.idToken},redirectIfLoggedIn:function(){try{if(!i.accessToken)return Promise.resolve(u());if(h("redirect"))return Promise.resolve(f(h("redirect")));const e=function(e,r){try{var o=Promise.resolve(t.get(n+"self",{headers:{authorization:"Bearer "+i.accessToken}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&f(e.tenant.loginRedirectPath)})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){u()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},user:I,isTestHostname:o}});
//# sourceMappingURL=userfront-core.umd.js.map
