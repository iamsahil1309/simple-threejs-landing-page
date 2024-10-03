import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

//scene
const scene = new THREE.Scene()

//create sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color : "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//lights
const light = new THREE.PointLight(0xffffff, 100, 100)
light.position.set(0,10,10)
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight , 0.1, 100)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector(".three")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false   // disable movement
controls.enableZoom = false // disable zoom in-out
controls.autoRotate = true
controls.autoRotateSpeed = 5

//sizes 
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//loop to rerender
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//gsap
const tl = gsap.timeline({defaults : {duration : 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", {y:"-100%"}, {y:"0%"})
tl.fromTo(".title", {opacity : 0}, {opacity : 1})
