import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls, Text3D } from '@react-three/drei'
import { useState } from 'react'

export default function App() {
    const [text, setText] = useState("hello"); // Initial text
    const [fontSize, setFontSize] = useState(1);
    const [fontColor, setFontColor] = useState("#6495ED"); // Initial color
    const [selectedFont, setSelectedFont] = useState("gentilis_regular"); // Initial font
    const [transparency, setTransparency] = useState(1); // Initial transparency
    const [scale, setScale] = useState([1, 1, 1]); // Initial scale
    
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

    return (
        <>
            <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [4, -2, 8], }}>
                <OrbitControls makeDefault />
                <ambientLight />
                <Center>
                    <Text3D
                        font={`./fonts/${selectedFont}.typeface.json`}   // try font-1
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
                        <meshPhongMaterial color={fontColor} transparent opacity={transparency}/>
                    </Text3D>
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
                    <input type="range" name="Transparency" className="slider" min={0} max={1} step={0.1} value={transparency} onChange={handleTransparencyChange} />
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
                    </select>
                </div>
            </div>
        </>
    );
}
