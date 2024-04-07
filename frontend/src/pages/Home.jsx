import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Popups from '../components/Popups';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Logout from '../components/Logout';
import AddMemory from '../components/AddMemory/AddMemory';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isOpen,onClose] = useState(false);

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1, 4.7, 0];

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        }
        else {
            screenScale = [1, 1, 1];
        }
        return [screenScale, screenPosition, rotation]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

    return (
        <section className="w-full h-screen relative">
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <Popups currentStage={currentStage} />}
            </div>
            <AddMemory isOpen ={isOpen} onClose = {onClose}/>
            <Logout />
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#80461B" intensity={1} />

                    <Sky
                        isRotating={isRotating}
                    />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                </Suspense>
            </Canvas>
        </section>

    )
}

export default Home