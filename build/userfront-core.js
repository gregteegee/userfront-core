function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=e(require("axios")),o=e(require("js-cookie"));function r(e,t){try{var o=e()}catch(e){return t(e)}return o&&o.then?o.then(void 0,t):o}var n="https://api.userfront.com/v0/",s=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g,i=function(e){try{var t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(s))}catch(e){return!0}},a={mode:i()?"test":"live"};function c(e,t,r){var n=r+"."+a.tenantId;t=t||{secure:"live"===a.mode,sameSite:"Lax"},"refresh"===r&&(t.sameSite="Strict"),o.set(n,e,t)}function u(e){o.remove(e),o.remove(e,{secure:!0,sameSite:"Lax"}),o.remove(e,{secure:!0,sameSite:"None"}),o.remove(e,{secure:!1,sameSite:"Lax"}),o.remove(e,{secure:!1,sameSite:"None"})}module.exports={getMode:function(){try{var e=r(function(){return Promise.resolve(t.get(n+"tenants/"+a.tenantId+"/mode")).then(function(e){a.mode=e.data.mode||"test"})},function(){a.mode="test"});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},init:function(e,t){if(void 0===t&&(t={}),!e)return console.warn("Userfront initialized without tenant ID");a.tenantId=e,a.signupModId=t.signup,a.loginModId=t.login,a.logoutModId=t.logout,a.resetModId=t.reset,a.accessTokenName="access."+e,a.idTokenName="id."+e,a.refreshTokenName="refresh."+e},isTestHostname:i,logout:function(){try{var e=o.get(a.accessTokenName);if(!e)return Promise.resolve();var s=r(function(){return Promise.resolve(t.get(n+"auth/logout",{headers:{authorization:"Bearer "+e}})).then(function(e){var t=e.data;u(a.accessTokenName),u(a.idTokenName),u(a.refreshTokenName),window.location.href=t.redirectTo})},function(){});return Promise.resolve(s&&s.then?s.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},scope:a,setCookie:c,signup:function(e){var o=e.username,r=e.name,s=e.email,i=e.password;try{return Promise.resolve(t.post(n+"auth/create",{tenantId:a.tenantId,username:o,name:r,email:s,password:i})).then(function(e){var t=e.data;if(!t.tokens)throw new Error("Please try again.");c(t.tokens.access.value,t.tokens.access.cookieOptions,"access"),c(t.tokens.id.value,t.tokens.id.cookieOptions,"id"),c(t.tokens.refresh.value,t.tokens.refresh.cookieOptions,"refresh"),window.location.href=t.redirectTo})}catch(e){return Promise.reject(e)}}};
//# sourceMappingURL=userfront-core.js.map
