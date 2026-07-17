/* eslint-disable react/no-unknown-property */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from './card.glb';
import lanyard from './lanyard2.png';

import * as THREE from 'three';
import '../../style.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper" style={{ width: '100%', height: '100vh', position: 'relative', zIndex: 10 }}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  // --- LOAD GLB ---
  // useGLTF can suspend/throw for legitimate reasons (still loading), so we do NOT
  // wrap this in try/catch - let Suspense/ErrorBoundary upstream handle it instead.
  const { nodes, materials } = useGLTF(cardGLB);

  // --- Dapatkan node dan material yang benar (dynamic, GLB tidak selalu punya nama "card") ---
  const nodeKeys = Object.keys(nodes || {});
  const materialKeys = Object.keys(materials || {});

  const mainNodeKey = nodeKeys[0];
  const mainMaterialKey = materialKeys[0];

  const mainNode = nodes[mainNodeKey];
  const mainMaterial = materials[mainMaterialKey];

  // --- DEBUG: Log struktur (sekali saja) ---
  const hasLogged = useRef(false);
  useEffect(() => {
    if (!hasLogged.current) {
      console.log('[Lanyard] Node key:', mainNodeKey);
      console.log('[Lanyard] Material key:', mainMaterialKey);
      console.log('[Lanyard] Nodes available:', nodeKeys);
      console.log('[Lanyard] Materials available:', materialKeys);
      hasLogged.current = true;
    }
  }, [mainNodeKey, mainMaterialKey, nodeKeys, materialKeys]);

  // --- LOAD TEXTURES ---
  // IMPORTANT: hooks must never be called conditionally (Rules of Hooks). The old
  // code did `if (frontImage) { frontTex = useTexture(...) }` inside a try/catch,
  // which changes the number of hooks called between renders whenever frontImage /
  // backImage / lanyardImage toggle between null and a real value. That triggers
  // React's "Rendered more hooks than during the previous render" error, and
  // try/catch does not protect against it since it isn't a normal thrown exception
  // in the render path - the hook call itself is what's invalid.
  //
  // Fix: always call useTexture, unconditionally, falling back to a 1x1 blank
  // pixel data URI when no image was provided. We then use the *prop* (frontImage /
  // backImage), not the loaded texture, to decide whether to draw it onto the
  // composite canvas.
  const lanyardTexture = useTexture(lanyardImage || lanyard);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // --- Composite texture untuk card ---
  const cardMap = useMemo(() => {
    // Jika tidak ada material, buat fallback
    if (!mainMaterial) {
      console.warn('[Lanyard] No material found, using fallback');
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#888888';
        ctx.fillRect(0, 0, 512, 512);
        const fallbackTex = new THREE.CanvasTexture(canvas);
        fallbackTex.colorSpace = THREE.SRGBColorSpace;
        return fallbackTex;
      }
      return null;
    }

    // Coba ambil texture dari material
    let baseMap = mainMaterial.map;

    // Jika tidak ada map, buat fallback
    if (!baseMap) {
      console.warn('[Lanyard] No texture map in material, using fallback');
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (mainMaterial.color) {
          const color = mainMaterial.color;
          ctx.fillStyle = `rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)})`;
        } else {
          ctx.fillStyle = '#888888';
        }
        ctx.fillRect(0, 0, 512, 512);
        const fallbackTex = new THREE.CanvasTexture(canvas);
        fallbackTex.colorSpace = THREE.SRGBColorSpace;
        return fallbackTex;
      }
      return null;
    }

    // Jika ada texture dan tidak perlu composite, return as-is
    if (!frontImage && !backImage) return baseMap;

    // Composite dengan front/back image
    try {
      const baseImg = baseMap.image;
      if (!baseImg) return baseMap;

      const W = baseImg.width || 1024;
      const H = baseImg.height || 1024;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return baseMap;

      ctx.drawImage(baseImg, 0, 0, W, H);

      const drawFitted = (img, rect) => {
        if (!img) return;
        const rx = rect.x * W;
        const ry = rect.y * H;
        const rw = rect.w * W;
        const rh = rect.h * H;
        const pick = imageFit === 'contain' ? Math.min : Math.max;
        const scale = pick(rw / img.width, rh / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = rx + (rw - dw) / 2;
        const dy = ry + (rh - dh) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(rx, ry, rw, rh);
        ctx.clip();
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.restore();
      };

      // Note: we check the *prop* (frontImage/backImage) to decide whether to draw,
      // since frontTex/backTex are always defined now (falls back to BLANK_PIXEL).
      if (frontImage && frontTex?.image) drawFitted(frontTex.image, FRONT_UV_RECT);
      if (backImage && backTex?.image) drawFitted(backTex.image, BACK_UV_RECT);

      const composite = new THREE.CanvasTexture(canvas);
      composite.colorSpace = THREE.SRGBColorSpace;
      composite.flipY = baseMap.flipY || false;
      composite.anisotropy = 16;
      composite.needsUpdate = true;
      return composite;
    } catch (error) {
      console.error('[Lanyard] Error compositing texture:', error);
      return baseMap;
    }
  }, [frontImage, backImage, imageFit, frontTex, backTex, mainMaterial]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  // --- VALIDASI TEXTURE untuk lanyard ---
  const textureIsValid =
    lanyardTexture && lanyardTexture.image && lanyardTexture.image.width > 0 && lanyardTexture.image.height > 0;

  if (textureIsValid) {
    try {
      lanyardTexture.wrapS = lanyardTexture.wrapT = THREE.RepeatWrapping;
    } catch (error) {
      console.warn('[Lanyard] Error setting texture wrap:', error);
    }
  }

  // --- VALIDASI GEOMETRY ---
  const hasValidGeometry =
    mainNode && mainNode.geometry && mainNode.geometry.attributes && mainNode.geometry.attributes.position;

  // --- RENDER dengan guard lengkap ---
  const renderCard = hasValidGeometry && cardMap;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {renderCard ? (
              <mesh geometry={mainNode.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            ) : (
              // Fallback: box sederhana
              <mesh>
                <boxGeometry args={[1.6, 2.25, 0.02]} />
                <meshPhysicalMaterial color="#666666" roughness={0.5} metalness={0.3} />
              </mesh>
            )}
          </group>
        </RigidBody>
      </group>

      {/* Lanyard band - selalu render */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={textureIsValid ? 'white' : '#ff6b6b'}
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={textureIsValid}
          map={textureIsValid ? lanyardTexture : undefined}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}