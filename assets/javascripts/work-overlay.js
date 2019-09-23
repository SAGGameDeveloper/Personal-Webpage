let htmlElement = document.querySelector("html");
let work_elements = document.getElementsByClassName("work-element");

let work_overlay = document.querySelector(".work-overlay");
let work_overlay_wrapper = document.querySelector(".work-overlay-wrapper");
let work_overlay_title = work_overlay.querySelector(".work-overlay-title");
let work_overlay_description = work_overlay.querySelector(".work-overlay-description");
let work_overlay_image = work_overlay.querySelector(".work-overlay-image img");
let work_overlay_links = work_overlay.querySelector(".work-overlay-links");
let overlay_cross = work_overlay.querySelector(".work-overlay-cross");
let overlay_active = false;

for (let i = 0; i<work_elements.length; i++) {
	work_elements[i].onclick = function() {
		updateOverlayContent(work_elements[i]);
		setOverlayActive(true);
	};
}

//Disable the overlay on 'Escape' press
window.addEventListener('keydown', function(event) {
  if (overlay_active && event.key === "Escape") setOverlayActive(false);
});

// Set the onclik event for the overlay exit cross
overlay_cross.onclick = function() {setOverlayActive(false)};

work_overlay.addEventListener('click', (e) => {
  if (e.target === work_overlay
		|| e.target === work_overlay_wrapper)
	setOverlayActive(false)
});

function setOverlayActive(active) {
	if (active && !overlay_active) {		
		htmlElement.style.overflow = "hidden";
		work_overlay.classList.add("work-overlay-active");
		overlay_active = true;
	}
	else if (!active && overlay_active) {
		htmlElement.style.overflow = "visible";
		work_overlay.classList.remove("work-overlay-active");
		overlay_active = false;
	}
}

function updateOverlayContent(element) {
	// Sets the contents of the overlay to the ones of the selected element
	work_overlay_title.innerHTML = element.querySelector(".postArticle-title").innerHTML;
	work_overlay_description.innerHTML = element.querySelector(".work-element-content").innerHTML;
	work_overlay_image.src = element.querySelector(".postArticle-image").style.backgroundImage.slice(5, -2);
	
	updateOverlayLinks(element);
}

function updateOverlayLinks(element) {
	let links_element = element.querySelector(".work-element-links");
    let source_string = links_element.getAttribute('source');
    let demo_string = links_element.getAttribute('demo');
	let github_string = links_element.getAttribute('github');
    let source_link = work_overlay_links.children[0];
    let demo_link = work_overlay_links.children[1];
	let github_link = work_overlay_links.children[2];

    if (source_string && source_string !== '') {
      source_link.href = source_string;
      source_link.style.display = 'block';
    }
    else source_link.style.display = 'none';

    if (demo_string && demo_string !== '') {
      demo_link.href = demo_string;
      demo_link.style.display = 'block';
    }
    else demo_link.style.display = 'none';
	
	if (github_string && github_string !== '') {
	  github_link.href = github_string;
      github_link.style.display = 'block';
    }
    else github_link.style.display = 'none';
}