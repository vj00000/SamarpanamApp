import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Share2, Bookmark, Clock, Calendar, User, Quote } from 'lucide-react-native';
import { blogDetails } from '../../constants/data';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function BlogDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const blog = blogDetails[id as string];
    const [isSaved, setIsSaved] = useState(false);

    if (!blog) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-gray-500 text-lg">Article not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4">
                    <Text className="text-[#8B9467] font-bold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this article: ${blog.title}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const renderContent = (content: any[]) => {
        return content.map((block, index) => {
            switch (block.type) {
                case 'paragraph':
                    return (
                        <Text key={index} className="text-gray-700 text-lg leading-8 mb-6 font-body">
                            {block.text}
                        </Text>
                    );
                case 'heading':
                    return (
                        <Text key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4 font-heading">
                            {block.text}
                        </Text>
                    );
                case 'list':
                    return (
                        <View key={index} className="mb-6 pl-2">
                            {block.items.map((item: string, i: number) => (
                                <View key={i} className="flex-row mb-3">
                                    <View className="w-2 h-2 rounded-full bg-[#8B9467] mt-2.5 mr-3" />
                                    <Text className="text-gray-700 text-lg leading-7 flex-1">{item}</Text>
                                </View>
                            ))}
                        </View>
                    );
                case 'quote':
                    return (
                        <View key={index} className="bg-[#f0f7f0] p-6 rounded-xl border-l-4 border-[#8B9467] mb-8 my-4">
                            <Quote size={24} color="#8B9467" className="mb-2 opacity-50" />
                            <Text className="text-[#2c3e2c] text-xl font-medium italic leading-8">
                                {block.text}
                            </Text>
                        </View>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header Image */}
            <View className="h-80 w-full relative">
                <Image
                    source={{ uri: blog.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    className="absolute bottom-0 left-0 right-0 h-40"
                />

                {/* Navigation Bar */}
                <View className="absolute top-12 left-0 right-0 flex-row justify-between items-center px-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full items-center justify-center"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={handleShare}
                            className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full items-center justify-center"
                        >
                            <Share2 color="white" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsSaved(!isSaved)}
                            className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full items-center justify-center"
                        >
                            <Bookmark
                                color="white"
                                fill={isSaved ? "white" : "none"}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Content Container - Overlapping the image */}
            <ScrollView
                className="flex-1 bg-white -mt-10 rounded-t-3xl px-6 pt-8"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Meta Tags */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag: string, index: number) => (
                        <View key={index} className="bg-[#f0f7f0] px-3 py-1 rounded-full">
                            <Text className="text-[#8B9467] text-xs font-bold uppercase tracking-wider">{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Title */}
                <Text className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </Text>

                {/* Author & Stats Row */}
                <View className="flex-row items-center justify-between border-b border-gray-100 pb-6 mb-6">
                    <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
                            <User size={20} color="#666" />
                        </View>
                        <View>
                            <Text className="font-bold text-gray-800 text-sm">{blog.author}</Text>
                            <Text className="text-gray-500 text-xs text-left">Author</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-4">
                        <View className="flex-row items-center">
                            <Calendar size={14} color="#999" className="mr-1" />
                            <Text className="text-gray-500 text-xs font-medium">{blog.date}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Clock size={14} color="#999" className="mr-1" />
                            <Text className="text-gray-500 text-xs font-medium">{blog.readTime}</Text>
                        </View>
                    </View>
                </View>

                {/* Article Content */}
                <View>
                    {renderContent(blog.content)}
                </View>

                {/* Conclusion / End Marker */}
                <View className="items-center mt-10 mb-6">
                    <View className="w-16 h-1 bg-gray-200 rounded-full" />
                    <Text className="text-gray-400 text-sm mt-3 italic">End of article</Text>
                </View>

                {/* Related CTA */}
                <TouchableOpacity className="bg-[#8B9467] p-4 rounded-xl items-center flex-row justify-center mt-4 shadow-sm active:opacity-90">
                    <Text className="text-white font-bold text-lg mr-2">Explore Related Practices</Text>
                    <ChevronLeft color="white" size={20} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
