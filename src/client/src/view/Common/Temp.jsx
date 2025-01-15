import {useState} from "react";

export const Temp = () => {
    const [components, setComponents] = useState([]);
    const [secondComponents,setSecondComponent] = useState([]);

    const addComponent = () => {
        setComponents([
            ...components,
            <div key={components.length} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                Это компонент {components.length + 1}
            </div>,
        ]);
    };
    const addSecComponent = () => {
        setSecondComponent([
            ...secondComponents,
            <div key={secondComponents.length} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                Это компонент {secondComponents.length + 1}
            </div>,
        ]);
    };

    return (
        <div>
            <button onClick={addComponent}>Добавить компонент</button>
            <div>{components}</div>
            <button onClick={addSecComponent}>Добавить компонент</button>
            <div>{secondComponents}</div>
        </div>
    );
};
