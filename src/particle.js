function Particle(x, y, options_) {
  var options = Object.assign({
    friction: 0.3,
    restitution: 0.6
  }, options_);

  if (options.color) {
    this.fill_color = options.color;
    this.border_color = options.border_color;
  } else {
    //this.fill_color = color(random() * 255, random() * 255, random() * 255);
    //this.border_color = color(random() * 255, random() * 255, random() * 255);
    colorMode(HSB);
    this.fill_color = color(random(255), 127, random(100, 255));
    this.border_color = color(random(255), 127, random(100, 255));
  }

  this.base_radius = 3;
  this.radius = this.base_radius;
  this.distance_threshold = random(25, 75);

  this.body = Bodies.circle(x, y, this.radius, options);

  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    ellipseMode(CENTER);
    strokeWeight(1);
    stroke(this.border_color);
    fill(this.fill_color);
    ellipse(0, 0, this.radius);
    pop();
  };

  this.get_position_vector = function() {
    return createVector(
      this.body.position.x,
      this.body.position.y
    );
  };

  this.update = function() {
    if (random() < 0.01) {
      this.random_move();
    }
  };

  this.check_bound = function() {
    var pos = this.body.position;

    if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
      Body.setPosition(
        this.body,
        {
          x: random(100, width - 100),
          y: random(100, height - 100)
        }
      );

      Body.setVelocity(
        this.body,
        {
          x: 0,
          y: 0
        }
      );
    }
  };

  this.towards = function(position, force) {
    var pos1 = this.get_position_vector();
    var pos2 = position.copy();
    var pos3 = pos2.sub(pos1);

    pos3.setMag(force);

    Body.applyForce(
      this.body, {
        x: pos1.x,
        y: pos1.y
      },
      {
        x: pos3.x,
        y: pos3.y
      }
    );
  };

  this.random_move = function() {
    var vec = p5.Vector.random2D();
    vec.add(this.get_position_vector());

    this.towards(
      vec,
      0.00005
    );
  };

  this.draw_lines = function() {
    var my_position = this.get_position_vector();

    var connection_count = 0;

    for (var i in particles) {
      var part = particles[i];
      var part_position = part.get_position_vector();

      var distance = my_position.dist(part_position);

      if (distance < this.distance_threshold) {

        connection_count += 1;

        strokeWeight(0.5);
        stroke(this.border_color);

        line(
          my_position.x,
          my_position.y,
          part_position.x,
          part_position.y
        );
      }
    }

    this.radius = this.base_radius + connection_count / 3;
  };
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  var arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
