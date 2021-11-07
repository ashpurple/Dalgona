import { World } from './js/World.js';
import * as THREE from '../node_modules/three/build/three.module.js';


let doll
const TIME_LIMIT = 15
const text = document.querySelector('.text')

let DEAD_PLAYERS = 0
let SAFE_PLAYERS = 0
const startBtn = document.querySelector('.startBtn')

const container = document.querySelector('#scene-container');
const world = new World(container);

async function main() {
  // Get a reference to the container element
  // complete async tasks
  await world.init(startBtn);
  // start the animation loop
  world.start();

  const TIME_LIMIT = 15
  

  startBtn.addEventListener('click', () => {
      if(startBtn.innerText == "START"){
          init()
          document.querySelector('.modal').style.display = "none"
          startDall()
      }
  })

  window.addEventListener( "keydown", function(e){
      if(world.gameStat != "started") return
      world.player.run()
  })
  window.addEventListener( "keyup", function(e){
      world.player.stop()
  })

  window.addEventListener( 'resize', onWindowResize, false )
  function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize( window.innerWidth, window.innerHeight )
  }
}

async function startDall(){
  world.doll.lookBackward()
  await delay((Math.random() * 1500) + 1500)
  world.doll.lookForward()
  await delay((Math.random() * 750) + 750)
  startDall()
}

function createCube(size, posX, rotY = 0, color = 0xfbc851){
  const geometry = new THREE.BoxGeometry( size.w, size.h, size.d )
  const material = new THREE.MeshBasicMaterial( { color } )
  const cube = new THREE.Mesh( geometry, material )
  cube.position.set(posX, 0, 0)
  cube.rotation.y = rotY
  world.scene.add( cube )
  return cube
}

function start(){
  world.gameStat = "started"
  const progressBar = createCube({w: 8, h: .1, d: 1}, 0, 0, 0xebaa12)
  
  progressBar.position.y = 3.35
  gsap.to(progressBar.scale, {duration: TIME_LIMIT, x: 0, ease: "none"})
  setTimeout(() => {
      if(world.gameStat != "ended"){
          text.innerText = "Time Out!!!"
          world.loseMusic.play()
          world.gameStat = "ended"
      }
  }, TIME_LIMIT * 1000)
  // startDall()
}

async function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function init(){
  await delay(50)
  text.innerText = "Starting in 3"
  await delay(50)
  text.innerText = "Starting in 2"
  await delay(50)
  text.innerText = "Starting in 1"
  // lookBackward()
  await delay(50)
  text.innerText = "Gooo!!!"
  // bgMusic.play()                       // 브금 시끄러워서 끔
  start()
}

main().catch((err) => {
  console.error(err);
});
