backto-scripttag
======================
I was tired of using package managers, module bundlers and transpilers.
Npm, webpack, rollup, typescript and babel, are they really needed for
creating a small browser application?

Now the time back to the good old script tag to write a JavaScript.
Fortunately, we have [ES2015](https://babeljs.io/docs/learn-es2015/) and
[Visual Studio Code](https://code.visualstudio.com/), so
we can use their [powerfull features](https://github.com/lukehoban/es6features) and
[intellisense](https://code.visualstudio.com/Docs/languages/javascript).

### How is this sample project made

Write the jsconfig.json.

```
{
    "compilerOptions": {
        "target": "es2015"
    }
}
```

Create the small utility function to load multiple js files (poor man's requirejs).

```
function loadJss(files, base) {
    base = base || '';
    files.split(',').forEach(f => {
        const script = document.createElement('script');
        script.setAttribute('src', `${base}${f.trim()}`);
        script.async = false;
        document.getElementsByTagName('body')[0].appendChild(script);
    });
}
const script = document.getElementsByTagName('script')[0];
const files = script.getAttribute('data-files');
if (files != null) {
    loadJss(files, script.getAttribute('data-base'));
}
```

Load js files in index.html.
Libraries ([lodash](https://lodash.com/) and [matter-js](http://brm.io/matter-js/))
should be downloaded and placed in the js/lib/ directory

```
<html>

<body>
    <script src='./js/loadJss.js'
    data-files='lib/lodash.min.js, lib/matter.min.js, MyMatterUtil.js, index.js'
    data-base='./js/'></script>
</body>

</html>
```

or load from cdnjs.com.

```
    <script src='./js/loadJss.js'></script>
    <script>
        loadJss('lodash.js/4.6.1/lodash.min.js, matter-js/0.9.1/matter.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/');
        loadJss('MyMatterUtil.js, index.js', './js/');
    </script>
```

Use [typings](https://github.com/typings/typings) or [tsd](https://github.com/DefinitelyTyped/tsd) to
get .d.ts files for lodash and matter-js.
Now you can use an intellisense for functions of these libraries.

Write your own module as a const variable.

```
const MyMatterUtil = {
    engine: {},
    init: function() {
        engine = Matter.Engine.create(document.body);
        Matter.Engine.run(engine);
    },
    Box: class {
        constructor(x, y, w, h, isStatic = false) {
            this.box = Matter.Bodies.rectangle(x, y, w, h, { isStatic });
            Matter.World.add(engine.world, this.box);
        }
    }
};
```

Write index.js. An intellisense is ready for MyMatterUtil *without*
writing a MyMatterUtil.d.ts file.

```
window.onload = () => {
    MyMatterUtil.init();
    new MyMatterUtil.Box(400, 200, 80, 80);
    _.times(5, i => {
        new MyMatterUtil.Box(300 + i * 40, 10 + i * 30, 100, 20);
    });
    new MyMatterUtil.Box(400, 610, 810, 60, true);
};
```

Open index.html and see the result. No build process required.

If you need a livereloading, use [LiveReloadX](http://nitoyon.github.io/livereloadx/).
Write tasks.json to launch it from the Visual Studio Code.

```
{
    "version": "0.1.0",
    "command": "livereloadx",
    "isShellCommand": true,
    "tasks": [
        {
            "taskName": "livereloadx",
            "args": [
                "-s"
            ],
            "suppressTaskName": true,
            "isBuildCommand": true,
            "showOutput": "silent"
        }
    ]
}
```

### Pros and cons

#### Pros

* No build process, no task runner, no node_modules.
* Project's file structure remains simple.

#### Cons

* Library files should be placed manually.
* Global namespace (window) is polluted.
* Static code analysis (such as type-checking) is very limited.
* Working only on modern browsers supporting ES2015 (Chrome and Firefox).

License
----------
MIT
