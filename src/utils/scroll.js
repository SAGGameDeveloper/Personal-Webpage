
class Scroll {
      // Based on https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
      // Scrolls to the element with the given ID, delays 'duration'
      static scrollTo(targetId, duration = 600) {
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

        requestAnimationFrame(animate);
      }
}

export default Scroll;
