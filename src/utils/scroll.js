const PIXEL_SPEED = 0.3;

class Scroll {
      // Based on https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
      // Scrolls to the element with the given ID, delays 'duration'.
      // If no duration is provided, the dealy will depend on pixel distance
      // using the constant PIXEL_SPEED to transform pixels to ms
      static scrollTo(targetId, duration = 600) {
        function ease (t) {
          return t * (2 - t);
        }


        var target = document.querySelector(targetId);
        if (target == null) return;

        var distanceToTarget = target.getBoundingClientRect().top;
        duration=Math.abs(PIXEL_SPEED*distanceToTarget);

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
