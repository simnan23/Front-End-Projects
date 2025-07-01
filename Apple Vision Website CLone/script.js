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
 tl1.to("#page2>h1", {
  top:`-50%`
 });

function canvas(){
    const canvas = document.querySelector("#page7>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = [
  "images/0000.jpg",
  "images/0001.jpg",
  "images/0002.jpg",
  "images/0003.jpg",
  "images/0004.jpg",
  "images/0005.jpg",
  "images/0006.jpg"
];
  return data.split("\n")[index];
}

const frameCount = 7;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page7>canvas`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page7>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
//   set start end according to preference
  start: `top top`,
  end: `600% top`,
});
}
canvas();