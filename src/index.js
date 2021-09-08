export default (editor, opts = {}) => {
  const options = {
    ...{
      // Firebase app credentials
      firebaseConfig: {},

      // Firebase storage folder name
      fileName: 'assets',

      // On upload snapshot
      onSnapshot(snapshot) {
        console.log(snapshot);
      },

      // On upload error
      onError(err) {
        console.error(err);
      },

      // On upload complete
      onComplete() { },

      // Load all assets
      loadAll: 1,
    }, ...opts
  };

  let storage;
  const { $ } = editor;
  const pfx = editor.getConfig('stylePrefix');
  const am = editor.Assets;
  const cm = editor.Commands;
  const md = editor.Modal;

  if (!firebase.apps.length) {
    firebase.initializeApp(options.firebaseConfig);
    storage = firebase.storage();
  } else {
    firebase.app();
    storage = firebase.storage();
  }

  editor.on('run:open-assets', () => {
    const dropZone = $(md.getContentEl()).find(`#${pfx}am-uploadFile`);
    dropZone.removeAttr('disabled');

    dropZone.on('change', function (e) {
      const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      for (let file of files) {
        const { name } = file;
        const ref = storage.ref(`${options.fileName}/${name}`);
        const task = ref.put(file);

        task.on('state_change',
          (snapshot) => {
            options.onSnapshot && options.onSnapshot(snapshot);
          },
          (err) => {
            options.onError && options.onError(err);
          },
          () => {
            task.snapshot.ref.getDownloadURL().then((src) => {
              // Add to am
              am.add({ src, name });
              // User function
              options.onComplete && options.onComplete({ name, src });
            });
          }
        );
      }
    });
  });

  // Create loadall assets command
  cm.add('get-firebase-assets', () => {
    storage.ref().child(options.fileName).listAll()
      .then(res => {
        res.items.forEach(ref => {
          ref.getDownloadURL().then((src) => {
            const { name } = ref;
            am.add({ name, src });
          });
        });
      });
  });

  // Optionally run loadall onload
  editor.on('load', () => options.loadAll && editor.runCommand('get-firebase-assets'));
};
