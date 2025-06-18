function loco() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#sub-main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#sub-main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#sub-main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#sub-main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();

gsap.to("#sub-main>video", {
  scrollTrigger: {
    trigger: `#sub-main>video`,
    start: `50% top`, // jab video viewport ke andar aaye
    end: "bottom top",
    scroller: `#sub-main`
  },
  onStart: () => {
    const vid = document.querySelector("#sub-main>video");
    vid.loop = true;
    vid.muted = true;
    vid.play().catch((e) => {
      console.log("Video play nahi hua:", e);
    });
  })

 var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    start: `top center`,
    scrub: 1,
    scroller: "#sub-main",
    markers: true,
    pin: true
  }
 })
 tl.to("#page3", {
  top:`-50%`
 });

 var tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page2",
    start: `top top`,
    scrub: 1,
    scroller: "#sub-main",
    markers: true,
    pin: true
  }
 })
 tl1.to("#page2", {
  top:`-50%`
 });