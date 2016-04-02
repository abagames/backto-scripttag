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