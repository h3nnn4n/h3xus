p5.disableFriendlyErrors = true;

var fps_counter = 60;
var average_fps = 0;
var perf_update_interval = 30;
var debug = false;

function manage_particle_count() {
  if (debug) {
    text(frameRate().toFixed(2), 50, 200);
    text(frameCount, 50, 250);
    text(particles.length, 50, 300);
  }

  if (frameCount < perf_update_interval && frameCount % 7 == 0) {
    if (frameRate() > 58) {
      spawn_particles(50);
      if (debug) {
        console.log('add 50, total: ' + particles.length);
      }
    }
  }

  if (fps_counter > 0) {
    average_fps += frameRate() / perf_update_interval;
    fps_counter -= 1;
  } else {
    fps_counter = perf_update_interval;

    if (debug) {
      console.log(average_fps);
    }

    if (average_fps > 58) {
      spawn_particles(2);
      if (debug) {
        console.log('add 2, total: ' + particles.length);
      }
    } else if (average_fps <= 55 && average_fps > 40) {
      kill_particles(5);
      if (debug) {
        console.log('kill 5, total: ' + particles.length);
      }
    } else if (average_fps <= 40) {
      kill_particles(25);
      if (debug) {
        console.log('kill 25, total: ' + particles.length);
      }
    }

    average_fps = 0;
  }
}
