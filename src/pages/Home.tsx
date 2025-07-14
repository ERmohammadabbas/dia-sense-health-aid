import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Users, Bot, ArrowRight, TrendingUp, Award, Star } from 'lucide-react';
import StatCard from '@/components/StatCard';

const Home = () => {
  const features = [
    {
      icon: Activity,
      title: "AI-Powered Prediction",
      description: "Advanced machine learning algorithms analyze your medical data for accurate diabetes risk assessment."
    },
    {
      icon: Bot,
      title: "Medical AI Assistant",
      description: "24/7 AI chatbot to answer your medical queries and provide health guidance."
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Connect with certified diabetologists and get professional medical consultation."
    },
    {
      icon: Heart,
      title: "Comprehensive Care",
      description: "Complete health monitoring with personalized recommendations and follow-up care."
    }
  ];

  const stats = [
    { value: 94.5, numericValue: 94.5, label: "Accuracy Rate", suffix: "%", icon: TrendingUp },
    { value: 10000, numericValue: 10000, label: "Patients Helped", suffix: "+", icon: Users },
    { value: 500, numericValue: 500, label: "Success Stories", suffix: "+", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered <span className="text-blue-600">Diabetes</span> Prediction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get accurate diabetes risk assessment using advanced AI technology and connect with expert doctors for professional care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/'}
            >
              Start Prediction <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              onClick={() => window.location.href = '/chatbot'}
            >
              Chat with AI Assistant <Bot className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value.toString()}
              numericValue={stat.numericValue}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your Information",
                description: "Provide your personal and medical test data"
              },
              {
                step: "2", 
                title: "AI Analysis",
                description: "Our advanced AI analyzes your data for diabetes risk"
              },
              {
                step: "3",
                title: "Get Results & Care",
                description: "Receive your prediction, recommendations, and doctor consultation"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Check Your Diabetes Risk?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health with our AI-powered prediction system and expert medical guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => window.location.href = '/'}
            >
              Start Free Assessment
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              onClick={() => window.location.href = '/chatbot'}
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;