import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Sun, Moon, Utensils, Droplets, Flame } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { foodRecommendations } from '../constants/data';

const { width } = Dimensions.get('window');

export default function FoodRecommendationScreen() {
    const router = useRouter();
    const [selectedDosha, setSelectedDosha] = useState('Vata-Pitta');

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#FF9F1C] pt-12 pb-6 px-4 rounded-b-3xl shadow-md z-10">
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-white/20 p-2 rounded-full"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold">Ayurvedic Diet</Text>
                    <View className="w-10" />
                </View>

                <Text className="text-white/90 text-center text-lg">
                    Balance your body with {foodRecommendations.season}
                </Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Dosha Selector (Mock) */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-6 px-4">
                    {['Vata-Pitta', 'Pitta-Kapha', 'Kapha-Vata'].map((dosha) => (
                        <TouchableOpacity
                            key={dosha}
                            onPress={() => setSelectedDosha(dosha)}
                            className={`mr-3 px-6 py-2 rounded-full border ${selectedDosha === dosha
                                    ? 'bg-[#FF9F1C] border-[#FF9F1C]'
                                    : 'bg-white border-gray-200'
                                }`}
                        >
                            <Text className={`font-medium ${selectedDosha === dosha ? 'text-white' : 'text-gray-600'
                                }`}>
                                {dosha}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Daily Menu Timeline */}
                <View className="px-4 pb-8">
                    <Text className="text-2xl font-bold text-gray-800 mb-6">Today's Meal Plan</Text>

                    {foodRecommendations.dailyMenu.map((meal, index) => (
                        <View key={index} className="flex-row mb-8">
                            {/* Vertical Line */}
                            {index !== foodRecommendations.dailyMenu.length - 1 && (
                                <View className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-gray-200" />
                            )}

                            {/* Icon */}
                            <View className="w-10 h-10 rounded-full bg-[#FFF3E0] items-center justify-center mr-4 border-2 border-white shadow-sm z-10">
                                {index === 0 ? <Droplets color="#FF9F1C" size={18} /> :
                                    index === 3 ? <Moon color="#FF9F1C" size={18} /> :
                                        <Utensils color="#FF9F1C" size={18} />}
                            </View>

                            {/* Card */}
                            <View className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <Image
                                    source={{ uri: meal.image }}
                                    className="w-full h-32"
                                />
                                <View className="p-4">
                                    <View className="flex-row justify-between items-start mb-2">
                                        <View>
                                            <Text className="text-[#FF9F1C] font-bold text-xs uppercase mb-1">{meal.time}</Text>
                                            <Text className="text-lg font-bold text-gray-800">{meal.suggestion}</Text>
                                        </View>
                                        <View className="bg-orange-50 px-2 py-1 rounded-lg">
                                            <Text className="text-orange-500 font-bold text-xs">{meal.calories}</Text>
                                        </View>
                                    </View>

                                    <Text className="text-gray-500 text-sm mb-3">{meal.description}</Text>

                                    <View className="flex-row flex-wrap gap-2">
                                        {meal.tags.map(tag => (
                                            <View key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                <Text className="text-gray-500 text-xs">{tag}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Avoid List */}
                <View className="mx-4 mb-8 bg-red-50 p-6 rounded-2xl border border-red-100">
                    <Text className="text-red-800 font-bold text-lg mb-3">Foods to Avoid</Text>
                    {foodRecommendations.avoid.map((item, index) => (
                        <View key={index} className="flex-row items-center mb-2">
                            <View className="w-2 h-2 rounded-full bg-red-400 mr-2" />
                            <Text className="text-red-700">{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Hydration Tip */}
                <LinearGradient
                    colors={['#4facfe', '#00f2fe']}
                    className="mx-4 mb-10 p-6 rounded-2xl shadow-lg"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View className="flex-row items-start">
                        <Droplets color="white" size={32} className="mr-4" />
                        <View className="flex-1">
                            <Text className="text-white font-bold text-xl mb-1">Hydration Tip</Text>
                            <Text className="text-white/90 leading-5">
                                Drink warm water throughout the day to aid digestion and maintain body temperature balance.
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
}
