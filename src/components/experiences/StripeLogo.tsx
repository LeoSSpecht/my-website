import React, { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";

interface StripeLogoProps {
  /** Background color of the scene (default: Stripe purple #635BFF) */
  backgroundColor?: string;
  /** Color of the rhombus logo (default: white #FFFFFF) */
  logoColor?: string;
  /** Size of the container in pixels (default: 46) */
  size?: number;
  /** How much mouse movement affects rotation - lower = less rotation (default: 0.15) */
  rotationSensitivity?: number;
  /** Material metalness for shininess (default: 0.3) */
  metalness?: number;
  /** Material roughness - lower = shinier (default: 0.2) */
  roughness?: number;
  /** Link to redirect when clicked */
  redirectLink?: string;
}

// Ajust the grab rotation axis
// Try to change color to a darker color and then add neon
// Try to add shadow on the background
const StripeLogo: React.FC<StripeLogoProps> = ({
  backgroundColor = "#635BFF",
  logoColor = "#eeeeee",
  size = 46,
  rotationSensitivity = 0.5,
  metalness = 0.1,
  roughness = 1,
  redirectLink = "https://stripe.com",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    rhombus: THREE.Mesh;
    animationId: number;
  } | null>(null);

  // Easter egg state
  const [isRainbowMode, setIsRainbowMode] = useState(false);
  const keySequence = useRef("");
  const rainbowHue = useRef(0);

  // Mouse interaction state
  const isDragging = useRef(false);
  const initialClickPos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const initialRotation = 0;
  // Use Quaternions for robust 3D rotation without gimbal lock
  const targetQuaternion = useRef(
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(initialRotation, initialRotation, 0)
    )
  );
  const currentQuaternion = useRef(
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(initialRotation, initialRotation, 0)
    )
  );

  const rotationAxis = useRef(new THREE.Vector3(0, 1, 0));
  const isIdleRotating = useRef(true); // Track if idle rotation is active
  const idleRotationSpeed = 0.005; // Speed of idle rotation

  // Create parallelogram geometry (Stripe logo shape extruded into 3D)
  const createRhombusGeometry = useCallback(() => {
    // Create a parallelogram shape - skewed rectangle like Stripe logo
    // The 2D shape has vertical left/right edges and slanted top/bottom edges
    const shape = new THREE.Shape();

    // Define the parallelogram vertices (centered at origin)
    // Skew amount determines how much the top/bottom edges slant (vertical offset)
    const width = 1.5;
    const height = 1.3;
    const skew = 0.4; // Vertical offset for the skew

    // Start from bottom-left, go clockwise
    // The left edge goes from bottom-left to top-left (vertical)
    // The right edge goes from bottom-right to top-right (vertical)
    // Top and bottom edges are slanted (higher on the right side)

    // Bottom-left
    shape.moveTo(-width / 2, -height / 2 - skew / 2);
    // Bottom-right (higher than bottom-left)
    shape.lineTo(width / 2, -height / 2 + skew / 2);
    // Top-right
    shape.lineTo(width / 2, height / 2 + skew / 2);
    // Top-left (lower than top-right)
    shape.lineTo(-width / 2, height / 2 - skew / 2);
    // Close the shape
    shape.lineTo(-width / 2, -height / 2 - skew / 2);

    // Extrude the 2D shape into 3D
    const extrudeSettings = {
      depth: 0.5, // Thickness of the extrusion
      bevelEnabled: false,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Center the geometry (extrusion goes in +Z direction, so offset it back)
    geometry.translate(0, 0, -extrudeSettings.depth / 2);

    return geometry;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderSize = size * 2; // Render at 2x for better quality

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Camera setup
    // Reduced FOV and increased distance to flatten perspective and prevent edges from clipping
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.z = 6;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(renderSize, renderSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // Lower exposure darkens shadows more

    // Adjust output color space for better contrast
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Scale canvas to fit container (rendered at 2x for quality)
    renderer.domElement.style.width = `${size}px`;
    renderer.domElement.style.height = `${size}px`;

    container.appendChild(renderer.domElement);

    // Lighting setup - reduced ambient for more edge contrast
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Main light from front - illuminates the front face
    const frontLight = new THREE.DirectionalLight(0xffffff, 2);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    // Side lights create edge shadows by not reaching the sides directly
    const topRightLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topRightLight.position.set(3, 3, 2);
    scene.add(topRightLight);

    const bottomLeftLight = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomLeftLight.position.set(-3, -3, 2);
    scene.add(bottomLeftLight);

    // Right side light - creates shadow on the left when rotating
    const rightLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rightLight.position.set(5, 0, 1);
    scene.add(rightLight);

    // Create rhombus mesh
    const geometry = createRhombusGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(logoColor),
      metalness: metalness,
      roughness: roughness,
      emissive: 0xffffff,
      emissiveIntensity: 0.05, // Lower emissive to allow lighting to create shadows
      envMapIntensity: 1,
    });

    const rhombus = new THREE.Mesh(geometry, material);
    rhombus.position.z = 1; // Slightly forward from background
    scene.add(rhombus);

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      rhombus,
      animationId: 0,
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      // Apply idle rotation on Y axis when not dragging
      if (isIdleRotating.current) {
        const idleRotation = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          idleRotationSpeed
        );
        targetQuaternion.current.premultiply(idleRotation);
      }

      // Rainbow mode: cycle through hues
      if (isRainbowMode) {
        rainbowHue.current = (rainbowHue.current + 0.005) % 1;
        const rainbowColor = new THREE.Color().setHSL(
          rainbowHue.current,
          1,
          0.6
        );
        (rhombus.material as THREE.MeshStandardMaterial).color = rainbowColor;
        (rhombus.material as THREE.MeshStandardMaterial).emissive =
          rainbowColor;
      }

      // Smooth interpolation for rotation (easing)
      currentQuaternion.current.slerp(targetQuaternion.current, 0.08);

      // Apply rotation
      rhombus.quaternion.copy(currentQuaternion.current);

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    backgroundColor,
    logoColor,
    size,
    metalness,
    roughness,
    createRhombusGeometry,
    isRainbowMode,
  ]);

  // Easter egg: Listen for "4242" key sequence
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only track number keys
      if (e.key >= "0" && e.key <= "9") {
        keySequence.current += e.key;

        // Keep only the last 4 characters
        if (keySequence.current.length > 4) {
          keySequence.current = keySequence.current.slice(-4);
        }

        // Check for the magic sequence
        if (keySequence.current === "4242") {
          setIsRainbowMode((prev) => !prev);
          keySequence.current = ""; // Reset sequence
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset color when exiting rainbow mode
  useEffect(() => {
    if (!isRainbowMode && sceneRef.current) {
      const material = sceneRef.current.rhombus
        .material as THREE.MeshStandardMaterial;
      material.color = new THREE.Color(logoColor);
      material.emissive = new THREE.Color(0xffffff);
    }
  }, [isRainbowMode, logoColor]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    isIdleRotating.current = false; // Stop idle rotation when user starts dragging

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate normalized position from center (-1 to 1)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    initialClickPos.current = { x: normalizedX, y: normalizedY };
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    // Calculate rotation axis based on click position
    // The axis is perpendicular to the vector from center to click point
    // If click is on left (x=-1, y=0), axis should be (0, 1, 0) - Y axis
    // If click is on bottom (x=0, y=1), axis should be (1, 0, 0) - X axis
    // For diagonal clicks, it's a combination
    const axisX = normalizedY; // Perpendicular: swap and negate
    const axisY = normalizedX; // Fixed: removed negation to correct horizontal rotation

    // Normalize the axis (handle center clicks)
    const length = Math.sqrt(axisX * axisX + axisY * axisY);
    if (length > 0.1) {
      rotationAxis.current.set(axisX / length, axisY / length, 0);
    } else {
      // Default to Y axis if clicking near center
      rotationAxis.current.set(0, 1, 0);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate rotation axis dynamically based on mouse movement direction
      // The axis is perpendicular to the movement direction
      // Moving right (deltaX > 0) -> rotate around Y axis
      // Moving down (deltaY > 0) -> rotate around X axis
      const axisX = deltaY; // Perpendicular to movement
      const axisY = deltaX;

      // Normalize the axis (skip tiny movements)
      const length = Math.sqrt(axisX * axisX + axisY * axisY);
      if (length < 0.5) return; // Ignore very small movements

      rotationAxis.current.set(axisX / length, axisY / length, 0);

      // Calculate rotation amount based on movement magnitude
      const rotationAmount = length * rotationSensitivity * 0.02;

      // Apply rotation based on the calculated axis
      const rotationDelta = new THREE.Quaternion().setFromAxisAngle(
        rotationAxis.current,
        rotationAmount
      );
      targetQuaternion.current.premultiply(rotationDelta);
    },
    [rotationSensitivity]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    isIdleRotating.current = true; // Resume idle rotation when user releases
  }, []);

  const handleDoubleClick = useCallback(() => {
    setIsRainbowMode((prev) => !prev);
  }, []);

  // Add global mouse event listeners when dragging starts
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        cursor: "grab",
        background: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="stripe-logo-container"
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      aria-label="Stripe Logo - Interactive 3D"
    />
  );
};

export default StripeLogo;
