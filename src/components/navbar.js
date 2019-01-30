import React from 'react'
import PropTypes from 'prop-types'

// Based on https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
function scrollTo(targetId, duration = 600, callback) {
  function ease (t) {
    return t * (2 - t);
  }

  var target = document.querySelector(targetId);
  if (target == null) return;

  var distanceToTarget = target.getBoundingClientRect().top;
  var initPos = window.pageYOffset;
  var initTime = null;

  function animate(currentTime) {
    if (initTime == null) initTime = currentTime;

    var elapsed = currentTime - initTime;
    var t = Math.min(1, elapsed/duration)
    var yPercentage = ease(t);

    window.scrollTo(0, Math.ceil(initPos + (yPercentage * distanceToTarget)));
    if (elapsed < duration) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);requestAnimationFrame(animate);
}

const Navbar = () => (
  <div class = 'lateral-bar'>
    <button onClick={() => (scrollTo("#welcome-section")) }> O </button>
    <button onClick={() => (scrollTo("#about-section")) }> O </button>
    <button onClick={() => (scrollTo("#work-section")) }> O </button>
    <button onClick={() => (scrollTo("#skills-section")) }> O </button>
    <button onClick={() => (scrollTo("#contact-section")) }> O </button>
  </div>
)

export default Navbar
