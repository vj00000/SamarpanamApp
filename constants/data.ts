
// Mock data for the app

export const categories = [
    { id: '1', title: 'Pranayama', icon: '🧘', color: '#8B9467' },
    { id: '2', title: 'Asanas', icon: '🧘‍♂️', color: '#C9E4CA' },
    { id: '3', title: 'Meditation', icon: '🕉️', color: '#6495ED' },
    { id: '4', title: 'Aahar', icon: '🍎', color: '#FFB6C1' },
];

export const featuredTechniques = [
    {
        id: '1',
        title: 'Anulom Vilom',
        duration: '10 min',
        level: 'Beginner',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
        isFavorite: true
    },
    {
        id: '2',
        title: 'Kapalbhati',
        duration: '15 min',
        level: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1635978792499-1065ae7e1f05?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWVkaXRhdGlvbiUyMG1pbmRmdWxuZXNzJTIwc3Bpcml0dWFsJTIwYXdha2VuaW5nfGVufDB8fDB8fHww',
        isFavorite: false
    },
    {
        id: '3',
        title: 'Bhramari',
        duration: '8 min',
        level: 'Beginner',
        image: 'https://images.unsplash.com/photo-1604480133435-25b86862d276?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGVhbHRoeSUyMGxpZmVzdHlsZSUyMHdpdGglMjBneW0lMjBmaXRuZXNzJTJDJTIwd2VsbG5lc3MlMjBkaWV0JTIwYW5kJTIweW9nYSUyMGV4ZXJjaXNlLnxlbnwwfHwwfHx8MA%3D%3D',
        isFavorite: true
    },
];

export const recentProgress = [
    { date: 'Today', technique: 'Anulom Vilom', duration: '10 min', streak: 5 },
    { date: 'Yesterday', technique: 'Kapalbhati', duration: '15 min', streak: 4 },
    { date: '2 days ago', technique: 'Bhramari', duration: '8 min', streak: 3 },
];

export const blogPosts = [
    {
        id: '1',
        title: 'Benefits of Morning Pranayama',
        excerpt: 'Discover how starting your day with breathing exercises can transform your energy levels...',
        image: 'https://images.unsplash.com/photo-1636714455535-7cb8e8b34790?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJvbWF0aGVyYXB5fGVufDB8fDB8fHww',
        readTime: '5 min read'
    },
    {
        id: '2',
        title: 'Ayurvedic Diet for Yogis',
        excerpt: 'Learn which foods complement your yoga practice and enhance your overall well-being...',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
        readTime: '8 min read'
    },
];

// Food recommendations data
export const foodRecommendations = {
    dosha: 'Vata-Pitta',
    season: 'Autumn (Vata Season)',
    dailyMenu: [
        {
            time: 'Morning (6:00 AM - 9:00 AM)',
            suggestion: 'Warm Lemon & Honey Water',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=300&fit=crop',
            description: 'Starts digestion and cleanses the system.',
            calories: '30 kcal',
            tags: ['Detox', 'Hydration']
        },
        {
            time: 'Breakfast (8:00 AM - 9:30 AM)',
            suggestion: 'Warm Oatmeal with Dates & Almonds',
            image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&h=300&fit=crop',
            description: 'Grounding food with natural sweetness.',
            calories: '320 kcal',
            tags: ['Sattvic', 'Grounding']
        },
        {
            time: 'Lunch (12:00 PM - 1:30 PM)',
            suggestion: 'Kitchari (Rice & Lentil Stew)',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?w=500&h=300&fit=crop',
            description: 'Easy to digest complete protein.',
            calories: '450 kcal',
            tags: ['Tridoshic', 'Protein']
        },
        {
            time: 'Dinner (6:30 PM - 7:30 PM)',
            suggestion: 'Steamed Vegetables & Pumpkin Soup',
            image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2b?w=500&h=300&fit=crop',
            description: 'Light evening meal for better sleep.',
            calories: '280 kcal',
            tags: ['Light', 'Warm']
        }
    ],
    avoid: ['Ice cold water', 'Raw salads at dinner', 'Processed sugar']
};

