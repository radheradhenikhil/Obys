function scrl() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loderAnimation() {
  var zero = document.querySelector(".line #line1 #line1-p1 h5");
  var cnt = 0;
  setInterval(() => {
    if (zero.innerHTML < 100) {
      zero.innerHTML = cnt++;
    }
  }, 40);

  var tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    opacity: 0,
    stagger: 1,
    // duration:0.5
  });
  tl.to("#now", {
    animationName: "anime",
    // opacity:1,
    // duration:0.1
  });
  tl.to("#loader", {
    opacity: 0,
    display: "none",
    delay: 2.5,
  });

  tl.from("#p1", {
    delay: 0.2,
    y: "100%",
    opacity: 0,
    duration: 1,
    ease: Power4,
  });
  tl.from("#nav", {
    opacity: 0,
    duration: 0.01,
  });
  tl.from("#hero h1", {
    y: 120,
    opacity: 0,
    stagger: 0.3,
    // duration:0.5
  });
}
function flagAnimation() {
  const hero3 = document.getElementById("hero3");
  const flag = document.getElementById("flag");

  hero3.addEventListener("mousemove", (e) => {
    // Get cursor position
    const { clientX: x, clientY: y } = e;

    // Get the size of the flag
    const flagWidth = flag.offsetWidth;
    const flagHeight = flag.offsetHeight;

    // Move the flag so its center aligns with the cursor
    gsap.to(flag, {
      x: x - flagWidth / 2,
      y: y - flagHeight / 2,
      duration: 0.5, // Smooth transition
      ease: "power3.out",
    });
  });

  hero3.addEventListener("mouseenter", () => {
    // Fade in the #flag div when hovering
    gsap.to(flag, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  });

  hero3.addEventListener("mouseleave", () => {
    // Fade out the #flag div when not hovering
    gsap.to(flag, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  });
}
function letUsAnimation() {
  const heading = document.getElementById("heading");
  const originalFont = "Plain-Regular";
  const newFont = '"Plain-Silk';

  // Split text into individual spans
  const text = heading.textContent;
  heading.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    heading.appendChild(span);
  });

  const letters = heading.querySelectorAll("span");

  heading.addEventListener("mouseenter", () => {
    gsap.to(letters, {
      opacity: 0, // Fade out
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        letters.forEach((letter) => (letter.style.fontFamily = newFont));
        gsap.to(letters, {
          opacity: 1, // Fade in with new font
          duration: 0.2,
          stagger: 0.05,
        });
      },
    });
  });

  heading.addEventListener("mouseleave", () => {
    gsap.to(letters, {
      opacity: 0, // Fade out
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        letters.forEach((letter) => (letter.style.fontFamily = originalFont));
        gsap.to(letters, {
          opacity: 1, // Fade in with original font
          duration: 0.3,
          stagger: 0.05,
        });
      },
    });
  });
}
function circleAnimation(circle, infoCircle) {
  circle.addEventListener("mouseenter", () => {
    // gsap.to(icon, {scale:0, opacity: 0, duration: 0.5 });
    gsap.to(infoCircle, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  circle.addEventListener("mouseleave", () => {
    // gsap.to(icon, {scale:1, opacity: 1, duration: 0.5 });
    gsap.to(infoCircle, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "power5.in",
    });
  });
}
function vdoCursorAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.7,
  });
  Shery.makeMagnet("#p1 svg , #p1 h3");

  var videoContainer = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        left: dets.x - 570,
        top: dets.y - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      left: "70%",
      top: "-15%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}
function imgAnimation(){
  Shery.imageEffect(".img-box", {
    style: 6,
    // debug: true,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7241195453907675 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.23, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.5, range: [0, 10] },
      metaball: { value: 0.33, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
  
}

const circle1 = document.querySelector("#circle1");
const infoCircle1 = document.querySelector("#circle1 div");
const circle2 = document.querySelector("#circle2");
const infoCircle2 = document.querySelector("#circle2 div");
const circle3 = document.querySelector("#circle3");
const infoCircle3 = document.querySelector("#circle3 div");

circleAnimation(circle1, infoCircle1);
circleAnimation(circle2, infoCircle2);
circleAnimation(circle3, infoCircle3);

scrl()
letUsAnimation();
flagAnimation();
loderAnimation();
vdoCursorAnimation();
imgAnimation();

