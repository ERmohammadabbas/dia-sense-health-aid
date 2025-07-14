import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Heart, Activity, Stethoscope } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const MedicalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं आपका Medical AI Assistant हूँ। मैं diabetes, blood pressure, nutrition, और general health के बारे में जानकारी दे सकता हूँ। आप मुझसे कुछ भी पूछ सकते हैं!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Medical knowledge base
  const medicalResponses = {
    diabetes: [
      'डायबिटीज एक chronic condition है जिसमें blood sugar levels बढ़ जाते हैं। Type 1 और Type 2 दो मुख्य प्रकार हैं।',
      'डायबिटीज के symptoms: अधिक प्यास लगना, बार-बार urination, fatigue, blurred vision, और slow healing wounds।',
      'डायबिटीज control करने के लिए: healthy diet, regular exercise, medication compliance, और regular monitoring जरूरी है।'
    ],
    bloodpressure: [
      'Normal blood pressure 120/80 mmHg होता है। 140/90 mmHg से ऊपर को hypertension कहते हैं।',
      'High blood pressure के कारण: stress, obesity, smoking, alcohol, salt intake, और genetic factors।',
      'Blood pressure control करने के लिए: कम नमक खाएं, regular exercise करें, weight maintain करें, और smoking छोड़ें।'
    ],
    nutrition: [
      'Balanced diet में सभी nutrients होने चाहिए: carbohydrates, proteins, fats, vitamins, और minerals।',
      'डायबिटीज patients के लिए: complex carbs, fiber-rich foods, lean proteins, और limited sugar लें।',
      'Daily water intake 8-10 glasses होना चाहिए। Fresh fruits और vegetables ज्यादा खाएं।'
    ],
    exercise: [
      'Regular exercise से diabetes control होता है और insulin sensitivity बढ़ती है।',
      'Recommended exercise: 150 minutes moderate activity per week, जैसे walking, swimming, cycling।',
      'Exercise के benefits: weight control, better mood, strong bones, और improved cardiovascular health।'
    ],
    symptoms: [
      'Common diabetes symptoms: excessive thirst, frequent urination, unexplained weight loss, fatigue।',
      'Emergency symptoms: very high/low blood sugar, ketoacidosis, severe dehydration - तुरंत doctor से मिलें।',
      'Regular check-ups जरूरी हैं: HbA1c, fasting glucose, blood pressure, और cholesterol levels।'
    ],
    medication: [
      'Diabetes medications: Metformin, Insulin, Sulfonylureas - doctor की advice के बिना कोई change न करें।',
      'Medicine timing बहुत important है। कभी भी dose miss न करें।',
      'Side effects महसूस हों तो तुरंत doctor को inform करें।'
    ],
    diet: [
      'Diabetes-friendly foods: whole grains, vegetables, lean proteins, nuts, seeds।',
      'Avoid करें: sugary drinks, processed foods, white bread, fried foods, sweets।',
      'Portion control जरूरी है। छोटे-छोटे meals लें throughout the day।'
    ],
    complications: [
      'Diabetes complications: heart disease, kidney problems, eye damage, nerve damage।',
      'Prevention के लिए: blood sugar control, regular check-ups, healthy lifestyle maintain करें।',
      'Early detection और treatment से complications को prevent किया जा सकता है।'
    ]
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords and respond accordingly
    if (lowerMessage.includes('diabetes') || lowerMessage.includes('डायबिटीज') || lowerMessage.includes('sugar')) {
      return medicalResponses.diabetes[Math.floor(Math.random() * medicalResponses.diabetes.length)];
    }
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp') || lowerMessage.includes('हाई ब्लड प्रेशर')) {
      return medicalResponses.bloodpressure[Math.floor(Math.random() * medicalResponses.bloodpressure.length)];
    }
    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition') || lowerMessage.includes('खाना')) {
      return medicalResponses.nutrition[Math.floor(Math.random() * medicalResponses.nutrition.length)];
    }
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('एक्सरसाइज')) {
      return medicalResponses.exercise[Math.floor(Math.random() * medicalResponses.exercise.length)];
    }
    if (lowerMessage.includes('symptom') || lowerMessage.includes('लक्षण') || lowerMessage.includes('signs')) {
      return medicalResponses.symptoms[Math.floor(Math.random() * medicalResponses.symptoms.length)];
    }
    if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('दवा')) {
      return medicalResponses.medication[Math.floor(Math.random() * medicalResponses.medication.length)];
    }
    if (lowerMessage.includes('complication') || lowerMessage.includes('जटिलता') || lowerMessage.includes('problem')) {
      return medicalResponses.complications[Math.floor(Math.random() * medicalResponses.complications.length)];
    }
    
    // Default responses for general queries
    const defaultResponses = [
      'यह एक अच्छा सवाल है! Medical advice के लिए हमेशा qualified doctor से consult करें। मैं general information provide कर सकता हूँ।',
      'आपकी health के लिए regular check-ups और healthy lifestyle बहुत जरूरी है। Specific medical advice के लिए doctor से मिलें।',
      'मैं diabetes, blood pressure, nutrition, exercise के बारे में जानकारी दे सकता हूँ। आप किस topic के बारे में जानना चाहते हैं?',
      'Health-related कोई भी concern हो तो professional medical help लें। मैं आपको general guidance दे सकता हूँ।'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const quickQuestions = [
    'डायबिटीज के लक्षण क्या हैं?',
    'Blood pressure कैसे control करें?',
    'डायबिटीज के लिए कौन सा diet लें?',
    'Exercise के क्या फायदे हैं?',
    'दवा कब लेनी चाहिए?'
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="h-[80vh] flex flex-col shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Medical AI Assistant
          </CardTitle>
          <p className="text-blue-100">आपका personal health advisor</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('hi-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="अपना सवाल यहाँ लिखें..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Medical Icons */}
            <div className="flex justify-center gap-4 mt-3 text-gray-400">
              <Heart className="w-4 h-4" />
              <Activity className="w-4 h-4" />
              <Stethoscope className="w-4 h-4" />
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-2">
              ⚠️ यह केवल general information है। Medical emergency में तुरंत doctor से मिलें।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalChatbot;