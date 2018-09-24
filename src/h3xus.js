var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Composites = Matter.Composites,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine;
var world;
var particles = [];

function setup() {
  createCanvas(700, 600);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;

  engine.world.gravity.y = 0;

  spawn_particles();
  //setControls();
}

function spawn_particles() {
  for (var i = 0; i < 100; i++) {
    particles.push(
      new Particle(
        random(100, width - 100),
        random(100, height - 100)
      )
    );
  }

  for (var p in particles) {
    particles[p].random_move();
  }
}

function get_center() {
  var l = particles.length;
  var x = 0;
  var y = 0;

  for (var prop in particles) {
    var d = particles[prop];
    x += d.body.position.x;
    y += d.body.position.y;
  }

  return createVector(
    x / l,
    y / l
  );
}

function draw() {
  background(255);

  var center = get_center();

  for (var p in particles) {
    particles[p].check_bound();
    particles[p].update();
    particles[p].draw_lines();
    particles[p].show();
  }

  Engine.update(engine, 1000 / 60);
}

