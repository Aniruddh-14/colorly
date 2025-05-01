import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [colorHistory, setColorHistory] = useState([]);
    const [copiedColor, setCopiedColor] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [colors.length]);

    const handleColorClick = (index) => {
        const newColors = [...colors];
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        newColors[index] = randomColor;
        setColors(newColors);
        setColorHistory(prev => [randomColor, ...prev].slice(0, 5));
    };

    const copyToClipboard = (color) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const generatePalette = () => {
        const newPalette = Array(5).fill().map(() =>
            '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
        );
        setColors(newPalette);
    };

    const getColorName = (hex) => {
        const colorMap = {
            '#FF6B6B': 'Coral Red',
            '#4ECDC4': 'Turquoise',
            '#45B7D1': 'Sky Blue',
            '#96CEB4': 'Mint Green',
            '#FFEEAD': 'Cream',
        };
        return colorMap[hex] || 'Custom Color';
    };

    return (
        <div className="App" style={{ backgroundColor: colors[currentColorIndex] }}>
            <div className="content">
                <h1 className="title">Welcome to Colory</h1>
                <p className="subtitle">A Colorful Experience</p>

                <div className="color-boxes">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="color-box"
                            style={{
                                backgroundColor: color,
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => handleColorClick(index)}
                        >
                            <div className="color-info">
                                <span className="color-name">{getColorName(color)}</span>
                                <span className="color-hex">{color}</span>
                                <button
                                    className="copy-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(color);
                                    }}
                                >
                                    {copiedColor === color ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="controls">
                    <button className="generate-btn" onClick={generatePalette}>
                        Generate New Palette
                    </button>
                </div>

                <div className="info-card">
                    <h2>Interactive Colors</h2>
                    <p>Click on any color box to generate a new random color!</p>
                    <p>Copy colors to your clipboard with the copy button.</p>
                    <p>The background color changes automatically every 3 seconds.</p>
                </div>

                {colorHistory.length > 0 && (
                    <div className="history-section">
                        <h3>Recent Colors</h3>
                        <div className="history-colors">
                            {colorHistory.map((color, index) => (
                                <div
                                    key={index}
                                    className="history-color"
                                    style={{ backgroundColor: color }}
                                    onClick={() => copyToClipboard(color)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App; 