
        window.addEventListener('load', function(){
    const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
let block = document.querySelector('.block')
block.appendChild(renderer.domElement) 
scene.background = new THREE.Color('cornflowerblue')

//const message = document.querySelector('.message')

//adptive sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//contorls
 const controls = new OrbitControls(camera, renderer.domElement)
 controls.enableDamping = false
 controls.enableZoom = false

//mateials
const material = new THREE.MeshLambertMaterial({color: 0x808080 })
const material1 = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const material2 = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const material3 = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const material4 = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const material5 = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const material6 = new THREE.MeshBasicMaterial({color: 0xFFFFFF})

//geometry
const g = new THREE.Mesh( new THREE.SphereGeometry( 1, 128, 128 ), material)
const g1 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 128, 128 ), material1)
const g2 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 128, 128 ), material2)
const g3 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 128, 128 ), material3)
const g4 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 128, 128 ), material4)
const g5 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 128, 128 ), material5)
const g6 = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 128, 128 ), material6)

//pointLightHelper1
    
    const light = new THREE.AmbientLight(0xFFFFFF, 1);
    const light1 = new THREE.PointLight(0xFFFFFF, 0.5);
    light.position.set(1,1,1)
    light1.position.set(20,40,20) 
   
    scene.add(light)
    scene.add(light1)

g.name = 'bigSphera'
g.userData.check = false
g1.userData.check = false
g2.userData.check = false
g3.userData.check = false
g4.userData.check = false
g5.userData.check = false
g6.userData.check = false

//cube.userData.move = false
//cube1.userData.move = false
//add for scene
scene.add(g)
scene.add(g1)
scene.add(g2)
scene.add(g3)
scene.add(g4)
scene.add(g5)
scene.add(g6)

//positons
g1.position.set(0, 0, 0.92)
g2.position.set(0, 0.92, 0)
g3.position.set(0.92, 0, 0)
g4.position.set(-0.92, 0, 0)
g5.position.set(0, -0.92, 0)
g6.position.set(0, 0, -0.92)
camera.position.z = 3

// functions

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function update(obj){

    if(obj.userData.move == true){
        obj.rotation.x  +=0.01
        obj.rotation.y  +=0.01
    }else{
        obj.rotation.x += 0
        obj.rotation.y += 0
    }
}


function resetColor(){
    for(let i = 0; i < scene.children.length; i++){
        if(scene.children[i].material){
            if(scene.children[i].name !== 'bigSphera'){
                if(scene.children[i].userData.check == false){
                   scene.children[i].material.color.set(0xFFFFFF)
                }
                else{
                    scene.children[i].material.color.set(0x000000)
                }
            }
           
        }
    }
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onObject(){
    
    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children );
    
	for ( let i = 0; i < intersects.length; i ++ ) {
        if(intersects[i].object.name !== 'bigSphera'){
            intersects[i].object.material.color.set( 0x06495ed );
            intersects[i].object.material.opacity = 0.1;
            
        }
        
        
    }
}

function onClick(event){

    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children );
    for(let g = 0; g < scene.children.length; g++){
        scene.children[g].userData.check = false
       
    }
    
    for(let i = 0; i < intersects.length; i++){
        
            if(intersects[i].object.name == 'bigSphera'){
                return
            }
           
            if(intersects[i].object.userData.check == true){
               
                intersects[i].object.userData.check = false
                intersects[i].object.material.color.set( 0x000000 )
                
            }
            else{
                intersects[i].object.userData.check = true
                
            }
        
    }
}


function render(){
    
    window.requestAnimationFrame(render)
    renderer.render(scene, camera)
      
    resetColor()
    onObject()
    //stopRotation()
    
}
window.addEventListener( 'click', onClick, false );
window.addEventListener( 'mousemove', onMouseMove, false );

//3d animate loops

render()

})


