# Dependency Change Log

## package.json
The file `package.json` was originally taken from material design theme FUSE. In course of development following 
changes were made and dependencies added:

### scripts

```json
"start": "ng serve --proxy-config src/app/investment-portal/proxy.conf.json",
"build": "node --max_old_space_size=6144 ./node_modules/@angular/cli/bin/ng build --dev --base-href /portal/",
"build-prod": "node --max_old_space_size=6144 ./node_modules/@angular/cli/bin/ng build --prod --base-href /portal/"
```

### dependencies

**Redux**

```json
"@angular-redux/store": "^7.0.0",
"redux": "^3.7.2",
"redux-observable": "^0.17.0"
```

**Hash function**

```json
"ts-md5": "^1.2.2"
```

**Bootstrap**

```json
"@ng-bootstrap/ng-bootstrap": "1.0.0-beta.5"
```

**ngx-charts**

```json
"@swimlane/ngx-charts": "7.0.0"
```

### devDependencies

**Karma**

```json
"karma-junit-reporter": "1.2.0",
"karma-phantomjs-launcher": "1.0.4"
```

**PhantomJS**

```json
"phantomjs": "2.1.7"
```


# Proxy config

As a resolution of the cross-origin server issue there was created config file `proxy.config.json`. Please follow 
settings described below. Be aware **not to commit** `Development setting` into master branch (CI wouldn't work).

## Development setting

```json
{
 "/api": {
   "target": "http://localhost:8085",
   "secure": false,
   "pathRewrite": {
     "^/api": ""
   },
   "ws":true
 },
 "changeOrigin": false
}
```

## Production setting

```json
{
  "/api": {
    "target": "https://investment-portal.duckdns.org/portal",
    "secure": false
  },
  "ws":true,
  "changeOrigin": true
}
```


