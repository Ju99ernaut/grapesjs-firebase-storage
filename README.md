# Grapesjs Firebase Storage

> Tested on firebase v8+. Firebase v9+ not yet supported.

Wrapper for firebase storage. Files uploaded through asset manager will be added to your firebase app storage bucket.

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-firebase-storage"></script>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-storage.js"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  assetManager: {
    embedAsBase64: 0, // Disable base64 encoding 
  },
  plugins: ['grapesjs-firebase-storage'],
  pluginsOpts: {
    'grapesjs-firebase-storage': {
      firebaseConfig: {
        // ...
      }
    }
  }
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```


## Summary

* Plugin name: `grapesjs-firebase-storage`
* Commands
    * `get-firebase-assets`



## Options

| Option | Description | Default |
|-|-|-
| `firebaseConfig` | Firebase app credentials | `{}` |
| `fileName` | Firebase storage folder name | `assets` |
| `onSnapshot` | Upload progress snapshot | `check source` |
| `onError` | On upload error | `check source` |
| `onComplete` | On upload complete | `check source` |
| `loadAll` | Load all assets on editor load | `1` |


## Usage in combination with firestore

Configure your firebase app access rules for firestore and storage.

Add Libraries to `head` of document

```js
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-firebase-storage"></script>
<link href="https://unpkg.com/grapesjs-project-manager/dist/grapesjs-project-manager.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs-project-manager"></script>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-storage.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-firestore.js"></script>
```

Initialize `grapesjs`, with `grapesjs-firebase-storage` and `grapesjs-project-manager` plugins.

```js
window.editor = grapesjs.init({
  height: '100%',
  container: '#gjs',
  showOffsets: true,
  fromElement: true,
  noticeOnUnload: false,
  pageManager: true,
  assetManager: {
    embedAsBase64: 0,
  },
  storageManager:  {
    type: 'firestore'
  },
  plugins: ['grapesjs-firebase-storage', 'grapesjs-project-manager'],
  pluginsOpts: {
    'grapesjs-firebase-storage': {
      firebaseConfig: {
        apiKey: "FIREBASE_API_KEY",
        authDomain: "PROJECT_ID.firebaseapp.com",
        projectId: "PROJECT_ID",
        databaseURL: "https://PROJECT_ID.firebaseio.com",
        storageBucket: "PROJECT_ID.appspot.com",
        messagingSenderId: "SENDER_ID",
        appId: "APP_ID",
        measurementId: "MEASUREMENT_ID"
      }
    }
  }
});

// Optional: Add template manager buttons
const pn = editor.Panels;
const panelOpts = pn.addPanel({
  id: 'options'
});
panelOpts.get('buttons').add([{
  attributes: {
    title: 'Open Templates'
  },
  className: 'fa fa-file-o',
  command: 'open-templates',//Open modal 
  id: 'open-templates'
}, {
  attributes: {
    title: 'Save As Template'
  },
  className: 'fa fa-archive',
  command: 'save-as-template',//Save page as template
  id: 'save-as-template'
}, {
  attributes: {
    title: 'Delete Template'
  },
  className: 'fa fa-trash-o',
  command: 'delete-template',//Delete open page or template
  id: 'delete-templates'
}, {
  attributes: {
    title: 'Take Screenshot'
  },
  className: 'fa fa-camera',
  command: 'take-screenshot',//Take an image of the canvas
  id: 'take-screenshot'
}]);
```


## Download

* CDN
  * `https://unpkg.com/grapesjs-firebase-storage`
* NPM
  * `npm i grapesjs-firebase-storage`
* GIT
  * `git clone https://github.com/Ju99ernaut/grapesjs-firebase-storage.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-firebase-storage.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-firebase-storage'],
      pluginsOpts: {
        'grapesjs-firebase-storage': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-firebase-storage';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/Ju99ernaut/grapesjs-firebase-storage.git
$ cd grapesjs-firebase-storage
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
