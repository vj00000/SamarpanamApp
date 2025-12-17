import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CategoryCardProps {
    category: {
        id: string;
        icon: string;
        title: string;
    };
    onPress?: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="items-center bg-white p-4 rounded-xl shadow-sm w-[22%]"
        >
            <Text className="text-2xl mb-2">{category.icon}</Text>
            <Text className="text-gray-700 font-medium text-center text-sm">{category.title}</Text>
        </TouchableOpacity>
    );
}
