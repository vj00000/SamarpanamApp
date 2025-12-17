import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Play, Pause, RotateCcw, Volume2, Heart, ChevronLeft, Info } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { techniques } from '../../constants/data';
import { VideoPlayer } from '../../components/VideoPlayer';

const { width } = Dimensions.get('window');

export default function TechniqueDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const technique = techniques[id as string];

    // If technique not found, show error or loading
    if (!technique) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <Text className="text-gray-800 text-lg mb-4">Technique not found</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-[#8B9467] px-6 py-3 rounded-full"
                >
                    <Text className="text-white font-medium">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes default
    const [isFavorite, setIsFavorite] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    // Initial setup based on technique duration string (simple parsing)
    useEffect(() => {
        if (technique.duration) {
            const minutes = parseInt(technique.duration);
            if (!isNaN(minutes)) {
                setTimeRemaining(minutes * 60);
            }
        }
    }, [technique]);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPlaying && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsPlaying(false);
            Alert.alert('Session Completed', 'Great job! You\'ve completed your session.');
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, timeRemaining]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const toggleTimer = () => {
        setIsPlaying(!isPlaying);
    };

    const resetTimer = () => {
        setIsPlaying(false);
        // Reset to original duration
        if (technique.duration) {
            const minutes = parseInt(technique.duration);
            if (!isNaN(minutes)) {
                setTimeRemaining(minutes * 60);
            } else {
                setTimeRemaining(600);
            }
        } else {
            setTimeRemaining(600);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        Alert.alert(
            !isFavorite ? 'Added to Favorites' : 'Removed from Favorites',
            !isFavorite
                ? 'This technique has been added to your favorites.'
                : 'This technique has been removed from your favorites.'
        );
    };

    return (
        <View className="flex-1 bg-slate-50">
            {/* Header */}
            <View className="bg-[#8B9467] pt-12 pb-4 px-4 rounded-b-3xl">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-white/20 p-2 rounded-full"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>

                    <Text className="text-white text-xl font-bold">{technique.title}</Text>

                    <TouchableOpacity
                        onPress={toggleFavorite}
                        className="bg-white/20 p-2 rounded-full"
                    >
                        <Heart
                            color={isFavorite ? "#FF6B6B" : "white"}
                            fill={isFavorite ? "#FF6B6B" : "none"}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                <Text className="text-white/90 text-center mt-2">{technique.subtitle}</Text>
            </View>

            <ScrollView
                className="flex-1 px-4 py-6"
                showsVerticalScrollIndicator={false}
            >
                {/* Technique Video */}
                <View className="mb-6 rounded-2xl overflow-hidden shadow-sm">
                    <VideoPlayer
                        thumbnail={technique.image}
                        duration={parseInt(technique.duration) * 60 || 600}
                    />
                </View>

                {/* Timer Section */}
                <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <View className="flex-row justify-between items-center mb-4">
                        <View>
                            <Text className="text-gray-500 text-sm">Duration</Text>
                            <Text className="text-[#8B9467] font-bold">{technique.duration}</Text>
                        </View>

                        <View className="items-center">
                            <Text className="text-gray-500 text-sm">Difficulty</Text>
                            <Text className="text-[#6495ED] font-bold">{technique.difficulty}</Text>
                        </View>
                    </View>

                    {/* Circular Timer */}
                    <View className="items-center my-6">
                        <View className="w-48 h-48 rounded-full border-8 border-[#C9E4CA] items-center justify-center">
                            <Text className="text-3xl font-bold text-[#8B9467]">{formatTime(timeRemaining)}</Text>
                            <Text className="text-gray-500 mt-1">minutes</Text>
                        </View>
                    </View>

                    {/* Timer Controls */}
                    <View className="flex-row justify-center items-center space-x-8">
                        <TouchableOpacity
                            onPress={resetTimer}
                            className="bg-gray-100 p-3 rounded-full"
                        >
                            <RotateCcw color="#666" size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={toggleTimer}
                            className={`w-16 h-16 rounded-full items-center justify-center ${isPlaying ? 'bg-red-400' : 'bg-[#8B9467]'}`}
                        >
                            {isPlaying ? (
                                <Pause color="white" size={32} />
                            ) : (
                                <Play color="white" size={32} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowInfo(!showInfo)}
                            className="bg-gray-100 p-3 rounded-full"
                        >
                            <Info color="#666" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Description */}
                <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <Text className="text-lg font-bold text-gray-800 mb-3">About this Technique</Text>
                    <Text className="text-gray-600 leading-6">{technique.description}</Text>
                </View>

                {/* Steps */}
                {technique.steps && (
                    <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <Text className="text-lg font-bold text-gray-800 flex-1">Step-by-Step Guide</Text>
                            <TouchableOpacity className="flex-row items-center bg-[#C9E4CA] px-3 py-1 rounded-full">
                                <Volume2 color="#8B9467" size={16} />
                                <Text className="text-[#8B9467] ml-1 font-medium">Audio</Text>
                            </TouchableOpacity>
                        </View>

                        {technique.steps.map((step: string, index: number) => (
                            <View key={index} className="flex-row mb-4">
                                <View className="w-8 h-8 rounded-full bg-[#8B9467] items-center justify-center mr-3">
                                    <Text className="text-white font-bold">{index + 1}</Text>
                                </View>
                                <Text className="text-gray-700 flex-1 pt-1">{step}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Benefits */}
                {technique.benefits && (
                    <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                        <Text className="text-lg font-bold text-gray-800 mb-4">Benefits</Text>
                        <View className="flex-row flex-wrap gap-3">
                            {technique.benefits.map((benefit: string, index: number) => (
                                <View
                                    key={index}
                                    className="bg-[#C9E4CA] px-4 py-2 rounded-full"
                                >
                                    <Text className="text-[#8B9467] font-medium">{benefit}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Safety Precautions */}
                {showInfo && technique.precautions && (
                    <View className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-6">
                        <Text className="font-bold text-amber-800 mb-2">Safety Precautions</Text>
                        {technique.precautions.map((precaution: string, index: number) => (
                            <View key={index} className="flex-row mb-1">
                                <Text className="text-amber-700 mr-2">•</Text>
                                <Text className="text-amber-700 flex-1">{precaution}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}