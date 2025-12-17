import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, TrendingUp, Calendar, Clock, Activity, Zap } from 'lucide-react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { recentProgress, weeklyStats, monthlyStats } from '../constants/data';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
    const router = useRouter();
    const [timeRange, setTimeRange] = useState<'Weekly' | 'Monthly'>('Weekly');

    const chartData = timeRange === 'Weekly' ? weeklyStats : monthlyStats;

    // Transform data for gifted-charts
    const barData = chartData.map(item => ({
        value: item.value,
        label: item.label,
        frontColor: '#8B9467',
        topLabelComponent: () => (
            <Text className="text-gray-500 text-[10px] mb-1">{item.value}</Text>
        ),
    }));

    const pieData = [
        { value: 40, color: '#8B9467', text: '40%' },
        { value: 30, color: '#FFB6C1', text: '30%' },
        { value: 30, color: '#6495ED', text: '30%' },
    ];

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white pt-12 pb-6 px-4 shadow-sm z-10">
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-gray-100 p-2 rounded-full"
                    >
                        <ChevronLeft color="#333" size={24} />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-gray-800">Your Analytics</Text>
                    <View className="w-10" />
                </View>

                {/* Quick Stats Row */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
                    <View className="bg-orange-50 p-4 rounded-xl mr-3 w-32 border border-orange-100">
                        <View className="flex-row items-center mb-2">
                            <Zap color="orange" size={16} />
                            <Text className="text-orange-600 font-bold ml-1 text-xs">STREAK</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-800">5 Days</Text>
                    </View>

                    <View className="bg-blue-50 p-4 rounded-xl mr-3 w-32 border border-blue-100">
                        <View className="flex-row items-center mb-2">
                            <Clock color="#6495ED" size={16} />
                            <Text className="text-blue-600 font-bold ml-1 text-xs">TOTAL TIME</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-800">2h 15m</Text>
                    </View>

                    <View className="bg-green-50 p-4 rounded-xl mr-3 w-32 border border-green-100">
                        <View className="flex-row items-center mb-2">
                            <Activity color="#8B9467" size={16} />
                            <Text className="text-green-600 font-bold ml-1 text-xs">SESSIONS</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-800">12</Text>
                    </View>
                </ScrollView>
            </View>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>

                {/* Activity Chart Section */}
                <View className="bg-white rounded-2xl shadow-sm p-5 mb-6">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-bold text-gray-800">Activity Overview</Text>
                        <View className="flex-row bg-gray-100 rounded-lg p-1">
                            {['Weekly', 'Monthly'].map((range) => (
                                <TouchableOpacity
                                    key={range}
                                    onPress={() => {
                                        if (range === 'Monthly') return; // Temporarily disabled
                                        setTimeRange(range as 'Weekly' | 'Monthly');
                                    }}
                                    className={`px-3 py-1 rounded-md ${timeRange === range ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <Text className={`text-xs font-medium ${timeRange === range ? 'text-gray-800' : 'text-gray-500'}`}>
                                        {range}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="items-center">
                        <BarChart
                            data={barData}
                            barWidth={22}
                            spacing={20}
                            roundedTop
                            roundedBottom
                            hideRules
                            xAxisLabelTextStyle={{ color: 'gray', fontSize: 10 }}
                            yAxisTextStyle={{ color: 'gray', fontSize: 10 }}
                            noOfSections={4}
                            maxValue={timeRange === 'Weekly' ? 100 : 300}
                            height={200}
                            width={width * 0.75}
                            isAnimated
                        />
                    </View>
                </View>

                {/* Practice Distribution */}
                <View className="bg-white rounded-2xl shadow-sm p-5 mb-6">
                    <Text className="text-lg font-bold text-gray-800 mb-6">Practice Breakdown</Text>
                    <View className="flex-row items-center justify-around">
                        <PieChart
                            data={pieData}
                            donut
                            showText
                            textColor="black"
                            radius={80}
                            innerRadius={50}
                            textSize={12}
                            focusOnPress
                        />
                        <View className="gap-3">
                            <View className="flex-row items-center">
                                <View className="w-3 h-3 rounded-full bg-[#8B9467] mr-2" />
                                <Text className="text-gray-600 text-sm">Pranayama</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-3 h-3 rounded-full bg-[#FFB6C1] mr-2" />
                                <Text className="text-gray-600 text-sm">Meditation</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-3 h-3 rounded-full bg-[#6495ED] mr-2" />
                                <Text className="text-gray-600 text-sm">Asanas</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Recent History */}
                <View className="bg-white rounded-2xl shadow-sm p-5 mb-8">
                    <Text className="text-lg font-bold text-gray-800 mb-4">Recent History</Text>
                    {recentProgress.map((item, index) => (
                        <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-0">
                            <View className="flex-row items-center">
                                <View className="bg-green-50 p-2 rounded-full mr-3">
                                    <TrendingUp color="#8B9467" size={16} />
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-800">{item.technique}</Text>
                                    <Text className="text-gray-500 text-xs">{item.date}</Text>
                                </View>
                            </View>
                            <View className="bg-gray-50 px-3 py-1 rounded-full">
                                <Text className="text-gray-600 font-medium text-xs">{item.duration}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
