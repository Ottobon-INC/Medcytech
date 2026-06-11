import { useEffect, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export function useThreeScene(
  containerRef: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- RENDERERS ---
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const cssRenderer = new CSS2DRenderer();
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0px';
    cssRenderer.domElement.style.left = '0px';
    cssRenderer.domElement.style.width = '100%';
    cssRenderer.domElement.style.height = '100%';
    cssRenderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);
    container.appendChild(cssRenderer.domElement);

    // --- SCENE & CAMERA ---
    const scene = new THREE.Scene();
    
    // Orthographic Camera to create a perfect isometric view without perspective distortion
    const aspect = container.clientWidth / container.clientHeight;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, 0.1, 100);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);

    const sceneGroup = new THREE.Group();
    // Initial entry animation state
    sceneGroup.scale.set(0.01, 0.01, 0.01);
    sceneGroup.rotation.x = -Math.PI / 2; // rotated 90 degrees backward
    sceneGroup.rotation.y = 0; // Set initial angle to 0 so nodes align perfectly with mockup layout (top-left, top-right, bottom-left, bottom-right)
    scene.add(sceneGroup);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Bright ambient light for white bases
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(-5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f0ff, 0.9);
    fillLight.position.set(5, 4, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x4488ff, 2, 20);
    rimLight.position.set(0, -2, 0);
    scene.add(rimLight);

    // --- HUB TOWER ---
    const hubMatBlue = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      emissive: 0x1e3a8a,
      shininess: 80,
    });
    const hubMatWhite = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 40,
    });

    // Layer 1 (Bottom Blue)
    const hub1 = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.2, 64), hubMatBlue);
    hub1.position.y = 0.1;
    hub1.castShadow = true;
    hub1.receiveShadow = true;
    sceneGroup.add(hub1);

    // Layer 2 (White)
    const hub2 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.15, 64), hubMatWhite);
    hub2.position.y = 0.275;
    hub2.castShadow = true;
    sceneGroup.add(hub2);

    // Layer 3 (Blue)
    const hub3 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.2, 64), hubMatBlue);
    hub3.position.y = 0.45;
    hub3.castShadow = true;
    sceneGroup.add(hub3);

    // Layer 4 (Top White)
    const hub4 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.15, 64), hubMatWhite);
    hub4.position.y = 0.625;
    hub4.castShadow = true;
    sceneGroup.add(hub4);

    // Subtle blue inner ring on top layer
    const hubRingGeo = new THREE.TorusGeometry(1.0, 0.03, 16, 64);
    const hubRingMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
    const hubInnerRing = new THREE.Mesh(hubRingGeo, hubRingMat);
    hubInnerRing.rotation.x = Math.PI / 2;
    hubInnerRing.position.y = 0.72;
    sceneGroup.add(hubInnerRing);

    // Render Hub Text onto a canvas to lay perfectly flat on the 3D surface
    const hubCanvas = document.createElement('canvas');
    hubCanvas.width = 1024;
    hubCanvas.height = 1024;
    const hCtx = hubCanvas.getContext('2d');
    if (hCtx) {
      hCtx.clearRect(0, 0, 1024, 1024);
      hCtx.font = 'bold 160px Inter, sans-serif'; // Maximized size for Core
      hCtx.fillStyle = '#000000'; // Pure black for boldness
      hCtx.textAlign = 'center';
      hCtx.textBaseline = 'middle';
      hCtx.fillText('Core', 512, 300);
      hCtx.fillText('Digital', 512, 512);
      hCtx.fillText('Network', 512, 724);
    }
    const hubTex = new THREE.CanvasTexture(hubCanvas);
    hubTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    hubTex.minFilter = THREE.LinearFilter;
    const hubPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 1.7), // Reduced plane size to prevent hanging off edges
      new THREE.MeshBasicMaterial({ map: hubTex, transparent: true, alphaTest: 0.05 })
    );
    hubPlane.rotation.x = -Math.PI / 2; // Lie flat
    hubPlane.position.y = 0.71; // Just above layer 4
    sceneGroup.add(hubPlane);

    // --- CONNECTING RING ---
    const ringMat = new THREE.MeshPhongMaterial({
      color: 0xbfdbfe, // Light blue matching reference
      shininess: 100,
      transparent: true,
      opacity: 0.88,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.04, 20, 120), ringMat);
    ring.rotation.x = Math.PI / 2; // lay flat
    ring.position.y = 0.15;
    sceneGroup.add(ring);

    // --- CONNECTOR DOTS ---
    const dotMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100,
    });
    const dotGeo = new THREE.SphereGeometry(0.12, 32, 32);

    const dotAngles = [0, 90, 180, 270]; // Between nodes

    dotAngles.forEach(angleDeg => {
      const angleRad = angleDeg * (Math.PI / 180);
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(Math.cos(angleRad) * 3.7, 0.15, Math.sin(angleRad) * 3.7);
      dot.castShadow = true;
      sceneGroup.add(dot);
    });

    // --- NODE STATIONS ---
    const nodesData = [
      { 
        id: 'attract', angle: 225, color: 0x3b82f6, title: 'Attract', sub: 'Smart Marketing<br/>& Visibility',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
      },
      { 
        id: 'convert', angle: 315, color: 0x14b8a6, title: 'Convert', sub: 'Lead Capture &<br/>Patient Conversion',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>'
      },
      { 
        id: 'manage', angle: 135, color: 0x8b5cf6, title: 'Manage', sub: 'Appointments &<br/>Operations',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>'
      },
      { 
        id: 'engage', angle: 45, color: 0xf97316, title: 'Engage', sub: 'Patient Communication<br/>& Retention',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>'
      },
    ];

    const createNodeTextPlane = (title: string, sub: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 2048, 1024);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.font = 'bold 320px Inter, sans-serif'; // Absolute maximum size for title
        ctx.fillStyle = '#000000'; // Pure black
        ctx.fillText(title, 1024, 300);
        
        ctx.font = 'bold 180px Inter, sans-serif'; // Absolute maximum size for subtext!
        ctx.fillStyle = '#000000'; // Pure black for subtext too
        const lines = sub.split('<br/>');
        if (lines.length === 1) {
          ctx.fillText(lines[0], 1024, 660);
        } else {
          ctx.fillText(lines[0], 1024, 600);
          ctx.fillText(lines[1], 1024, 800);
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearFilter;
      
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2.0, 1.0),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.05 })
      );
      plane.rotation.x = -Math.PI / 2; // Lie flat
      return plane;
    };

    const pedestalGeo1 = new THREE.CylinderGeometry(1.15, 1.15, 0.12, 64); // Circular wide base
    const pedestalGeo2 = new THREE.CylinderGeometry(0.9, 0.9, 0.08, 64);   // Circular top step
    const pedestalMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 50 });
    const sphereGeo = new THREE.SphereGeometry(0.52, 32, 32); // Increased sphere size to fit icon
    const glintGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const nodeSpheres: THREE.Mesh[] = [];
    const nodeGroups: THREE.Group[] = [];
    const textPlanes: THREE.Mesh[] = [hubPlane]; // Only hubPlane needs local Z counter-rotation
    const nodeTargetScales: number[] = [1, 1, 1, 1];
    const nodeTargetEmissive: number[] = [0.2, 0.2, 0.2, 0.2];
    const nodeMaterials: THREE.MeshPhongMaterial[] = [];
    const nodeDoms: { label: HTMLDivElement; icon: HTMLDivElement }[] = [];

    nodesData.forEach((data, index) => {
      const angleRad = data.angle * (Math.PI / 180);
      const nodeGroup = new THREE.Group();
      // Place nodeGroup exactly on the ring at radius 3.7
      nodeGroup.position.set(Math.cos(angleRad) * 3.7, 0, Math.sin(angleRad) * 3.7);

      // Create oval base perfectly centered over the ring connection point
      const pedestal1 = new THREE.Mesh(pedestalGeo1, pedestalMat);
      pedestal1.position.set(0, 0.1, 0); 
      pedestal1.castShadow = true;
      pedestal1.receiveShadow = true;
      nodeGroup.add(pedestal1);

      const pedestal2 = new THREE.Mesh(pedestalGeo2, pedestalMat);
      pedestal2.position.set(0, 0.22, 0);
      pedestal2.castShadow = true;
      pedestal2.receiveShadow = true;
      nodeGroup.add(pedestal2);

      const sphereMat = new THREE.MeshPhongMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.2,
        shininess: 250, // Premium glossy look
        specular: 0xffffff
      });
      nodeMaterials.push(sphereMat);

      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      // Sphere sits firmly on the back of the circular white platform
      sphere.position.set(0, 0.6, -0.35);
      sphere.castShadow = true;
      sphere.userData = { index };
      nodeSpheres.push(sphere);
      nodeGroup.add(sphere);

      const glint = new THREE.Mesh(glintGeo, glintMat);
      glint.position.set(-0.25, 0.25, 0.25); 
      sphere.add(glint); 

      // Icon as CSS2DObject placed at the exact center of sphere
      const iconDiv = document.createElement('div');
      iconDiv.innerHTML = data.icon;
      iconDiv.style.pointerEvents = 'none';
      iconDiv.style.display = 'flex';
      iconDiv.style.justifyContent = 'center';
      iconDiv.style.alignItems = 'center';
      const iconLabel = new CSS2DObject(iconDiv);
      iconLabel.position.set(0, 0, 0); 
      sphere.add(iconLabel);

      // Text plane placed perfectly onto the flat white pedestal surface
      const textPlane = createNodeTextPlane(data.title, data.sub);
      textPlane.scale.set(0.9, 0.9, 0.9); // Maximized plane scale to fill the circular base
      textPlane.position.set(0, 0.27, 0.48); // Y=0.27 to sit just above the 0.26 top surface
      nodeGroup.add(textPlane);

      nodeDoms.push({ label: iconDiv, icon: iconDiv }); // CSS fading only applies to icon now

      sceneGroup.add(nodeGroup);
      nodeGroups.push(nodeGroup);
    });

    // --- RESPONSIVE LOGIC ---
    let width = container.clientWidth;
    let height = container.clientHeight;

    const updateSize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      renderer.setSize(width, height);
      cssRenderer.setSize(width, height);

      const aspect = width / height;
      
      // Calculate dynamic frustum to guarantee component is never cut off
      let targetWidth = 11.5; // Enough width for the entire ring and nodes on desktop
      if (window.innerWidth < 1024) targetWidth = 9.5; // Wider bounds on tablet to scale down
      if (window.innerWidth < 600) targetWidth = 8.5;  // Even wider bounds on mobile so it scales down properly and doesn't get cut
      
      const targetHeight = 10;
      
      let frustumSize;
      if (aspect < targetWidth / targetHeight) {
        // Container is narrow (e.g. tablet/mobile or specific flex layout), width is the constraint
        frustumSize = targetWidth / aspect;
      } else {
        // Container is wide, height is the constraint
        frustumSize = targetHeight;
      }
      
      camera.left = -frustumSize * aspect / 2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    // Also listen to window resize to catch viewport changes directly
    window.addEventListener('resize', updateSize);
    updateSize(); // Initial call

    // --- INTERACTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredIndex = -1;

    let isDragging = false;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let lastX = 0;
    let lastY = 0;
    let autoRotate = true;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    const checkIntersection = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeSpheres);

      if (intersects.length > 0) {
        hoveredIndex = intersects[0].object.userData.index;
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'pointer';
        autoRotate = false; // Pause on hover
        if (resumeTimer) clearTimeout(resumeTimer);
      } else {
        hoveredIndex = -1;
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
        resumeTimer = setTimeout(() => {
          autoRotate = true;
        }, 3000);
      }
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (isDragging) {
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        
        dragVelocityX = dx * 0.005;
        dragVelocityY = dy * 0.005;

        sceneGroup.rotation.y += dragVelocityX;
        // X clamping
        sceneGroup.rotation.x += dragVelocityY;
        sceneGroup.rotation.x = Math.max(0, Math.min(0.8, sceneGroup.rotation.x));
      } else {
        checkIntersection(clientX, clientY);
      }
      lastX = clientX;
      lastY = clientY;
    };

    const handlePointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      autoRotate = false;
      dragVelocityX = 0;
      dragVelocityY = 0;
      lastX = clientX;
      lastY = clientY;
      if (resumeTimer) clearTimeout(resumeTimer);
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor = hoveredIndex !== -1 ? 'pointer' : 'grab';
      
      resumeTimer = setTimeout(() => {
        autoRotate = true;
      }, 3000);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handlePointerUp();

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    // --- ANIMATION LOOP ---
    let animId: number;
    let entryProgress = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const time = clock.getElapsedTime();

      // Entry animation
      if (entryProgress < 1.0) {
        entryProgress += 0.014; // roughly 1.2s at 60fps
        if (entryProgress > 1.0) entryProgress = 1.0;
        
        // ease-out cubic curve: 1 - (1 - x)^3
        const easeOut = 1 - Math.pow(1 - entryProgress, 3);
        
        const currentScale = 0.01 + easeOut * 0.99;
        sceneGroup.scale.set(currentScale, currentScale, currentScale);
        
        // Rotate from -90deg (-1.57rad) to 0
        sceneGroup.rotation.x = -Math.PI / 2 * (1 - easeOut);
      }

      // Hub Breathing Pulse
      // Emissive blue-purple color that pulses. Base is 0x221166 (0.13, 0.06, 0.4)
      const pulseSine = (Math.sin(time * Math.PI * 2 / 2.5) + 1) / 2; // 0 to 1 over 2.5s
      const intensity = 0.5 + pulseSine * 1.5;
      hubMatBlue.emissiveIntensity = intensity;

      // Rim Light Pulse
      rimLight.intensity = 2 + Math.sin((time * Math.PI * 2 / 2.5) + 1) * 1.5;

      // Node Idle Float
      nodeGroups.forEach((group, index) => {
        // Amplitude 0.08, cycle 3s, phase offset based on index
        const phase = index * (Math.PI / 2);
        group.position.y = Math.sin(time * Math.PI * 2 / 3 + phase) * 0.08;

        // Hover interpolation
        const isHovered = index === hoveredIndex;
        nodeTargetScales[index] = isHovered ? 1.28 : 1.0;
        nodeTargetEmissive[index] = isHovered ? 0.6 : 0.2;

        const currentScale = nodeSpheres[index].scale.x;
        const newScale = currentScale + (nodeTargetScales[index] - currentScale) * 0.15;
        nodeSpheres[index].scale.set(newScale, newScale, newScale);

        const currentEmissive = nodeMaterials[index].emissiveIntensity;
        nodeMaterials[index].emissiveIntensity = currentEmissive + (nodeTargetEmissive[index] - currentEmissive) * 0.15;

        // Depth-based opacity fading to prevent overlap collisions
        const worldPos = new THREE.Vector3();
        group.getWorldPosition(worldPos);
        const zDepth = worldPos.z; // negative is further away (back of the ring)
        
        let targetOpacity = 1.0;
        if (zDepth < -1.0) {
          // Linear fade: at z = -1.0 opacity is 1.0, at z = -6.0 opacity is 0.25
          targetOpacity = 1.0 + ((zDepth + 1.0) * 0.15);
          targetOpacity = Math.max(0.25, targetOpacity);
        }

        // Force full opacity if hovered
        if (isHovered) {
          targetOpacity = 1.0;
        }

        const doms = nodeDoms[index];
        if (doms) {
          const currentOpacity = parseFloat(doms.label.style.opacity || '1');
          const newOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.15;
          doms.label.style.opacity = newOpacity.toString();
          doms.icon.style.opacity = newOpacity.toString();
        }
      });

      // Auto Rotation
      if (autoRotate) {
        sceneGroup.rotation.y += 0.0015;
      }
      
      // Counter-rotate the central Hub text
      textPlanes.forEach(plane => {
        plane.rotation.z = -sceneGroup.rotation.y;
      });

      // Counter-rotate the ENTIRE node platform so the sphere is always at the back and text is always perfectly in front
      nodeGroups.forEach((group, index) => {
        group.rotation.y = -sceneGroup.rotation.y;
        
        // Node Idle Float
        // Amplitude 0.08, cycle 3s, phase offset based on index
        const phase = index * (Math.PI / 2);
        group.position.y = Math.sin(time * Math.PI * 2 / 3 + phase) * 0.08;
      });

      // Inertia
      if (!isDragging && entryProgress >= 1.0) {
        if (Math.abs(dragVelocityX) > 0.0001 || Math.abs(dragVelocityY) > 0.0001) {
          sceneGroup.rotation.y += dragVelocityX;
          sceneGroup.rotation.x += dragVelocityY;
          sceneGroup.rotation.x = Math.max(0, Math.min(0.8, sceneGroup.rotation.x));
          
          dragVelocityX *= 0.96;
          dragVelocityY *= 0.96;
        }
      }

      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    };
    tick();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);

      if (resumeTimer) clearTimeout(resumeTimer);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (container.contains(cssRenderer.domElement)) {
        container.removeChild(cssRenderer.domElement);
      }

      renderer.dispose();
    };
  }, [containerRef]);
}
