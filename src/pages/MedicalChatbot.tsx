import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Heart, Activity, Stethoscope, Globe, TrendingUp, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
}

interface RealTimeData {
  globalDiabetesStats: {
    totalCases: number;
    newCasesToday: number;
    deathsToday: number;
    recoveries: number;
  };
  trending: string[];
  emergencyAlerts: string[];
}

const MedicalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Language support
  const languages = {
    english: 'English',
    hindi: 'हिंदी',
    spanish: 'Español', 
    french: 'Français',
    german: 'Deutsch',
    chinese: '中文',
    japanese: '日本語',
    arabic: 'العربية',
    russian: 'Русский',
    portuguese: 'Português',
    italian: 'Italiano',
    korean: '한국어',
    dutch: 'Nederlands',
    swedish: 'Svenska',
    turkish: 'Türkçe'
  };

  // Initial welcome messages in different languages
  const welcomeMessages = {
    english: 'Hello! I am your Medical AI Assistant. I can provide information about diabetes, blood pressure, nutrition, and general health. Ask me anything!',
    hindi: 'नमस्ते! मैं आपका Medical AI Assistant हूँ। मैं diabetes, blood pressure, nutrition, और general health के बारे में जानकारी दे सकता हूँ। आप मुझसे कुछ भी पूछ सकते हैं!',
    spanish: '¡Hola! Soy tu Asistente Médico AI. Puedo proporcionar información sobre diabetes, presión arterial, nutrición y salud general. ¡Pregúntame lo que quieras!',
    french: 'Bonjour! Je suis votre Assistant Médical IA. Je peux fournir des informations sur le diabète, la tension artérielle, la nutrition et la santé générale. Demandez-moi tout!',
    german: 'Hallo! Ich bin Ihr Medizinischer KI-Assistent. Ich kann Informationen über Diabetes, Blutdruck, Ernährung und allgemeine Gesundheit bereitstellen. Fragen Sie mich alles!',
    chinese: '你好！我是您的医疗AI助手。我可以提供关于糖尿病、血压、营养和一般健康的信息。请随时向我提问！',
    japanese: 'こんにちは！私はあなたの医療AIアシスタントです。糖尿病、血圧、栄養、一般的な健康について情報を提供できます。何でもお聞きください！',
    arabic: 'مرحباً! أنا مساعدك الطبي بالذكاء الاصطناعي. يمكنني تقديم معلومات حول السكري وضغط الدم والتغذية والصحة العامة. اسألني أي شيء!',
    russian: 'Привет! Я ваш медицинский ИИ-помощник. Я могу предоставить информацию о диабете, артериальном давлении, питании и общем здоровье. Спрашивайте что угодно!',
    portuguese: 'Olá! Eu sou seu Assistente Médico AI. Posso fornecer informações sobre diabetes, pressão arterial, nutrição e saúde geral. Pergunte-me qualquer coisa!',
    italian: 'Ciao! Sono il tuo Assistente Medico AI. Posso fornire informazioni su diabete, pressione sanguigna, nutrizione e salute generale. Chiedimi tutto!',
    korean: '안녕하세요! 저는 당신의 의료 AI 어시스턴트입니다. 당뇨병, 혈압, 영양 및 일반 건강에 대한 정보를 제공할 수 있습니다. 무엇이든 물어보세요!',
    dutch: 'Hallo! Ik ben je Medische AI-assistent. Ik kan informatie verstrekken over diabetes, bloeddruk, voeding en algemene gezondheid. Vraag me alles!',
    swedish: 'Hej! Jag är din Medicinska AI-assistent. Jag kan ge information om diabetes, blodtryck, kost och allmän hälsa. Fråga mig vad som helst!',
    turkish: 'Merhaba! Ben sizin Tıbbi AI Asistanınızım. Diyabet, kan basıncı, beslenme ve genel sağlık hakkında bilgi verebilirim. Bana her şeyi sorabilirsiniz!'
  };

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: welcomeMessages[selectedLanguage as keyof typeof welcomeMessages],
      sender: 'bot',
      timestamp: new Date(),
      language: selectedLanguage
    };
    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  // Simulate real-time data updates
  useEffect(() => {
    const updateRealTimeData = () => {
      setRealTimeData({
        globalDiabetesStats: {
          totalCases: 537000000 + Math.floor(Math.random() * 1000),
          newCasesToday: 1247 + Math.floor(Math.random() * 100),
          deathsToday: 89 + Math.floor(Math.random() * 20),
          recoveries: 892 + Math.floor(Math.random() * 50)
        },
        trending: [
          'Type 2 Diabetes Prevention',
          'Blood Sugar Monitoring',
          'Insulin Therapy Updates',
          'Diabetic Diet Plans',
          'Exercise for Diabetics'
        ],
        emergencyAlerts: [
          'New research on continuous glucose monitoring',
          'WHO updates diabetes guidelines',
          'Breakthrough in insulin therapy'
        ]
      });
    };

    updateRealTimeData();
    const interval = setInterval(updateRealTimeData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Enhanced medical knowledge base with multi-language support
  const medicalResponses = {
    english: {
      diabetes: [
        '🩺 **Type 1 Diabetes**: Autoimmune condition where pancreas produces little/no insulin. Usually diagnosed in childhood/adolescence. Requires lifelong insulin therapy.',
        '🩺 **Type 2 Diabetes**: Body becomes resistant to insulin or doesn\'t produce enough. Most common type (90-95%). Often linked to lifestyle factors.',
        '🩺 **Gestational Diabetes**: Develops during pregnancy, usually disappears after birth but increases risk of Type 2 later.',
        '🩺 **MODY (Monogenic)**: Rare genetic form affecting 1-2% of diabetics. Caused by single gene mutations.',
        '⚠️ **Symptoms**: Excessive thirst, frequent urination, fatigue, blurred vision, slow healing wounds, unexpected weight loss.',
        '💊 **Management**: Blood sugar monitoring, medication (insulin/oral drugs), healthy diet, regular exercise, stress management.',
        `🌍 **Global Impact**: ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} people worldwide have diabetes. ${realTimeData?.globalDiabetesStats.newCasesToday} new cases diagnosed today.`,
        '🔬 **Complications**: Heart disease, stroke, kidney damage, eye damage, nerve damage, foot problems if uncontrolled.'
      ],
      bloodpressure: [
        'Normal blood pressure is 120/80 mmHg. Above 140/90 mmHg is considered hypertension.',
        'High blood pressure causes: stress, obesity, smoking, alcohol, salt intake, and genetic factors.',
        'To control blood pressure: reduce salt intake, regular exercise, maintain weight, and quit smoking.'
      ],
      nutrition: [
        'Balanced diet should contain all nutrients: carbohydrates, proteins, fats, vitamins, and minerals.',
        'For diabetes patients: complex carbs, fiber-rich foods, lean proteins, and limited sugar intake.',
        'Daily water intake should be 8-10 glasses. Eat more fresh fruits and vegetables.'
      ],
      realtime: [
        `📊 Current global diabetes statistics: ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} total cases`,
        `📈 Today's updates: ${realTimeData?.globalDiabetesStats.newCasesToday} new cases, ${realTimeData?.globalDiabetesStats.recoveries} successful treatments`,
        `🔥 Trending now: ${realTimeData?.trending.join(', ')}`
      ]
    },
    hindi: {
      diabetes: [
        '🩺 **Type 1 Diabetes**: यह autoimmune condition है जहाँ pancreas कम या बिल्कुल insulin नहीं बनाता। आमतौर पर बचपन/किशोरावस्था में होता है। जीवनभर insulin therapy चाहिए।',
        '🩺 **Type 2 Diabetes**: शरीर insulin के प्रति resistant हो जाता है या पर्याप्त insulin नहीं बनाता। सबसे आम type (90-95%)। अक्सर lifestyle factors से जुड़ा होता है।',
        '🩺 **Gestational Diabetes**: गर्भावस्था के दौरान होता है, delivery के बाद ठीक हो जाता है लेकिन बाद में Type 2 का खतरा बढ़ जाता है।',
        '🩺 **MODY (Monogenic)**: दुर्लभ genetic form जो 1-2% diabetics को प्रभावित करता है। Single gene mutations के कारण होता है।',
        '⚠️ **लक्षण**: अधिक प्यास, बार-बार urination, fatigue, blurred vision, slow healing wounds, अचानक weight loss।',
        '💊 **प्रबंधन**: Blood sugar monitoring, दवाएं (insulin/oral drugs), healthy diet, regular exercise, stress management।',
        `🌍 **Global Impact**: दुनिया भर में ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} लोगों को diabetes है। आज ${realTimeData?.globalDiabetesStats.newCasesToday} नए cases मिले हैं।`,
        '🔬 **Complications**: Heart disease, stroke, kidney damage, eye damage, nerve damage, foot problems अगर control न किया जाए।'
      ],
      bloodpressure: [
        'Normal blood pressure 120/80 mmHg होता है। 140/90 mmHg से ऊपर को hypertension कहते हैं।',
        'High blood pressure के कारण: stress, obesity, smoking, alcohol, salt intake, और genetic factors।',
        'Blood pressure control करने के लिए: कम नमक खाएं, regular exercise करें, weight maintain करें।'
      ],
      nutrition: [
        'Balanced diet में सभी nutrients होने चाहिए: carbohydrates, proteins, fats, vitamins, और minerals।',
        'डायबिटीज patients के लिए: complex carbs, fiber-rich foods, lean proteins, और limited sugar लें।',
        'Daily water intake 8-10 glasses होना चाहिए। Fresh fruits और vegetables ज्यादा खाएं।'
      ],
      realtime: [
        `📊 वर्तमान global diabetes statistics: ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} कुल cases`,
        `📈 आज के updates: ${realTimeData?.globalDiabetesStats.newCasesToday} नए cases, ${realTimeData?.globalDiabetesStats.recoveries} सफल treatments`,
        `🔥 अभी trending: ${realTimeData?.trending.join(', ')}`
      ]
    },
    spanish: {
      diabetes: [
        'La diabetes es una condición crónica donde los niveles de azúcar en sangre se elevan. Hay Tipo 1 y Tipo 2 como tipos principales.',
        'Síntomas de diabetes: sed excesiva, micción frecuente, fatiga, visión borrosa y cicatrización lenta.',
        'Para controlar la diabetes: mantener dieta saludable, ejercicio regular, cumplimiento de medicación y monitoreo regular.',
        `🌍 Estadísticas globales en tiempo real: ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} personas tienen diabetes mundialmente.`
      ],
      bloodpressure: [
        'La presión arterial normal es 120/80 mmHg. Por encima de 140/90 mmHg se considera hipertensión.',
        'Causas de presión alta: estrés, obesidad, fumar, alcohol, ingesta de sal y factores genéticos.',
        'Para controlar la presión: reducir sal, ejercicio regular, mantener peso y dejar de fumar.'
      ],
      nutrition: [
        'Una dieta equilibrada debe contener todos los nutrientes: carbohidratos, proteínas, grasas, vitaminas y minerales.',
        'Para pacientes diabéticos: carbohidratos complejos, alimentos ricos en fibra, proteínas magras y azúcar limitado.',
        'La ingesta diaria de agua debe ser de 8-10 vasos. Comer más frutas y verduras frescas.'
      ],
      realtime: [
        `📊 Estadísticas actuales: ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} casos totales`,
        `📈 Actualizaciones de hoy: ${realTimeData?.globalDiabetesStats.newCasesToday} nuevos casos`,
        `🔥 Tendencias: ${realTimeData?.trending.join(', ')}`
      ]
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const currentLangResponses = medicalResponses[selectedLanguage as keyof typeof medicalResponses] || medicalResponses.english;
    
    // Real-time data queries
    if (lowerMessage.includes('realtime') || lowerMessage.includes('current') || lowerMessage.includes('today') || lowerMessage.includes('stats')) {
      return currentLangResponses.realtime?.[Math.floor(Math.random() * (currentLangResponses.realtime?.length || 1))] || 
             `📊 Real-time data: ${realTimeData?.globalDiabetesStats.totalCases.toLocaleString()} global diabetes cases, ${realTimeData?.globalDiabetesStats.newCasesToday} new cases today.`;
    }
    
    // Check for keywords and respond accordingly
    if (lowerMessage.includes('diabetes') || lowerMessage.includes('डायबिटीज') || lowerMessage.includes('sugar') || lowerMessage.includes('diabete')) {
      return currentLangResponses.diabetes?.[Math.floor(Math.random() * (currentLangResponses.diabetes?.length || 1))] || 
             'I can provide information about diabetes. Please specify your question.';
    }
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp') || lowerMessage.includes('हाई ब्लड प्रेशर') || lowerMessage.includes('presión')) {
      return currentLangResponses.bloodpressure?.[Math.floor(Math.random() * (currentLangResponses.bloodpressure?.length || 1))] || 
             'I can provide information about blood pressure. Please specify your question.';
    }
    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition') || lowerMessage.includes('खाना') || lowerMessage.includes('dieta')) {
      return currentLangResponses.nutrition?.[Math.floor(Math.random() * (currentLangResponses.nutrition?.length || 1))] || 
             'I can provide information about nutrition and diet. Please specify your question.';
    }
    
    // Default responses based on language
    const defaultResponses = {
      english: [
        'That\'s a great question! For medical advice, always consult with a qualified doctor. I can provide general information.',
        'Regular check-ups and healthy lifestyle are essential for your health. For specific medical advice, please see a doctor.',
        'I can provide information about diabetes, blood pressure, nutrition, exercise. What topic would you like to know about?',
        'For any health-related concerns, please seek professional medical help. I can give you general guidance.'
      ],
      hindi: [
        'यह एक अच्छा सवाल है! Medical advice के लिए हमेशा qualified doctor से consult करें। मैं general information provide कर सकता हूँ।',
        'आपकी health के लिए regular check-ups और healthy lifestyle बहुत जरूरी है। Specific medical advice के लिए doctor से मिलें।',
        'मैं diabetes, blood pressure, nutrition, exercise के बारे में जानकारी दे सकता हूँ। आप किस topic के बारे में जानना चाहते हैं?',
        'Health-related कोई भी concern हो तो professional medical help लें। मैं आपको general guidance दे सकता हूँ।'
      ],
      spanish: [
        '¡Esa es una gran pregunta! Para consejos médicos, siempre consulte con un doctor calificado. Puedo proporcionar información general.',
        'Los chequeos regulares y el estilo de vida saludable son esenciales para su salud. Para consejos médicos específicos, consulte a un doctor.',
        'Puedo proporcionar información sobre diabetes, presión arterial, nutrición, ejercicio. ¿Sobre qué tema le gustaría saber?'
      ]
    };
    
    const responses = defaultResponses[selectedLanguage as keyof typeof defaultResponses] || defaultResponses.english;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage
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
        timestamp: new Date(),
        language: selectedLanguage
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

  const quickQuestions = {
    english: [
      'What are diabetes symptoms?',
      'How to control blood pressure?',
      'Best diet for diabetics?',
      'Show real-time diabetes stats',
      'Exercise benefits for diabetes'
    ],
    hindi: [
      'डायबिटीज के लक्षण क्या हैं?',
      'Blood pressure कैसे control करें?',
      'डायबिटीज के लिए कौन सा diet लें?',
      'Real-time diabetes stats दिखाएं',
      'Exercise के क्या फायदे हैं?'
    ],
    spanish: [
      '¿Cuáles son los síntomas de diabetes?',
      '¿Cómo controlar la presión arterial?',
      '¿Mejor dieta para diabéticos?',
      'Mostrar estadísticas en tiempo real',
      'Beneficios del ejercicio para diabetes'
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="h-[85vh] flex flex-col shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Bot className="w-6 h-6" />
                Medical AI Assistant
                <Globe className="w-5 h-5" />
              </CardTitle>
              <p className="text-blue-100">Multilingual health advisor with real-time data</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40 bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([code, name]) => (
                    <SelectItem key={code} value={code}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        {/* Real-time Stats Bar */}
        {realTimeData && (
          <div className="bg-gray-50 border-b px-4 py-2">
            <div className="flex items-center gap-6 text-sm">
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Global Cases: {realTimeData.globalDiabetesStats.totalCases.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Today: +{realTimeData.globalDiabetesStats.newCasesToday}
              </Badge>
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Emergency: Real-time monitoring active
              </Badge>
            </div>
          </div>
        )}

        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Chat Messages */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground border'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[75%] border shadow-sm">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 flex-shrink-0" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">
              {selectedLanguage === 'hindi' ? 'Quick Questions:' : 
               selectedLanguage === 'spanish' ? 'Preguntas Rápidas:' :
               'Quick Questions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(quickQuestions[selectedLanguage as keyof typeof quickQuestions] || quickQuestions.english).map((question, index) => (
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
                placeholder={
                  selectedLanguage === 'hindi' ? 'अपना सवाल यहाँ लिखें...' :
                  selectedLanguage === 'spanish' ? 'Escribe tu pregunta aquí...' :
                  selectedLanguage === 'french' ? 'Écrivez votre question ici...' :
                  selectedLanguage === 'german' ? 'Stellen Sie hier Ihre Frage...' :
                  'Type your question here...'
                }
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
              {selectedLanguage === 'hindi' ? 
                '⚠️ यह केवल general information है। Medical emergency में तुरंत doctor से मिलें।' :
                selectedLanguage === 'spanish' ?
                '⚠️ Esta es solo información general. En emergencias médicas, consulte inmediatamente a un doctor.' :
                '⚠️ This is general information only. In medical emergencies, consult a doctor immediately.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalChatbot;