import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Group } from "three";

import ModelView from "./ModelView";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

import { models, sizes } from "../../constants";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState(models[0]);

  // Camera Control for model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Model Ref
  const small = useRef(new Group());
  const large = useRef(new Group());

  // Rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotation={setSmallRotation}
              model={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotation={setLargeRotation}
              model={model}
              size={size}
            />

            <Canvas
              className="size-full"
              style={{ position: "fixed", inset: 0, overflow: "hidden" }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((model, i) => (
                  <li
                    role="none"
                    key={i}
                    className="size-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: model.color[0] }}
                    onClick={() => setModel(model)}
                    onKeyDown={() => {}}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    role="none"
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                    onKeyDown={() => {}}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
