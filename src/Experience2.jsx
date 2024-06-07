import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Text3D } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import * as THREE from 'three';

// animated text component
function AnimatedText({ text, fontSize, fontColor, selectedFont, transparency, scale, animationType }) {
    const textRef = useRef();
    const clock = useRef(new THREE.Clock());

    useEffect(() => {
        if (textRef.current) {
            textRef.current.position.set(0, 0, 0);
            textRef.current.rotation.set(0, 0, 0);
            clock.current.start();
        }
    }, [animationType]);    // dependency array -> useeffect relies on animationtype

    useFrame(() => {
        const elapsedTime = clock.current.getElapsedTime();
        const speedFactor = 3; // speed manipulation factor for animation

        if (animationType === "bounce") {
            textRef.current.position.y = Math.abs(Math.sin(elapsedTime * speedFactor)) * 2;
        } else if (animationType === "spin") {
            textRef.current.rotation.y = elapsedTime * speedFactor;
        }
    });

    return (
        <Text3D
            ref={textRef}
            font={`./fonts/${selectedFont}.json`}
            size={fontSize}
            height={0.5}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.0002}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={0.5}
            scale={scale}
        >
            {text}
            <meshPhongMaterial color={fontColor} transparent opacity={transparency} />
        </Text3D>
    );
}

export default function App() {
    const [text, setText] = useState("hello"); // initial text
    const [fontSize, setFontSize] = useState(1); // initial size
    const [fontColor, setFontColor] = useState("#6495ED"); // initial color
    const [selectedFont, setSelectedFont] = useState("gentilis_regular"); // initial font
    const [transparency, setTransparency] = useState(1); // initial transparency
    const [scale, setScale] = useState([1, 1, 1]); // initial scale
    const [animationType, setAnimationType] = useState("none"); // initial animation

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const handleFontColor = (event) => {
        setFontColor(event.target.value);
    };

    const handleFontSelection = (event) => {
        setSelectedFont(event.target.value);
    };

    const handleTransparencyChange = (event) => {
        setTransparency(event.target.value);
    };

    const handleScaleChange = (event) => {
        setScale([event.target.value, event.target.value, event.target.value]);
    };

    const handleAnimationChange = (event) => {
        setAnimationType(event.target.value);
    };

    const handleExport = () => {
        // exporting only the static text without animations
        const exporter = new GLTFExporter();
        exporter.parse(
            <Text3D
                font={`./fonts/${selectedFont}.json`}
                size={fontSize}
                height={0.5}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.0002}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={0.5}
                scale={scale}
            >
                {text}
                <meshPhongMaterial color={fontColor} transparent opacity={transparency} />
            </Text3D>,
            (result) => {
                const output = JSON.stringify(result, null, 2); // converts the result (in GLTF format) to a JSON string
                const blob = new Blob([output], { type: 'application/json' }); // blob = immutable raw data
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url; // <a href> link
                link.download = '3d-text.glb';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            { binary: true } // for .glb
        );
    };

    return (
        <>
            <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 10] }}>
                <OrbitControls makeDefault />
                <ambientLight />
                <Center>
                    <AnimatedText
                        text={text}
                        fontSize={fontSize}
                        fontColor={fontColor}
                        selectedFont={selectedFont}
                        transparency={transparency}
                        scale={scale}
                        animationType={animationType}
                    />
                </Center>
            </Canvas>
            <div className="controls">
                <div>
                    <label>Text: </label>
                    <input type="text" value={text} onChange={handleTextChange} placeholder="Enter text" />
                </div>
                <div>
                    <label>Font Size: </label>
                    <input type="number" min={0} max={2} step={0.2} value={fontSize} onChange={handleFontSizeChange} />
                </div>
                <div>
                    <label>Font Color: </label>
                    <input type="color" value={fontColor} onChange={handleFontColor} />
                </div>
                <div>
                    <label>Text Transparency: </label>
                    <input type="range" name="Transparency" min={0} max={1} step={0.1} value={transparency} onChange={handleTransparencyChange} />
                </div>
                <div>
                    <label>Text Scaling: </label>
                    <input type="number" min={0} max={1} step={0.1} value={scale[0]} onChange={handleScaleChange} placeholder="Scale" />
                </div>
                <div>
                    <label>Font: </label>
                    <select value={selectedFont} onChange={handleFontSelection}>
                        <option value="gentilis_regular">Gentilis Regular</option>
                        <option value="helvetiker_regular">Helvetiker Regular</option>
                        <option value="optimer_regular">Optimer Regular</option>
                        <option value="dancingScript_regular">Dancing Script Regular</option>
                    </select>
                </div>
                <div>
                    <label>Animation: </label>
                    <select value={animationType} onChange={handleAnimationChange}>
                        <option value="none">None</option>
                        <option value="bounce">Bounce</option>
                        <option value="spin">Spin</option>
                    </select>
                </div>
                <div>
                    <button onClick={handleExport}>Export 3D Text</button>
                </div>
            </div>
        </>
    );
}