// Dictionary of full technique details
export const techniques: Record<string, any> = {
    '1': {
        id: '1',
        title: 'Anulom Vilom',
        subtitle: 'Alternate Nostril Breathing',
        difficulty: 'Beginner',
        duration: '10 minutes',
        image: 'https://images.unsplash.com/photo-1745794524727-5a6b4a8cc4a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNwYSUyMHJlbGF4YXRpb24lMjB0cmVhdG1lbnR8ZW58MHx8MHx8fDA%3D',
        description: 'A calming breathing technique that balances the left and right hemispheres of the brain, promoting mental clarity and relaxation.',
        steps: [
            'Sit comfortably with spine straight and shoulders relaxed',
            'Place your right hand in Vishnu Mudra (index and middle fingers folded)',
            'Close your right nostril with your thumb',
            'Inhale slowly and deeply through your left nostril',
            'Close your left nostril with your ring finger',
            'Release your thumb and exhale through your right nostril',
            'Inhale through your right nostril',
            'Close your right nostril again and exhale through your left nostril',
            'This completes one round. Continue for 5-10 minutes'
        ],
        benefits: [
            'Balances the nervous system',
            'Reduces anxiety and stress',
            'Improves concentration',
            'Cleanses energy channels'
        ],
        precautions: [
            'Avoid if you have a cold or blocked nose',
            'Do not practice immediately after eating',
            'Consult a doctor if you have respiratory issues'
        ]
    },
    '2': {
        id: '2',
        title: 'Kapalbhati',
        subtitle: 'Skull Shining Breath',
        difficulty: 'Intermediate',
        duration: '15 minutes',
        image: 'https://images.unsplash.com/photo-1635978792499-1065ae7e1f05?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWVkaXRhdGlvbiUyMG1pbmRmdWxuZXNzJTIwc3Bpcml0dWFsJTIwYXdha2VuaW5nfGVufDB8fDB8fHww',
        description: 'A vigorous breathing exercise that cleanses the frontal lobe, generates internal heat, and improves digestion.',
        steps: [
            'Sit in a comfortable posture with a straight spine.',
            'Place your hands on your knees, palms facing up.',
            'Take a deep inhalation.',
            'Exhale forcefully through the nose, pulling your navel in towards the spine.',
            'Inhalation happens automatically as you relax the stomach muscles.',
            'Continue for 20-30 strokes (one round). Do 3 rounds.'
        ],
        benefits: [
            'Increases metabolic rate',
            'Improves digestion and circulation',
            'Energizes the mind',
            'Strengthens abdominal muscles'
        ],
        precautions: [
            'Avoid if pregnant or have high blood pressure',
            'Do not practice on a full stomach',
            'Stop if you feel dizzy'
        ]
    },
    '3': {
        id: '3',
        title: 'Bhramari',
        subtitle: 'Humming Bee Breath',
        difficulty: 'Beginner',
        duration: '8 minutes',
        image: 'https://images.unsplash.com/photo-1604480133435-25b86862d276?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGVhbHRoeSUyMGxpZmVzdHlsZSUyMHdpdGglMjBneW0lMjBmaXRuZXNzJTJDJTIwd2VsbG5lc3MlMjBkaWV0JTIwYW5kJTIweW9nYSUyMGV4ZXJjaXNlLnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'A soothing breathing practice that calms the mind and reduces agitation, anger, and anxiety.',
        steps: [
            'Sit comfortably and close your eyes.',
            'Place your index fingers on your ears (cartilage).',
            'Inhale deeply through the nose.',
            'Exhale slowly while making a humming sound like a bee (Mmmmmm).',
            'Focus on the vibration in your head.',
            'Repeat for 5-10 minutes.'
        ],
        benefits: [
            'Relieves stress and cerebral tension',
            'Helps in mitigating migraines',
            'Improves concentration and memory',
            'Lowers blood pressure'
        ],
        precautions: [
            'Do not practice lying down',
            'Avoid if you have an ear infection',
            'Practice gently without straining'
        ]
    }
};

// Full blog post details
export const blogDetails: Record<string, any> = {
    '1': {
        id: '1',
        title: 'Benefits of Morning Pranayama',
        author: 'Dr. Aditi Sharma',
        date: 'Oct 15, 2023',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1636714455535-7cb8e8b34790?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJvbWF0aGVyYXB5fGVufDB8fDB8fHww',
        tags: ['Pranayama', 'Morning Routine', 'Wellness'],
        content: [
            {
                type: 'paragraph',
                text: 'Starting your day with Pranayama (breathing exercises) sets a positive tone for the entire day. Unlike coffee which gives you a temporary caffeine spike, pranayama provides sustained energy by oxygenating your blood and calming your nervous system.'
            },
            {
                type: 'heading',
                text: 'Why Morning is Best?'
            },
            {
                type: 'paragraph',
                text: 'In Ayurveda, the time before sunrise (Brahma Muhurta) is considered the most auspicious time for spiritual practices. The air is fresh, rich in oxygen (prana), and the mind is naturally calmer than at any other time of day.'
            },
            {
                type: 'heading',
                text: 'Top 3 Morning Practices'
            },
            {
                type: 'list',
                items: [
                    'Kapalbhati: To wake up the body and digestion.',
                    'Nadi Shodhana: To balance the mind for the day ahead.',
                    'Bhastrika: For a quick boost of energy if you feel sluggish.'
                ]
            },
            {
                type: 'quote',
                text: '"Breath is the bridge which connects life to consciousness, which unites your body to your thoughts."'
            }
        ]
    },
    '2': {
        id: '2',
        title: 'Ayurvedic Diet for Yogis',
        author: 'Chef Rajesh Kumar',
        date: 'Nov 02, 2023',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
        tags: ['Diet', 'Ayurveda', 'Sattvic'],
        content: [
            {
                type: 'paragraph',
                text: 'A Sattvic diet is essential for any serious yoga practitioner. It keeps the body light, the mind clear, and the spirit high. But what exactly does it entail?'
            },
            {
                type: 'heading',
                text: 'The 3 Gunas'
            },
            {
                type: 'paragraph',
                text: 'Food is categorized into three types based on the effect it has on the body and mind: Sattvic (pure), Rajasic (stimulating), and Tamasic (dull). Yogis aim to consume primarily Sattvic foods.'
            },
            {
                type: 'list',
                items: [
                    'Sattvic: Fresh fruits, vegetables, whole grains, nuts, seeds, milk.',
                    'Rajasic: Spicy foods, caffeine, refined sugars, chocolate.',
                    'Tamasic: Processed foods, meat, alcohol, stale food.'
                ]
            },
            {
                type: 'paragraph',
                text: 'By shifting your diet towards more fresh, plant-based, and lightly cooked meals, you can enhance your flexibility and meditation practice.'
            }
        ]
    }
};
