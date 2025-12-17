import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import {
    Play,
    Pause,
    RotateCcw,
    Maximize,
    Minimize,
    Settings,
} from "lucide-react-native";
import Slider from "@react-native-community/slider";

const { height } = Dimensions.get("window");

interface VideoPlayerProps {
    thumbnail: string;
    duration: number; // in seconds
    onToggleFullscreen?: () => void;
    isFullscreen?: boolean;
}

export function VideoPlayer({ thumbnail, duration, onToggleFullscreen, isFullscreen = false }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [showSpeedOptions, setShowSpeedOptions] = useState(false);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (value: number) => {
        setCurrentTime(value);
    };

    const handleReset = () => {
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const toggleSpeedOptions = () => {
        setShowSpeedOptions(!showSpeedOptions);
    };

    const selectSpeed = (speed: number) => {
        setPlaybackSpeed(speed);
        setShowSpeedOptions(false);
    };

    return (
        <View className={`bg-black relative ${isFullscreen ? "flex-1" : ""}`} style={{ height: isFullscreen ? height * 0.4 : 250, borderRadius: isFullscreen ? 0 : 16, overflow: 'hidden' }}>
            <Image
                source={{ uri: thumbnail }}
                className="w-full h-full"
                resizeMode="cover"
            />

            {/* Play/Pause Overlay */}
            <TouchableOpacity
                className="absolute inset-0 items-center justify-center"
                onPress={handlePlayPause}
            >
                {!isPlaying && (
                    <View className="w-16 h-16 rounded-full bg-black/50 items-center justify-center">
                        <Play color="white" size={32} />
                    </View>
                )}
            </TouchableOpacity>

            {/* Top Controls */}
            <View className="absolute top-0 right-0 p-4">
                <TouchableOpacity
                    onPress={onToggleFullscreen}
                    className="bg-black/30 p-2 rounded-full"
                >
                    {isFullscreen ? (
                        <Minimize color="white" size={20} />
                    ) : (
                        <Maximize color="white" size={20} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                {/* Progress Bar */}
                <View className="mb-2">
                    <Slider
                        style={{ width: "100%", height: 40 }}
                        minimumValue={0}
                        maximumValue={duration}
                        value={currentTime}
                        onValueChange={handleSeek}
                        minimumTrackTintColor="#8B9467"
                        maximumTrackTintColor="#ffffff40"
                        thumbTintColor="#8B9467"
                    />
                    <View className="flex-row justify-between -mt-2 px-1">
                        <Text className="text-white text-xs">
                            {formatTime(currentTime)}
                        </Text>
                        <Text className="text-white text-xs">{formatTime(duration)}</Text>
                    </View>
                </View>

                {/* Control Buttons */}
                <View className="flex-row justify-between items-center px-2">
                    <View className="flex-row items-center gap-6">
                        <TouchableOpacity onPress={handleReset}>
                            <RotateCcw color="white" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handlePlayPause}>
                            {isPlaying ? (
                                <Pause color="white" size={24} />
                            ) : (
                                <Play color="white" size={24} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={toggleSpeedOptions}>
                        <Settings color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Speed Options Modal */}
            {showSpeedOptions && (
                <View className="absolute bottom-20 right-4 bg-white rounded-xl shadow-lg z-10 p-2">
                    {[0.5, 1.0, 1.5, 2.0].map((speed) => (
                        <TouchableOpacity
                            key={speed}
                            className={`px-3 py-2 rounded-lg ${playbackSpeed === speed ? "bg-[#8B9467]" : "bg-transparent"}`}
                            onPress={() => selectSpeed(speed)}
                        >
                            <Text
                                className={`${playbackSpeed === speed ? "text-white" : "text-gray-800"} font-medium`}
                            >
                                {speed}x
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}
