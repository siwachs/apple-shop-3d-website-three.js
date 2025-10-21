import { Suspense } from 'react';
import { Vector3 } from 'three';

import { View, PerspectiveCamera, Html, OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import Iphone from './IPhone';
import Loader from '../Loader';

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotation, model, size }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute size-full ${index === 2 ? '-right-full' : ''}`}
    >
      {/* Ambient Light: Light all the Object in a Scene Equally */}
      <ambientLight intensity={0.3} />

      {/* Human Eye */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      {/* Mouse Controls */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new Vector3(0, 0, 0)}
        onEnd={() => setRotation(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
        <Suspense
          fallback={
            <Html fullscreen>
              <Loader text="Loading IPhone..." />
            </Html>
          }
        >
          <Iphone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} model={model} size={size} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
