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
  setup_canvas();

  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;

  engine.world.gravity.y = 0;

  spawn_particles(10);

  textFont('Monaco', 40);
}

function setup_canvas() {
  var main = $('body');
  var canvasSection = $('#canvasSection');

  if (canvasSection.length > 0) {
    var canvas = createCanvas(main.width(), main.height());

    canvasSection.css('z-index' , '-1');

    canvas.parent('#canvasSection');

    canvasSection.css({
      position: "absolute",
      marginLeft: 0, marginTop: 0,
      top: 0, left: 0
    });
  } else {
    createCanvas(700, 600);
  }
}

function spawn_particles(n) {
  for (var i = 0; i < n; i++) {
    spawn_particle();
  }
}

function spawn_particle() {
  var p = new Particle(
      random(100, width - 100),
      random(100, height - 100)
    );
  particles.push(p);
  p.random_move();
}

function kill_particles(n) {
  for (var i = 0; i < n; i++) {
    particles.pop();
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
  manage_particle_count();
}

