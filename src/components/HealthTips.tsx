
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Apple, 
  Activity, 
  Brain, 
  Shield, 
  Clock, 
  Utensils, 
  Dumbbell,
  Stethoscope,
  AlertCircle
} from 'lucide-react';

const HealthTips = () => {
  const sections = [
    {
      title: "Understanding Diabetes",
      icon: Brain,
      color: "bg-purple-600",
      content: [
        {
          title: "What is Diabetes?",
          description: "Diabetes is a chronic condition where blood glucose levels are too high due to the body's inability to produce or use insulin effectively.",
          icon: AlertCircle
        },
        {
          title: "Types of Diabetes",
          description: "Type 1: Autoimmune condition. Type 2: Most common, often lifestyle-related. Gestational: Occurs during pregnancy.",
          icon: Stethoscope
        },
        {
          title: "Risk Factors",
          description: "Family history, obesity, sedentary lifestyle, high blood pressure, and age over 45 increase diabetes risk.",
          icon: Shield
        }
      ]
    },
    {
      title: "Prevention Strategies",
      icon: Shield,
      color: "bg-green-600",
      content: [
        {
          title: "Maintain Healthy Weight",
          description: "Even a 5-10% weight loss can significantly reduce diabetes risk. Focus on sustainable weight management.",
          icon: Activity
        },
        {
          title: "Regular Health Screenings",
          description: "Get blood glucose tested annually if you're over 45 or have risk factors. Early detection is key.",
          icon: Clock
        },
        {
          title: "Stress Management",
          description: "Chronic stress can affect blood sugar levels. Practice meditation, yoga, or other stress-reduction techniques.",
          icon: Heart
        }
      ]
    },
    {
      title: "Nutrition Guidelines",
      icon: Apple,
      color: "bg-orange-600",
      content: [
        {
          title: "Balanced Diet",
          description: "Focus on whole foods: vegetables, fruits, lean proteins, whole grains, and healthy fats. Limit processed foods.",
          icon: Utensils
        },
        {
          title: "Portion Control",
          description: "Use the plate method: 1/2 plate vegetables, 1/4 lean protein, 1/4 whole grains. Control portion sizes.",
          icon: Apple
        },
        {
          title: "Limit Sugar & Refined Carbs",
          description: "Reduce sugary drinks, sweets, and refined carbohydrates. Choose complex carbs with fiber.",
          icon: AlertCircle
        }
      ]
    },
    {
      title: "Exercise & Activity",
      icon: Dumbbell,
      color: "bg-blue-600",
      content: [
        {
          title: "Regular Physical Activity",
          description: "Aim for 150 minutes of moderate aerobic activity weekly, plus 2 days of strength training.",
          icon: Activity
        },
        {
          title: "Start Gradually",
          description: "Begin with short walks and gradually increase intensity. Even 10-minute walks after meals help control blood sugar.",
          icon: Clock
        },
        {
          title: "Find Activities You Enjoy",
          description: "Dancing, swimming, cycling, or sports make exercise sustainable. Consistency is more important than intensity.",
          icon: Heart
        }
      ]
    }
  ];

  const quickTips = [
    "Stay hydrated with water throughout the day",
    "Get 7-9 hours of quality sleep each night",
    "Monitor your blood pressure regularly",
    "Quit smoking and limit alcohol consumption",
    "Include fiber-rich foods in every meal",
    "Take regular breaks from sitting",
    "Practice portion control with smaller plates",
    "Keep healthy snacks readily available"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
          Health Education
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Diabetes Prevention & Health Tips
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to understanding, preventing, and managing diabetes through lifestyle modifications
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className={`${section.color} text-white p-6 rounded-t-2xl`}>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <section.icon className="w-8 h-8" />
                {section.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-b-2xl shadow-lg p-6">
              {section.content.map((item, itemIndex) => (
                <Card key={itemIndex} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="mt-12 shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Quick Daily Tips
          </CardTitle>
          <CardDescription className="text-teal-100">
            Simple habits that make a big difference
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg border border-teal-100">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-800 font-medium">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Warning */}
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                When to Seek Medical Attention
              </h3>
              <p className="text-red-700 mb-4">
                Contact your healthcare provider immediately if you experience:
              </p>
              <ul className="text-red-700 space-y-1">
                <li>• Frequent urination and excessive thirst</li>
                <li>• Unexplained weight loss</li>
                <li>• Blurred vision or fatigue</li>
                <li>• Slow-healing wounds</li>
                <li>• Blood glucose readings consistently above 180 mg/dL</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthTips;
