function loadJss(files, base) {
    base = base || '';
    files.split(',').forEach(f => {
        const script = document.createElement('script');
        script.setAttribute('src', `${base}${f.trim()}`);
        document.getElementsByTagName('body')[0].appendChild(script);
    });
}
const script = document.getElementsByTagName('script')[0];
const files = script.getAttribute('data-files');
if (files != null) {
    loadJss(files, script.getAttribute('data-base'));
}
