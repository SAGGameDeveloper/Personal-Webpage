import { Component } from 'react'

const max_particles = 60;
const time_between_particles = 400; // in ms
const total_particle_movements = 5;

class Particles extends Component {
  constructor(props) {
    super(props);

    this.spawn_interval = -1;

    // Spawn particles only when the tab is active
    window.addEventListener('focus', this.activate_spawn.bind(this));
    window.addEventListener('blur', this.deactivate_spawn.bind(this));
  }

  componentDidMount() {
    this.particles = [];
    this.welcome_section = document.querySelector("#welcome-section");
    this.fake_background = this.welcome_section.querySelector(".fake-background");
    this.welcome_background_color = window.getComputedStyle(this.welcome_section,
                                      null).getPropertyValue('background-color');
    this.particle_spawn_side = true;

    // Set up particle spawning
    this.activate_spawn();
  }

  activate_spawn () {
    if (this.spawn_interval !== -1) {
      clearInterval(this.spawn_interval);
      this.spawn_interval = -1;
    }
    this.spawn_interval = setInterval(this.spawn_particle.bind(this), time_between_particles);
  }

  deactivate_spawn () {
    clearInterval(this.spawn_interval);
    this.spawn_interval = -1;
  }

  // Generates one particle on each horizontal half of the page.
  // Uses particle po
  spawn_particle () {
    var spawned_particle;

    for (var i = 0; i < this.particles.length && !spawned_particle; i++) {
      if (this.particles[i].classList.contains("inactive-particle")) {
        spawned_particle = this.particles[i];
        spawned_particle.classList.remove("inactive-particle");
      }
    }

    if (!spawned_particle) {
      if (!(this.particles.length < max_particles)) return;

      spawned_particle = document.createElement('div');
      spawned_particle.style.backgroundColor = this.welcome_background_color;

      this.particles.push(spawned_particle);
      this.fake_background.appendChild(spawned_particle);
    }

    // Generate a particle on one side, then swap sides for the next
    // call. This allows to have the same particles on each side
    var x = Math.random() * (50) + (this.particle_spawn_side? 0 : 50);
    this.particle_spawn_side = !this.particle_spawn_side;

    var movement_type = Math.floor(Math.random() * total_particle_movements);
    var life_time = 6000 + (movement_type * 500);
    var particle_class = "particle-movement-" + movement_type;

    spawned_particle.className = 'welcome-particle';
    spawned_particle.style.left = x + '%';

    setTimeout(() => {
      spawned_particle.classList.add(particle_class);
    }, 100);

    setTimeout(() => {
      spawned_particle.classList.remove(particle_class);
      spawned_particle.classList.add("inactive-particle");
    }, life_time + 100);

    // Generate another particle on the other side, only if
    // this is the first side
    if (!this.particle_spawn_side) this.spawn_particle();
  }

  render() {
    return null;
  }
}

export default Particles;
