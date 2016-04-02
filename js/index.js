window.onload = () => {
    MyMatterUtil.init();
    new MyMatterUtil.Box(400, 200, 80, 80);
    _.times(5, i => {
        new MyMatterUtil.Box(300 + i * 40, 10 + i * 30, 100, 20);
    });
    new MyMatterUtil.Box(400, 610, 810, 60, true);
};