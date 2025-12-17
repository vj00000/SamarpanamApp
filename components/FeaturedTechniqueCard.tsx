import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Heart, Play } from 'lucide-react-native';

interface FeaturedTechniqueCardProps {
    technique: {
        id: string;
        image: string;
        title: string;
        duration: string;
        level: string;
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
        <View className="bg-white rounded-2xl shadow-sm w-64 relative">
            <Image
                source={{ uri: technique.image }}
                className="w-full h-36 rounded-t-2xl"
                resizeMode="cover"
            />
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
                <View className="flex-row justify-between mt-2">
                    <Text className="text-gray-500">{technique.duration}</Text>
                    <Text className="text-gray-500">{technique.level}</Text>
                </View>
                <TouchableOpacity
                    className="mt-3 bg-[#8B9467] py-2 rounded-full flex-row items-center justify-center"
                    onPress={onPress}
                >
                    <Play color="white" size={16} className="mr-1" />
                    <Text className="text-white font-medium">Start Practice</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
