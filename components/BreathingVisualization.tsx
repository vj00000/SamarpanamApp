import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface BreathingVisualizationProps {
    ratio?: string; // e.g. "4:4:4:4"
    pace?: number;   // e.g. 1.0
    isFullScreen?: boolean;
}

export const BreathingVisualization = ({ ratio = "4:4:4:4", pace = 1.0, isFullScreen = false }: BreathingVisualizationProps) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            background-color: ${isFullScreen ? '#000' : 'transparent'};
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            overflow: hidden;
        }

        #breath-canvas {
            width: ${isFullScreen ? '120px' : '80px'};
            height: ${isFullScreen ? '120px' : '80px'};
            border-radius: 50%;
            background: radial-gradient(circle,
                    rgba(255, 250, 200, 1) 0%,
                    rgba(255, 140, 0, 0.8) 45%,
                    rgba(255, 69, 0, 0) 75%);
            filter: blur(${isFullScreen ? '12px' : '8px'});
            box-shadow: 0 0 ${isFullScreen ? '120px' : '50px'} rgba(255, 100, 0, ${isFullScreen ? '0.5' : '0.3'});
            opacity: 0.5;
            transition: transform 1s linear, opacity 1s linear;
        }
    </style>
</head>
<body>
    <div id="breath-canvas"></div>
    <script>
        const canvas = document.getElementById('breath-canvas');
        let phase = 0;
        const ratioStr = "${ratio}";
        const paceVal = ${pace};
        
        const ratios = ratioStr.split(':').map(Number);

        function nextStep() {
            if (ratios[phase] === 0) {
                phase = (phase + 1) % 4;
                nextStep();
                return;
            }

            const duration = ratios[phase] * paceVal * 1000;
            canvas.style.transition = \`transform \${duration}ms linear, opacity \${duration}ms linear\`;

            if (phase === 0) { // INHALE
                canvas.style.transform = "scale(${isFullScreen ? '4.5' : '2.5'})";
                canvas.style.opacity = "1";
            }
            else if (phase === 1) { // STOP (Full)
                canvas.style.transform = "scale(${isFullScreen ? '4.5' : '2.5'})";
                canvas.style.opacity = "1";
            }
            else if (phase === 2) { // OUT
                canvas.style.transform = "scale(1)";
                canvas.style.opacity = "0.4";
            }
            else if (phase === 3) { // STOP (Empty)
                canvas.style.transform = "scale(1)";
                canvas.style.opacity = "0.4";
            }

            setTimeout(() => {
                phase = (phase + 1) % 4;
                nextStep();
            }, duration);
        }

        nextStep();
    </script>
</body>
</html>
    `;

    return (
        <View style={[styles.container, !isFullScreen && { backgroundColor: 'transparent' }]}>
            <WebView
                source={{ html: htmlContent }}
                style={[styles.webview, { backgroundColor: isFullScreen ? '#000' : 'transparent' }]}
                scrollEnabled={false}
                transparent={!isFullScreen}
                backgroundColor={isFullScreen ? '#000' : 'transparent'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    webview: {
        width: '100%',
        height: '100%',
    },
});
