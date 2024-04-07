import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'

import islandScene from '../assets/3d/islands.glb';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
    const islandRef = useRef();

    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(islandScene);

    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    const handlePointerDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true);

        const clientX = e.touches
            ? e.touches[0].clientX
            : e.clientX;

        lastX.current = clientX;
    }

    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false);
    }

    const handlePointerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isRotating) {
            const clientX = e.touches
                ? e.touches[0].clientX
                : e.clientX;

            const delta = (clientX - lastX.current) / viewport.width;

            islandRef.current.rotation.y += delta * 0.01 * Math.PI;
            lastX.current = clientX;
            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            if (!isRotating) {
                setIsRotating(true);
            }
            islandRef.current.rotation.y += 0.01 * Math.PI;
        }
        if (e.key === 'ArrowRight') {
            if (!isRotating) {
                setIsRotating(true);
            }
            islandRef.current.rotation.y -= 0.01 * Math.PI;
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            setIsRotating(false);
        }
    }

    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dampingFactor;

            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }

            islandRef.current.rotation.y += rotationSpeed.current;

        } else {
            const rotation = islandRef.current.rotation.y;

            const normalizedRotation =
                ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            // Set the current stage based on the island's orientation
            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(6);
                    break;
                case normalizedRotation >= 0.4 && normalizedRotation <= 1.0:
                    setCurrentStage(5);
                    break;
                case normalizedRotation >= 1.4 && normalizedRotation <= 2.0:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 2.6 && normalizedRotation <= 3.4:
                    setCurrentStage(3);
                    break; 
                case normalizedRotation >= 3.6 && normalizedRotation <= 4.2:
                    setCurrentStage(2);
                    break; 
                case normalizedRotation >= 4.35 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break; 
                default:
                    setCurrentStage(null);
            }
        }
    })

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }

    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove])

    return (
        <a.group ref={islandRef} {...props}>
            <group position={[0, 0.008, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface476_rocks_0.geometry}
                    material={materials.rocks}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface477_rocks_0.geometry}
                    material={materials.rocks}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface478_rocks_0.geometry}
                    material={materials.rocks}
                />
            </group>
            <group position={[0, -0.203, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCube194_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[-24.832, 1.903, -23.087]}
                    rotation={[-1.315, -1.506, -1.358]}
                />
            </group>
            <group position={[-31.147, 0, 38.348]} rotation={[-Math.PI, 0.075, -Math.PI]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCube252_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[-18.224, 2.172, 66.324]}
                    rotation={[0, -0.91, 0]}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface725_totem_0.geometry}
                material={materials.totem}
                position={[7.924, 2.878, -1.278]}
                scale={[0.7, 4.996, 4.21]}
            />
            <group position={[18.481, 2.409, 16.328]} scale={[0.189, 0.375, 0.189]}>
                <group position={[0, -0.946, 0]} scale={[1, 0.427, 1]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1209_ground_0.geometry}
                        material={materials.ground}
                        position={[2.032, 1.405, -85.474]}
                        scale={2.018}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1208_floor2_0.geometry}
                    material={materials.floor2}
                    position={[2.032, 1.563, -85.474]}
                    scale={2.018}
                />
            </group>
            <group position={[0.47, 0, 1.217]} rotation={[0, -1.198, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder139_fox_readyfox_black_0.geometry}
                    material={materials.fox_readyfox_black}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder139_fox_readyfox_body_0.geometry}
                    material={materials.fox_readyfox_body}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder139_fox_readyfox_white_0.geometry}
                    material={materials.fox_readyfox_white}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface943_totem_0.geometry}
                material={materials.totem}
                position={[-0.994, 10.792, -36.53]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[2.022, 3.279, 2.411]}
            />
            <group position={[2.911, -2.684, -12.591]} rotation={[-0.178, 0.816, 0.173]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder183_fox_readyfox_black_0.geometry}
                    material={materials.fox_readyfox_black}
                    position={[-12.063, -8.993, 29.377]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder183_fox_readyfox_body_0.geometry}
                    material={materials.fox_readyfox_body}
                    position={[-12.063, -8.993, 29.377]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder183_fox_readyfox_white_0.geometry}
                    material={materials.fox_readyfox_white}
                    position={[-12.063, -8.993, 29.377]}
                    scale={0.894}
                />
            </group>
            <group position={[26.186, -9.808, 36.241]} rotation={[-0.972, -1.045, -0.484]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder185_fox_readyfox_black_0.geometry}
                    material={materials.fox_readyfox_black}
                    position={[-8.187, 3.989, 3.357]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder185_fox_readyfox_body_0.geometry}
                    material={materials.fox_readyfox_body}
                    position={[-8.187, 3.989, 3.357]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder185_fox_readyfox_white_0.geometry}
                    material={materials.fox_readyfox_white}
                    position={[-8.187, 3.989, 3.357]}
                    scale={0.894}
                />
            </group>
            <group position={[1.764, -10.134, -4.324]} rotation={[2.991, 0.292, 3.101]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder186_fox_readyfox_black_0.geometry}
                    material={materials.fox_readyfox_black}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder186_fox_readyfox_body_0.geometry}
                    material={materials.fox_readyfox_body}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder186_fox_readyfox_white_0.geometry}
                    material={materials.fox_readyfox_white}
                />
            </group>
            <group position={[-1.541, 2.162, 1.136]} scale={[1.501, 1.181, 1.501]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface12_home_body_0.geometry}
                    material={materials.home_body}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1336_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1467_wood_0.geometry}
                    material={materials.wood}
                />
            </group>
            <group
                position={[-0.686, 13.571, 2.281]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[2.34, 3.321, 4.929]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface16_roof1_0.geometry}
                    material={materials.roof1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface16_roof3_0.geometry}
                    material={materials.roof3}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface16_windows_background_0.geometry}
                    material={materials.windows_background}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface17_windows_frame_0.geometry}
                    material={materials.windows_frame}
                />
            </group>
            <group position={[-0.686, 10.944, 4.73]} scale={[1.951, 2.312, 1.951]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface13_windows_frame_0.geometry}
                    material={materials.windows_frame}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface14_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface727_wood2_0.geometry}
                    material={materials.wood2}
                />
            </group>
            <group position={[-0.251, 0, -0.857]} rotation={[0, 0.041, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1337_wood2_0.geometry}
                    material={materials.wood2}
                    position={[24.183, 3.699, 7.106]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1338_wood2_0.geometry}
                    material={materials.wood2}
                    position={[24.183, 3.699, 7.106]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1339_windows_background_0.geometry}
                    material={materials.windows_background}
                    position={[24.183, 3.699, 7.106]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1339_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[24.183, 3.699, 7.106]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
            </group>
            <group position={[0, 0.158, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1246_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1248_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1249_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1250_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1251_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1344_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1345_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1349_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1350_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1351_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1352_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1353_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1354_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1355_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1356_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1357_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1358_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1359_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1360_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1361_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1362_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1363_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1364_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1365_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1366_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1367_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1368_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1369_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1370_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1371_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1372_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1373_wood_0.geometry}
                    material={materials.wood}
                />
            </group>
            <group
                position={[-18.641, 1.897, 34.097]}
                rotation={[Math.PI, -1.292, Math.PI]}
                scale={0.698}>
                <group position={[0, -0.432, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1428_rocks1_0.geometry}
                        material={materials.rocks1}
                        position={[9.189, 1.19, -16.092]}
                        rotation={[0, 0.062, 0]}
                    />
                </group>
                <group position={[0, -0.432, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1429_rocks1_0.geometry}
                        material={materials.rocks1}
                        position={[9.189, 1.19, -16.092]}
                        rotation={[0, 0.062, 0]}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1422_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1423_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1424_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1425_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1426_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1427_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1430_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1431_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1432_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1433_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1434_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1435_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1437_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1438_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1439_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1440_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1441_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1442_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1443_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1444_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1445_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1446_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1447_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1448_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1449_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1450_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1451_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1452_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1453_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1454_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1455_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1456_lambert2_0.geometry}
                    material={materials.lambert2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1457_lambert2_0.geometry}
                    material={materials.lambert2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1458_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1459_tree2_0.geometry}
                    material={materials.tree2}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1460_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1461_tree1_0.geometry}
                    material={materials.tree1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1462_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1463_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1464_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1465_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1466_rocks1_0.geometry}
                    material={materials.rocks1}
                    position={[9.189, 1.19, -16.092]}
                    rotation={[0, 0.062, 0]}
                />
            </group>
            <group position={[-10.297, 0, 5.622]} rotation={[0, -0.411, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1525_rocks2_0.geometry}
                    material={materials.rocks2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1526_rocks2_0.geometry}
                    material={materials.rocks2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1531_wood2_0.geometry}
                    material={materials.wood2}
                    position={[0.682, 1.972, 16.75]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1532_shovel2_0.geometry}
                    material={materials.shovel2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1533_shovel2_0.geometry}
                    material={materials.shovel2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1534_wood_0.geometry}
                    material={materials.wood}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1535_bricks_2_0.geometry}
                    material={materials.bricks_2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1536_shovel2_0.geometry}
                    material={materials.shovel2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1537_shovel2_0.geometry}
                    material={materials.shovel2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1538_wood_0.geometry}
                    material={materials.wood}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1539_wood_0.geometry}
                    material={materials.wood}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1540_wood2_0.geometry}
                    material={materials.wood2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1541_rocks2_0.geometry}
                    material={materials.rocks2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1541_water_0.geometry}
                    material={materials.water}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1542_wood2_0.geometry}
                    material={materials.wood2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1543_wood2_0.geometry}
                    material={materials.wood2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1544_wood2_0.geometry}
                    material={materials.wood2}
                    position={[0.28, 3.194, 16.815]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1545_wood_0.geometry}
                    material={materials.wood}
                    position={[0.28, 3.194, 16.815]}
                />
            </group>
            <group position={[0.057, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1547_water_0.geometry}
                    material={materials.water}
                    position={[-6.463, 3.194, 15.526]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1547_wood2_0.geometry}
                    material={materials.wood2}
                    position={[-6.463, 3.194, 15.526]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1547_wood_0.geometry}
                    material={materials.wood}
                    position={[-6.463, 3.194, 15.526]}
                />
            </group>
            <group position={[-7.559, 0, -3.344]} rotation={[0, 0.401, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface826_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface827_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface828_windows_background_0.geometry}
                    material={materials.windows_background}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface828_wood2_0.geometry}
                    material={materials.wood2}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface829_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface830_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface831_roof1_0.geometry}
                    material={materials.roof1}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface831_roof3_0.geometry}
                    material={materials.roof3}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface832_totem2_0.geometry}
                    material={materials.totem2}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface837_wood2_0.geometry}
                    material={materials.wood2}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface838_roof1_0.geometry}
                    material={materials.roof1}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface838_roof3_0.geometry}
                    material={materials.roof3}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface840_home_body_0.geometry}
                    material={materials.home_body}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface841_roof1_0.geometry}
                    material={materials.roof1}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface846_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[54.961, 2.172, -9.331]}
                    rotation={[0, -0.91, 0]}
                />
            </group>
            <group position={[-0.058, 0, -0.114]} rotation={[0, -0.016, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface304_windows_background_0.geometry}
                    material={materials.windows_background}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface304_windows_frame_0.geometry}
                    material={materials.windows_frame}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface304_wood2_0.geometry}
                    material={materials.wood2}
                />
            </group>
            <group position={[-1.536, -0.309, 0.248]} scale={1.191}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1133_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface488_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface491_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface492_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface493_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface494_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface495_wood2_0.geometry}
                    material={materials.wood2}
                />
            </group>
            <group position={[1.082, 0.032, -0.12]} rotation={[-0.001, 0.044, -0.001]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1377_windows_background_0.geometry}
                    material={materials.windows_background}
                    position={[-7.183, 0.167, -8.504]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1377_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[-7.183, 0.167, -8.504]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1378_wood2_0.geometry}
                    material={materials.wood2}
                    position={[-7.183, 0.167, -8.504]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1379_wood2_0.geometry}
                    material={materials.wood2}
                    position={[-7.183, 0.167, -8.504]}
                />
            </group>
            <group position={[-0.126, 0, 0.139]} rotation={[0, -0.13, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface374_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface394_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface395_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface396_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface397_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface398_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface399_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface400_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface401_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface402_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface403_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface404_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface405_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface406_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface407_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface408_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface409_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface410_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface411_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface412_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface413_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface414_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface415_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface416_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface417_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface418_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface419_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface420_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface421_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface422_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface423_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface424_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface425_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface426_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface427_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface428_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface429_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface497_wood2_0.geometry}
                    material={materials.wood2}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface135_totem_0.geometry}
                material={materials.totem}
                position={[1.758, -0.083, 0.703]}
                scale={1.094}
            />
            <group position={[0.034, 5.255, 1.433]} rotation={[0, 0.682, 0]} scale={1.101}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1380_totem_0.geometry}
                    material={materials.totem}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1380_windows_background_0.geometry}
                    material={materials.windows_background}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1380_windows_frame_0.geometry}
                    material={materials.windows_frame}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1381_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1382_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1383_totem_0.geometry}
                    material={materials.totem}
                />
            </group>
            <group position={[-2.249, 9.262, -3.695]} rotation={[0, -1.571, 0]} scale={1.118}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1325_totem_0.geometry}
                    material={materials.totem}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1326_wood_0.geometry}
                    material={materials.wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1327_totem_0.geometry}
                    material={materials.totem}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1328_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1330_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1331_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1332_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1333_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1334_wood2_0.geometry}
                    material={materials.wood2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1335_wood2_0.geometry}
                    material={materials.wood2}
                />
            </group>
            <group position={[2.733, 0.266, -28.39]} rotation={[2.699, 1.538, -2.658]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface483_totem2_0.geometry}
                    material={materials.totem2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface496_totem2_0.geometry}
                    material={materials.totem2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface823_totem2_0.geometry}
                    material={materials.totem2}
                    position={[10.472, 2.64, 63.063]}
                    rotation={[-0.044, -0.909, -0.007]}
                />
            </group>
            <group position={[0.003, -1.391, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1040_tree1_0.geometry}
                    material={materials.tree1}
                    position={[-7.925, 3.277, 10.454]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1041_tree1_0.geometry}
                    material={materials.tree1}
                    position={[-7.925, 3.277, 10.454]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1042_tree1_0.geometry}
                    material={materials.tree1}
                    position={[-7.925, 3.277, 10.454]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1043_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[-7.925, 3.277, 10.454]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1044_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[-7.925, 3.277, 10.454]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1045_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[-7.925, 3.277, 10.454]}
                />
            </group>
            <group position={[-36.66, -1.274, 6.794]} rotation={[Math.PI, -0.855, Math.PI]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1023_tree1_0.geometry}
                    material={materials.tree1}
                    position={[13.089, 3.277, -0.883]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1024_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[13.089, 3.277, -0.883]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1025_tree1_0.geometry}
                    material={materials.tree1}
                    position={[13.089, 3.277, -0.883]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1026_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[13.089, 3.277, -0.883]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1027_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[13.089, 3.277, -0.883]}
                />
            </group>
            <group position={[4.064, 0.213, -2.195]} scale={1.184}>
                <group position={[0, 0.003, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1096_wood2_0.geometry}
                        material={materials.wood2}
                        position={[18.864, 3.105, 3.423]}
                        rotation={[0, 0.696, 0]}
                        scale={0.894}
                    />
                </group>
                <group position={[0, 0.003, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1097_wood2_0.geometry}
                        material={materials.wood2}
                        position={[18.864, 3.105, 3.423]}
                        rotation={[0, 0.696, 0]}
                        scale={0.894}
                    />
                </group>
                <group position={[0, 0.003, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1099_wood2_0.geometry}
                        material={materials.wood2}
                        position={[18.864, 3.105, 3.423]}
                        rotation={[0, 0.696, 0]}
                        scale={0.894}
                    />
                </group>
                <group position={[0, 0.003, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1100_wood2_0.geometry}
                        material={materials.wood2}
                        position={[18.864, 3.105, 3.423]}
                        rotation={[0, 0.696, 0]}
                        scale={0.894}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1093_roof3_0.geometry}
                    material={materials.roof3}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1095_wood2_0.geometry}
                    material={materials.wood2}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1098_wood2_0.geometry}
                    material={materials.wood2}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1101_totem_0.geometry}
                    material={materials.totem}
                    position={[5.71, 0.702, 6.695]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1102_totem_0.geometry}
                    material={materials.totem}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1104_wood2_0.geometry}
                    material={materials.wood2}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1106_wood_0.geometry}
                    material={materials.wood}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1107_totem_0.geometry}
                    material={materials.totem}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1108_totem_0.geometry}
                    material={materials.totem}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1119_totem_0.geometry}
                    material={materials.totem}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1120_totem_0.geometry}
                    material={materials.totem}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1121_roof1_0.geometry}
                    material={materials.roof1}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1121_roof3_0.geometry}
                    material={materials.roof3}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1122_home_body_0.geometry}
                    material={materials.home_body}
                    position={[18.864, 3.105, 3.423]}
                    rotation={[0, 0.696, 0]}
                    scale={0.894}
                />
            </group>
            <group position={[-26.702, 0.298, 8.315]} rotation={[-Math.PI, 1.541, -Math.PI]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1374_windows_background_0.geometry}
                    material={materials.windows_background}
                    position={[52.391, 2.172, 48.102]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1374_windows_frame_0.geometry}
                    material={materials.windows_frame}
                    position={[52.391, 2.172, 48.102]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1375_wood2_0.geometry}
                    material={materials.wood2}
                    position={[52.391, 2.172, 48.102]}
                    rotation={[0, -0.91, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1376_wood2_0.geometry}
                    material={materials.wood2}
                    position={[52.391, 2.172, 48.102]}
                    rotation={[0, -0.91, 0]}
                />
            </group>
            <group position={[2.454, 1.323, -4.883]}>
                <group position={[6.306, -0.061, 11.415]} rotation={[0, -0.4, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1168_fox_readyfox_black_0.geometry}
                        material={materials.fox_readyfox_black}
                        position={[9.682, 0.831, 4.178]}
                        rotation={[0, 0.062, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1168_fox_readyfox_body_0.geometry}
                        material={materials.fox_readyfox_body}
                        position={[9.682, 0.831, 4.178]}
                        rotation={[0, 0.062, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1168_fox_readyfox_white_0.geometry}
                        material={materials.fox_readyfox_white}
                        position={[9.682, 0.831, 4.178]}
                        rotation={[0, 0.062, 0]}
                    />
                </group>
                <group position={[0, 0.058, 0]} scale={[1, 0.697, 1]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1189_ground_0.geometry}
                        material={materials.ground}
                        position={[23.611, 1.224, -6.828]}
                        rotation={[0, 0.062, 0]}
                        scale={1.761}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1189_ground_0001.geometry}
                        material={materials.ground}
                        position={[72.54, 0.676, -59.72]}
                        scale={2.159}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.polySurface1189_ground_0002.geometry}
                        material={materials.ground}
                        position={[12.414, 1.313, -32.594]}
                        rotation={[0, 0.062, 0]}
                        scale={1.761}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1169_fox_readyfox_black_0.geometry}
                    material={materials.fox_readyfox_black}
                    position={[6.597, 0.831, 8.031]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1169_fox_readyfox_body_0.geometry}
                    material={materials.fox_readyfox_body}
                    position={[6.597, 0.831, 8.031]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1169_fox_readyfox_white_0.geometry}
                    material={materials.fox_readyfox_white}
                    position={[6.597, 0.831, 8.031]}
                    rotation={[0, 0.062, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1188_floor2_0.geometry}
                    material={materials.floor2}
                    position={[23.611, 0.809, -6.828]}
                    rotation={[0, 0.062, 0]}
                    scale={1.761}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1188_floor2_0001.geometry}
                    material={materials.floor2}
                    position={[72.54, 0.404, -59.72]}
                    scale={2.159}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1188_floor2_0002.geometry}
                    material={materials.floor2}
                    position={[12.414, 0.871, -32.594]}
                    rotation={[0, 0.062, 0]}
                    scale={1.761}
                />
            </group>
            <group position={[1.165, 4.686, -2.15]} rotation={[0, 0, -0.262]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1211_wood2_0.geometry}
                    material={materials.wood2}
                    position={[4.664, 1.559, 0.364]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1212_shovel2_0.geometry}
                    material={materials.shovel2}
                    position={[4.664, 1.559, 0.364]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1213_shovel2_0.geometry}
                    material={materials.shovel2}
                    position={[4.664, 1.559, 0.364]}
                    scale={0.894}
                />
            </group>
            <group position={[-0.788, -0.331, -1.426]} scale={0.922}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface924_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface925_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface926_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface927_tree1_0.geometry}
                    material={materials.tree1}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface928_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface929_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface930_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface931_tree1_0.geometry}
                    material={materials.tree1}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface932_tree1_0.geometry}
                    material={materials.tree1}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface933_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface934_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface935_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface936_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface937_tree1_0.geometry}
                    material={materials.tree1}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface938_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface939_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface940_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface941_tree_body_0.geometry}
                    material={materials.tree_body}
                    position={[5.179, 2.876, 5.703]}
                    scale={0.894}
                />
            </group>
            <group position={[-3.233, -1.499, -7.967]} scale={1.232}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1154_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.36, 0.773, 0.795]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1155_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.36, 0.773, 0.795]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1156_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.36, 0.773, 0.795]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1157_roof1_0.geometry}
                    material={materials.roof1}
                    position={[4.36, 0.773, 0.795]}
                    scale={0.894}
                />
            </group>
            <group position={[-14.066, -3.048, -16.75]} scale={1.741}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1142_tree1_0.geometry}
                    material={materials.tree1}
                    position={[3.746, 0.641, 1.096]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1143_tree1_0.geometry}
                    material={materials.tree1}
                    position={[3.746, 0.641, 1.096]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1144_tree1_0.geometry}
                    material={materials.tree1}
                    position={[3.746, 0.641, 1.096]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1145_roof1_0.geometry}
                    material={materials.roof1}
                    position={[3.746, 0.641, 1.096]}
                    scale={0.894}
                />
            </group>
            <group position={[-7.594, -1.749, -9.205]} scale={1.383}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1146_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.22, 0.708, 0.803]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1147_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.22, 0.708, 0.803]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1148_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.22, 0.708, 0.803]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1149_roof1_0.geometry}
                    material={materials.roof1}
                    position={[4.22, 0.708, 0.803]}
                    scale={0.894}
                />
            </group>
            <group position={[-8.044, 0.507, 35.484]} rotation={[0, 1.309, 0]} scale={0.768}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1162_tree1_0.geometry}
                    material={materials.tree1}
                    position={[6.534, 0.964, 6.183]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1163_tree1_0.geometry}
                    material={materials.tree1}
                    position={[6.534, 0.964, 6.183]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1164_tree1_0.geometry}
                    material={materials.tree1}
                    position={[8.336, 0.964, 12.906]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1165_roof1_0.geometry}
                    material={materials.roof1}
                    position={[8.336, 0.964, 12.906]}
                    scale={0.894}
                />
            </group>
            <group position={[0, -0.489, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1150_tree1_0.geometry}
                    material={materials.tree1}
                    position={[5.032, 0.846, 0.137]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1151_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.032, 0.846, 0.137]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1152_tree2_0.geometry}
                    material={materials.tree2}
                    position={[5.032, 0.846, 0.137]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1153_roof1_0.geometry}
                    material={materials.roof1}
                    position={[5.032, 0.846, 0.137]}
                    scale={0.894}
                />
            </group>
            <group position={[-9.924, -1.749, -11.956]} scale={1.383}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1158_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.399, 0.708, 1.013]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1159_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.399, 0.708, 1.013]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1160_tree1_0.geometry}
                    material={materials.tree1}
                    position={[4.399, 0.708, 1.013]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1161_roof1_0.geometry}
                    material={materials.roof1}
                    position={[4.399, 0.708, 1.013]}
                    scale={0.894}
                />
            </group>
            <group position={[-26.842, -4.826, -37.625]} scale={2.329}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1134_tree1_0.geometry}
                    material={materials.tree1}
                    position={[3.379, 0.56, 1.767]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1135_tree1_0.geometry}
                    material={materials.tree1}
                    position={[3.379, 0.56, 1.767]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1136_tree1_0.geometry}
                    material={materials.tree1}
                    position={[3.379, 0.56, 1.767]}
                    scale={0.894}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1137_roof1_0.geometry}
                    material={materials.roof1}
                    position={[3.379, 0.56, 1.767]}
                    scale={0.894}
                />
            </group>
            <group position={[0, -1.193, 0]} scale={[1, 0.562, 1]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pSphere1_ground_0.geometry}
                    material={materials.ground}
                    position={[0.109, 1.801, -1.088]}
                    scale={[0.52, 1, 0.531]}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCone10_phongE1_0.geometry}
                material={materials.phongE1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube106_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube107_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube108_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube109_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube11_rocks1_0.geometry}
                material={materials.rocks1}
                position={[-6.386, 3.47, -17.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube113_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube114_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube115_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube14_rocks1_0.geometry}
                material={materials.rocks1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube15_rocks1_0.geometry}
                material={materials.rocks1}
                position={[2.516, 3.338, -21.811]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube16_rocks1_0.geometry}
                material={materials.rocks1}
                position={[2.516, 3.338, -21.811]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube17_rocks1_0.geometry}
                material={materials.rocks1}
                position={[-6.386, 3.47, -17.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube18_rocks1_0.geometry}
                material={materials.rocks1}
                position={[2.516, 3.338, -21.811]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube196_rocks1_0.geometry}
                material={materials.rocks1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube197_rocks1_0.geometry}
                material={materials.rocks1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube205_roof2_0.geometry}
                material={materials.roof2}
                position={[5.032, 0.794, 0.137]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube209_rocks2_0.geometry}
                material={materials.rocks2}
                position={[5.032, 0.794, 0.137]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube213_roof2_0.geometry}
                material={materials.roof2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube223_phongE1_0.geometry}
                material={materials.phongE1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube224_phongE1_0.geometry}
                material={materials.phongE1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube225_phongE1_0.geometry}
                material={materials.phongE1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube27_phongE1_0.geometry}
                material={materials.phongE1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube27_totem_0.geometry}
                material={materials.totem}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCube58_rocks1_0.geometry}
                material={materials.rocks1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder101_roof1_0.geometry}
                material={materials.roof1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder101_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder11_floor_0.geometry}
                material={materials.floor}
                position={[0.109, 1.012, -1.088]}
                scale={[0.52, 1, 0.531]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder122_wood_0.geometry}
                material={materials.wood}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder141_fox_readyfox_black_0.geometry}
                material={materials.fox_readyfox_black}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder141_fox_readyfox_body_0.geometry}
                material={materials.fox_readyfox_body}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder141_fox_readyfox_white_0.geometry}
                material={materials.fox_readyfox_white}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder142_fox_readyfox_black_0.geometry}
                material={materials.fox_readyfox_black}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder142_fox_readyfox_body_0.geometry}
                material={materials.fox_readyfox_body}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder142_fox_readyfox_white_0.geometry}
                material={materials.fox_readyfox_white}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder149_leika2_0.geometry}
                material={materials.leika2}
                position={[5.032, 0.794, 0.137]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder159_roof2_0.geometry}
                material={materials.roof2}
                position={[24.867, 3.699, 5.694]}
                rotation={[0, 0.696, 0]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder160_rocks2_0.geometry}
                material={materials.rocks2}
                position={[5.032, 0.794, 0.137]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder21_totem_0.geometry}
                material={materials.totem}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder25_roof2_0.geometry}
                material={materials.roof2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pCylinder92_wood_0.geometry}
                material={materials.wood}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1054_tree1_0.geometry}
                material={materials.tree1}
                position={[-2.443, 2.361, -11.947]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1054_tree2_0.geometry}
                material={materials.tree2}
                position={[-2.443, 2.361, -11.947]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1054_tree_body_0.geometry}
                material={materials.tree_body}
                position={[-2.443, 2.361, -11.947]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1074_wood2_0.geometry}
                material={materials.wood2}
                position={[24.867, 3.699, 5.694]}
                rotation={[0, 0.696, 0]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1080_totem_0.geometry}
                material={materials.totem}
                position={[24.867, 3.699, 5.694]}
                rotation={[0, 0.696, 0]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1080_wood_0.geometry}
                material={materials.wood}
                position={[24.867, 3.699, 5.694]}
                rotation={[0, 0.696, 0]}
                scale={0.894}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface11_roof1_0.geometry}
                material={materials.roof1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface11_roof3_0.geometry}
                material={materials.roof3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1125_phongE1_0.geometry}
                material={materials.phongE1}
                position={[1.568, 3.248, -23.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1125_roof1_0.geometry}
                material={materials.roof1}
                position={[1.568, 3.248, -23.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1125_roof3_0.geometry}
                material={materials.roof3}
                position={[1.568, 3.248, -23.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1125_totem2_0.geometry}
                material={materials.totem2}
                position={[1.568, 3.248, -23.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1125_totem_0.geometry}
                material={materials.totem}
                position={[1.568, 3.248, -23.565]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1167_windows_frame_0.geometry}
                material={materials.windows_frame}
                position={[6.383, 3.883, -7.439]}
                rotation={[0.159, 0.433, -0.003]}
                scale={1.313}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1214_phongE1_0.geometry}
                material={materials.phongE1}
                position={[2.207, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1214_roof1_0.geometry}
                material={materials.roof1}
                position={[2.207, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1214_roof3_0.geometry}
                material={materials.roof3}
                position={[2.207, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1214_totem2_0.geometry}
                material={materials.totem2}
                position={[2.207, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1214_totem_0.geometry}
                material={materials.totem}
                position={[2.207, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1244_wood2_0.geometry}
                material={materials.wood2}
            />
            <group position={[0, -0.131, 0]} scale={[1, 0.583, 1]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.polySurface1523_ground_0.geometry}
                    material={materials.ground}
                    position={[36.718, 3.06, 23.582]}
                    scale={2.532}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1522_floor2_0.geometry}
                material={materials.floor2}
                position={[36.718, 1.983, 23.582]}
                scale={2.532}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1310_totem_0.geometry}
                material={materials.totem}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1318_windows_frame_0.geometry}
                material={materials.windows_frame}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1340_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1340_windows_frame_0.geometry}
                material={materials.windows_frame}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1340_wood2_0.geometry}
                material={materials.wood2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1341_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1341_windows_frame_0.geometry}
                material={materials.windows_frame}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1341_wood2_0.geometry}
                material={materials.wood2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1342_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1342_windows_frame_0.geometry}
                material={materials.windows_frame}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1342_wood2_0.geometry}
                material={materials.wood2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1343_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1343_windows_frame_0.geometry}
                material={materials.windows_frame}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1343_wood2_0.geometry}
                material={materials.wood2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1489_totem_0.geometry}
                material={materials.totem}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1489_wood_0.geometry}
                material={materials.wood}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1491_shovel2_0.geometry}
                material={materials.shovel2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1491_totem_0.geometry}
                material={materials.totem}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1491_wood2_0.geometry}
                material={materials.wood2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1491_wood_0.geometry}
                material={materials.wood}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface310_wood2_0.geometry}
                material={materials.wood2}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface311_wood2_0.geometry}
                material={materials.wood2}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface312_wood2_0.geometry}
                material={materials.wood2}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface313_windows_background_0.geometry}
                material={materials.windows_background}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface313_windows_frame_0.geometry}
                material={materials.windows_frame}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface314_windows_frame_0.geometry}
                material={materials.windows_frame}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface315_windows_frame_0.geometry}
                material={materials.windows_frame}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface337_roof1_0.geometry}
                material={materials.roof1}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface337_roof3_0.geometry}
                material={materials.roof3}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface338_totem2_0.geometry}
                material={materials.totem2}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface339_roof1_0.geometry}
                material={materials.roof1}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface342_roof1_0.geometry}
                material={materials.roof1}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface342_roof3_0.geometry}
                material={materials.roof3}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface343_wood2_0.geometry}
                material={materials.wood2}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface345_home_body_0.geometry}
                material={materials.home_body}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface345_tree_body_0.geometry}
                material={materials.tree_body}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1311_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1313_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1314_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1315_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1316_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1317_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface220_windows_frame_0.geometry}
                material={materials.windows_frame}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface319_wood_0.geometry}
                material={materials.wood}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface340_wood2_0.geometry}
                material={materials.wood2}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface38_wood_0.geometry}
                material={materials.wood}
                position={[14.993, 4.008, -18.875]}
                rotation={[-0.26, 0.438, 0.146]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface437_wood_0.geometry}
                material={materials.wood}
                position={[-27.911, 1.553, 12.571]}
                rotation={[0.051, 0.467, -0.104]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface900_home_body_0.geometry}
                material={materials.home_body}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface922_wood2_0.geometry}
                material={materials.wood2}
                position={[0, -0.084, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface923_wood2_0.geometry}
                material={materials.wood2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface469_wood_0.geometry}
                material={materials.wood}
                position={[-7.549, 0.165, -8.181]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface487_totem_0.geometry}
                material={materials.totem}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1028_tree2_0.geometry}
                material={materials.tree2}
                position={[-7.925, 3.277, 10.454]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1029_tree1_0.geometry}
                material={materials.tree1}
                position={[-7.925, 3.277, 10.454]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1030_tree1_0.geometry}
                material={materials.tree1}
                position={[-7.925, 3.277, 10.454]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1031_tree_body_0.geometry}
                material={materials.tree_body}
                position={[-7.925, 3.277, 10.454]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1032_tree_body_0.geometry}
                material={materials.tree_body}
                position={[-7.925, 3.277, 10.454]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface1033_tree_body_0.geometry}
                material={materials.tree_body}
                position={[-7.925, 3.277, 10.454]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface850_wood2_0.geometry}
                material={materials.wood2}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface857_wood_0.geometry}
                material={materials.wood}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface860_wood_0.geometry}
                material={materials.wood}
                position={[41.403, 2.172, -25.361]}
                rotation={[0, -0.91, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface875_rocks_0.geometry}
                material={materials.rocks}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polySurface898_windows_frame_0.geometry}
                material={materials.windows_frame}
                position={[-18.395, 11.427, -16.796]}
                rotation={[0.306, 0.154, -0.068]}
                scale={1.633}
            />
        </a.group>
    )
}

export default Island;


