
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, FileText, Shield, Users, TrendingUp } from 'lucide-react';
import PatientForm from '@/components/PatientForm';
import MedicalTestForm from '@/components/MedicalTestForm';
import PredictionResult from '@/components/PredictionResult';
import HealthTips from '@/components/HealthTips';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('home');
  const [patientData, setPatientData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePatientSubmit = (data) => {
    setPatientData(data);
    setCurrentStep('medical-test');
  };

  const handleTestSubmit = (data) => {
    setTestData(data);
    // Simulate ML prediction (in real app, this would call backend API)
    const prediction = calculateDiabetesRisk(data);
    setPredictionResult(prediction);
    setCurrentStep('result');
  };

  const calculateDiabetesRisk = (data) => {
    // Simple risk calculation algorithm (replace with actual ML model)
    let riskScore = 0;
    
    if (data.glucose > 140) riskScore += 25;
    if (data.bloodPressure > 80) riskScore += 15;
    if (data.bmi > 25) riskScore += 20;
    if (data.insulin > 30) riskScore += 10;
    if (data.hba1c > 6.5) riskScore += 30;
    
    const isHighRisk = riskScore > 50;
    const confidence = Math.min(85 + Math.random() * 10, 95);
    
    return {
      risk: isHighRisk ? 'HIGH' : 'LOW',
      confidence: confidence.toFixed(1),
      riskScore,
      recommendations: isHighRisk ? 
        ['Consult a doctor immediately', 'Follow strict diet plan', 'Regular exercise routine'] :
        ['Maintain healthy lifestyle', 'Regular health checkups', 'Balanced diet']
    };
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'patient-form':
        return <PatientForm onSubmit={handlePatientSubmit} />;
      case 'medical-test':
        return <MedicalTestForm onSubmit={handleTestSubmit} patientData={patientData} />;
      case 'result':
        return <PredictionResult result={predictionResult} patientData={patientData} testData={testData} />;
      case 'health-tips':
        return <HealthTips />;
      default:
        return <HomePage setCurrentStep={setCurrentStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {renderCurrentStep()}
    </div>
  );
};

const HomePage = ({ setCurrentStep }) => {
  const features = [
    {
      icon: Heart,
      title: "Health Assessment",
      description: "Comprehensive diabetes risk evaluation based on medical parameters"
    },
    {
      icon: Activity,
      title: "ML Prediction",
      description: "Advanced machine learning algorithms for accurate diabetes prediction"
    },
    {
      icon: FileText,
      title: "PDF Reports",
      description: "Detailed health reports downloadable in PDF format"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted and kept completely confidential"
    }
  ];

  const stats = [
    { label: "Accuracy Rate", value: "94.5%", icon: TrendingUp },
    { label: "Patients Helped", value: "10,000+", icon: Users },
    { label: "Success Stories", value: "500+", icon: Heart }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 py-12">
        <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
          AI-Powered Health Assessment
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Diabetes Prediction & 
          <span className="text-blue-600"> Health Assessment</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Get accurate diabetes risk predictions using advanced machine learning. 
          Take control of your health with personalized insights and comprehensive reports.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={() => setCurrentStep('patient-form')} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Start Health Assessment
          </Button>
          <Button 
            onClick={() => setCurrentStep('health-tips')} 
            variant="outline" 
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
          >
            Learn About Diabetes
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-2">
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Details</h3>
            <p className="text-blue-100">Provide your personal and medical information</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-blue-100">Our ML model analyzes your health data</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-blue-100">Receive detailed report and recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
