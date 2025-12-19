import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Heart, Play } from 'lucide-react-native';
import { BreathingVisualization } from './BreathingVisualization';

interface FeaturedTechniqueCardProps {
    technique: {
        id: string;
        image: string;
        title: string;
        duration: string;
        level: string;
        visualType?: 'fire-gaze';
        visualRatio?: string;
    };
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onPress: () => void;
}

export function FeaturedTechniqueCard({
    technique,
    isFavorite,
    onToggleFavorite,
    onPress
}: FeaturedTechniqueCardProps) {
    return (
        <View className="bg-white rounded-2xl shadow-sm w-full relative overflow-hidden">
            {technique.visualType === 'fire-gaze' && (
                <View className="absolute top-3 left-3 bg-[#ff8c00]/80 px-2 py-1 rounded-md z-10">
                    <Text className="text-white text-[10px] font-bold">INTERACTIVE</Text>
                </View>
            )}
            {technique.visualType === 'fire-gaze' ? (
                <View className="w-full h-36">
                    <BreathingVisualization ratio={technique.visualRatio} />
                </View>
            ) : (
                <Image
                    source={{ uri: technique.image }}
                    className="w-full h-36"
                    resizeMode="cover"
                />
            )}
            <TouchableOpacity
                className="absolute top-3 right-3 bg-white/80 rounded-full p-2"
                onPress={onToggleFavorite}
            >
                <Heart
                    color={isFavorite ? "#FF6B6B" : "#666"}
                    fill={isFavorite ? "#FF6B6B" : "transparent"}
                    size={20}
                />
            </TouchableOpacity>

            <View className="p-4">
                <Text className="font-bold text-lg text-gray-800">{technique.title}</Text>
                <View className="flex-row justify-between mt-1">
                    <Text className="text-gray-500 text-sm">{technique.duration}</Text>
                    <Text className="text-gray-500 text-sm">{technique.level}</Text>
                </View>
                <TouchableOpacity
                    className="mt-3 bg-[#8B9467] py-2 rounded-full flex-row items-center justify-center shadow-sm"
                    onPress={onPress}
                >
                    <Play color="white" size={16} className="mr-1" />
                    <Text className="text-white font-medium">Start Practice</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
