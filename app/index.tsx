import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Heart, Play, BookOpen, Apple, TrendingUp, User, Search, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

// Enable className support for LinearGradient
cssInterop(LinearGradient, {
    className: 'style',
});

import { categories, featuredTechniques, recentProgress, blogPosts } from '../constants/data';
import { FeaturedTechniqueCard } from '../components/FeaturedTechniqueCard';
import { CategoryCard } from '../components/CategoryCard';

const { width } = Dimensions.get('window');









export default function HomeScreen() {
    const [favorites, setFavorites] = useState<string[]>(['1', '3']);
    const router = useRouter();

    const toggleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <LinearGradient
                colors={['#8B9467', '#6495ED']}
                className="px-4 pt-12 pb-6 rounded-b-3xl"
            >
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-white text-2xl font-bold">Namaste,</Text>
                        <Text className="text-white text-lg">Welcome back!</Text>
                    </View>
                    <View className="flex-row gap-4">
                        <TouchableOpacity className="p-2 bg-white/20 rounded-full">
                            <Bell color="white" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 bg-white/20 rounded-full">
                            <User color="white" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-white/20 rounded-xl p-3 flex-row items-center">
                    <Search color="white" size={20} className="mr-2" />
                    <Text className="text-white/80 flex-1">Search techniques, blogs, recipes...</Text>
                </View>
            </LinearGradient>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                {/* Categories */}
                <View className="mb-6">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Explore Practices</Text>
                    <View className="flex-row justify-between">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onPress={() => router.push(`/category/${category.id}`)}
                            />
                        ))}
                    </View>
                </View>

                {/* Featured Techniques */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-gray-800">Featured Techniques</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-500">See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-64">
                        <View className="flex-row gap-4">
                            {featuredTechniques.map((technique) => (
                                <View key={technique.id} className="w-64">
                                    <FeaturedTechniqueCard
                                        technique={technique}
                                        isFavorite={favorites.includes(technique.id)}
                                        onToggleFavorite={() => toggleFavorite(technique.id)}
                                        onPress={() => router.push(`/technique/${technique.id}`)}
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Progress Tracking */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-gray-800">Your Progress</Text>
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => router.push('/progress')}
                        >
                            <TrendingUp color="#8B9467" size={16} className="mr-1" />
                            <Text className="text-[#8B9467] font-medium">View Stats</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-2xl shadow-sm p-4">
                        <View className="flex-row justify-between mb-4">
                            <View>
                                <Text className="text-gray-500">Current Streak</Text>
                                <Text className="text-2xl font-bold text-[#8B9467]">5 days</Text>
                            </View>
                            <View>
                                <Text className="text-gray-500">Total Time</Text>
                                <Text className="text-2xl font-bold text-[#8B9467]">2h 15m</Text>
                            </View>
                        </View>

                        <Text className="font-bold text-gray-800 mb-2">Recent Practices</Text>
                        {recentProgress.map((item, index) => (
                            <View key={index} className="flex-row justify-between py-2 border-b border-gray-100">
                                <Text className="text-gray-600">{item.date}</Text>
                                <Text className="text-gray-800">{item.technique}</Text>
                                <Text className="text-gray-500">{item.duration}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Blogs & Recipes */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-gray-800">Wellness Resources</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-500">See all</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="gap-4">
                        {blogPosts.map((post) => (
                            <TouchableOpacity
                                key={post.id}
                                className="bg-white rounded-2xl shadow-sm flex-row overflow-hidden"
                                onPress={() => router.push(`/blog/${post.id}` as any)}
                            >
                                <Image
                                    source={{ uri: post.image }}
                                    className="w-24 h-24"
                                    resizeMode="cover"
                                />
                                <View className="flex-1 p-3 justify-between">
                                    <View>
                                        <Text className="font-bold text-gray-800">{post.title}</Text>
                                        <Text className="text-gray-500 text-sm mt-1">{post.excerpt}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center mt-2">
                                        <Text className="text-blue-500 text-sm">{post.readTime}</Text>
                                        <TouchableOpacity className="flex-row items-center">
                                            <BookOpen color="#8B9467" size={16} className="mr-1" />
                                            <Text className="text-[#8B9467] text-sm">Read</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Food Recommendations */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-gray-800">Ayurvedic Recommendations</Text>
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => router.push('/food-recommendations')}
                        >
                            <Apple color="#FF6B6B" size={16} className="mr-1" />
                            <Text className="text-red-400 font-medium">View Menu</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-2xl shadow-sm p-4">
                        <Text className="font-bold text-gray-800 mb-2">Today's Suggestions</Text>
                        <View className="flex-row gap-2">
                            <View className="bg-[#C9E4CA]/30 rounded-xl p-3 flex-1">
                                <Text className="font-medium text-gray-700">Morning</Text>
                                <Text className="text-sm text-gray-500">Warm lemon water</Text>
                            </View>
                            <View className="bg-[#6495ED]/30 rounded-xl p-3 flex-1">
                                <Text className="font-medium text-gray-700">Lunch</Text>
                                <Text className="text-sm text-gray-500">Quinoa salad</Text>
                            </View>
                            <View className="bg-[#FFB6C1]/30 rounded-xl p-3 flex-1">
                                <Text className="font-medium text-gray-700">Evening</Text>
                                <Text className="text-sm text-gray-500">Herbal tea</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}