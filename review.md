## High
 - [x] src/helpers/localStorage.ts: Using any is quite risky and can lead to runtime errors. It would be nice with a typed interface for LocalStorage. I have some ideas of how to solve this so let me know if you want ideas.
 - [x] src/helpers/connCheck.ts: I would suggest creating an interface for the data and use as return type instead of any.

 - [?] Both web-ext and vue-cli contains a lot of vulnerabilities. I'm not sure what the best approach is here. I tried updating packages to resolve those vulnerabilities but wasn't successful. I didn't spend a lot of time on it though.

 - [x] src/popup/views/Location.vue: Is the assumption that StorageKeys.servers and StorageKeys.socksProtocol are set in LocalStorage correct? You can't open that view if you're not connected right? I guess the only situation where this could cause errors is if the API is down. Do we want to be able to handle that?
 - [x] package-lock.json Isn't up to date with package.json
 - [x] package.json: vue-scli-plugin-browser-extension probably shouldn't be latest?

## Medium
 - [ ] vue.config.js config.plugins.delete('fork-ts-checker');: Looks like the issue mentioned was fixed in 2018?
 
 - [?] src/popup/views/Home.vue: How about splitting created() into multiple methods to make it easier to follow?
 
 - [x] Is both public/index.html and public/browser-extension.html used?
 - [x] src/helpers/servers.ts: Could adding countries and cities for inactive relays cause issues? Wouldn't it make more sense to wrap servers[countryName] = {} and server[countryName][cityName] = [] in if (server.active) as well?

## Low
 - [x] src/helpers/servers.ts: Why not use async/await?
 - [x] src/helpers/socks.ts: Maybe move IP addresses to constants?
 - [x] .browserslistrc: Shouldn't latest few versions of Firefox? Something like last 2 Firefox versions would probably do. Can be extended to last 2 Firefox versions or last two Chrome versions in the future. I assume the current specification includes support browsers that we won't release the webextension for. This isn't very important though, but would save a bit on size and probably performance as well.
 - [x] src/popup/views/Home.vue: There seems to be a lot of v-ifs could be replaced with v-else, e.g.
 ```
<button v-if="!socksEnabled" ...>
<button v-if="socksEnabled"...> 
```
Since I don't have any experience with Vue I don't know what the recommended practices are. The reason I mention this is that I can imagine one condition being left unchanged when doing future changes to on of them. This is also the case for `<div v-if="!connection.isMullvad">` and `<div v-if="socksEnabled">` as well.
 - [x] src/popup/views/Home.vue: Stylepreference: return values in if statements in computed values instead of assigning and reassigning a variable. This is just my preference, if you disagree that's totally fine