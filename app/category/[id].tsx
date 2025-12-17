import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Play, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { categoryDetails } from '../../constants/data';
import { FeaturedTechniqueCard } from '../../components/FeaturedTechniqueCard';

const { width } = Dimensions.get('window');

export default function CategoryDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const category = categoryDetails[id as string];

    if (!category) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-gray-500 text-lg">Category not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4">
                    <Text className="text-[#8B9467] font-bold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (id === '4') {
        // Special redirect for 'Aahar' (Food) category
        // In a real app, you might want to do this redirection before rendering or have a dedicated Aahar screen
        // For now, we'll provide a button to go there.
        return (
            <View className="flex-1 bg-white">
                <Image
                    source={{ uri: category.image }}
                    className="w-full h-1/2 absolute top-0"
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,1)']}
                    className="absolute top-0 left-0 right-0 h-1/2 mt-32"
                />
                <View className="flex-1 justify-end px-6 pb-20">
                    <Text className="text-4xl font-bold text-gray-900 mb-4">{category.title}</Text>
                    <Text className="text-gray-600 text-lg mb-8 leading-8">{category.description}</Text>

                    <TouchableOpacity
                        onPress={() => router.push('/food-recommendations')}
                        className="bg-[#FF9F1C] py-4 rounded-xl items-center shadow-md active:opacity-90"
                    >
                        <Text className="text-white font-bold text-lg">View Ayurvedic Diet Plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mt-6 items-center"
                    >
                        <Text className="text-gray-400">Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header Image with Overlay */}
            <View className="h-64 w-full relative">
                <Image
                    source={{ uri: category.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                    className="absolute inset-0"
                />

                {/* Navigation Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-12 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center"
                >
                    <ChevronLeft color="white" size={24} />
                </TouchableOpacity>

                {/* Title and Description */}
                <View className="absolute bottom-6 left-6 right-6">
                    <Text className="text-white text-3xl font-bold mb-2">{category.title}</Text>
                    <Text className="text-white/90 text-sm leading-5">{category.description}</Text>
                </View>
            </View>

            {/* Techniques List */}
            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-xl font-bold text-gray-800 mb-4">Available Practices</Text>

                <View className="flex-row flex-wrap justify-between gap-y-6 pb-10">
                    {category.techniques.map((tech: any) => (
                        <View key={tech.id} style={{ width: '48%' }}>
                            <FeaturedTechniqueCard
                                technique={tech}
                                isFavorite={false} // Would need real favorite logic here
                                onToggleFavorite={() => { }}
                                onPress={() => router.push(`/technique/${tech.id}`)}
                            />
                        </View>
                    ))}
                </View>

                {category.techniques.length === 0 && (
                    <View className="items-center py-10">
                        <Info color="#ccc" size={48} />
                        <Text className="text-gray-400 mt-4 text-center">More techniques coming soon to this category.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
