
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileDown, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Activity,
  Heart,
  Stethoscope
} from 'lucide-react';

const PredictionResult = ({ result, patientData, testData }) => {
  const isHighRisk = result.risk === 'HIGH';
  
  const generatePDFReport = () => {
    // In a real app, this would generate and download a PDF
    const reportData = {
      patient: patientData,
      tests: testData,
      prediction: result,
      timestamp: new Date().toISOString()
    };
    
    // Create a simple text report for demo
    const reportContent = `
DIABETES PREDICTION REPORT
=========================

Patient Information:
- Name: ${patientData.name}
- Age: ${patientData.age}
- Gender: ${patientData.gender}
- Email: ${patientData.email}

Medical Test Results:
- Glucose Level: ${testData.glucose} mg/dL
- Blood Pressure: ${testData.bloodPressure} mmHg
- BMI: ${testData.bmi} kg/m²
- Insulin Level: ${testData.insulin} mu U/ml
- HbA1c: ${testData.hba1c}%

Prediction Result:
- Risk Level: ${result.risk}
- Confidence: ${result.confidence}%
- Risk Score: ${result.riskScore}/100

Recommendations:
${result.recommendations.map(rec => `- ${rec}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}

Note: This prediction is for informational purposes only. 
Please consult with a healthcare professional for proper diagnosis.
    `;

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diabetes-report-${patientData.name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Main Result Card */}
      <Card className="shadow-2xl border-0 bg-white mb-8">
        <CardHeader className={`${isHighRisk ? 'bg-gradient-to-r from-red-600 to-orange-600' : 'bg-gradient-to-r from-green-600 to-teal-600'} text-white rounded-t-lg`}>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {isHighRisk ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
            Diabetes Prediction Result
          </CardTitle>
          <CardDescription className={isHighRisk ? 'text-red-100' : 'text-green-100'}>
            AI-powered analysis for {patientData.name}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* Risk Level Display */}
          <div className="text-center mb-8">
            <Badge 
              className={`text-2xl px-6 py-3 mb-4 ${
                isHighRisk 
                  ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {isHighRisk ? 'HIGH RISK' : 'LOW RISK'}
            </Badge>
            <div className="flex items-center justify-center gap-4 text-lg">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Confidence: {result.confidence}%</span>
            </div>
          </div>

          {/* Alert Message */}
          <Alert className={`mb-6 ${isHighRisk ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <AlertDescription className={isHighRisk ? 'text-red-800' : 'text-green-800'}>
              {isHighRisk 
                ? '⚠️ High diabetes risk detected. Please consult with a healthcare professional immediately for proper evaluation and treatment.'
                : '✅ Low diabetes risk detected. Continue maintaining a healthy lifestyle and regular check-ups.'
              }
            </AlertDescription>
          </Alert>

          {/* Risk Score Visualization */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Risk Score</span>
              <span className="font-bold">{result.riskScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  result.riskScore > 70 ? 'bg-red-600' :
                  result.riskScore > 40 ? 'bg-yellow-500' : 'bg-green-600'
                }`}
                style={{ width: `${Math.min(result.riskScore, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Low Risk</span>
              <span>Medium Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="shadow-lg border-0 bg-white mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Summary Card */}
      <Card className="shadow-lg border-0 bg-white mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Test Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Glucose Level</div>
              <div className="text-lg font-semibold">{testData.glucose} mg/dL</div>
              <div className={`text-sm ${testData.glucose > 140 ? 'text-red-600' : 'text-green-600'}`}>
                {testData.glucose > 140 ? 'Above normal' : 'Normal range'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Blood Pressure</div>
              <div className="text-lg font-semibold">{testData.bloodPressure} mmHg</div>
              <div className={`text-sm ${testData.bloodPressure > 80 ? 'text-red-600' : 'text-green-600'}`}>
                {testData.bloodPressure > 80 ? 'Above normal' : 'Normal range'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">BMI</div>
              <div className="text-lg font-semibold">{testData.bmi} kg/m²</div>
              <div className={`text-sm ${testData.bmi > 25 ? 'text-red-600' : 'text-green-600'}`}>
                {testData.bmi > 25 ? 'Overweight' : 'Normal weight'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">HbA1c</div>
              <div className="text-lg font-semibold">{testData.hba1c}%</div>
              <div className={`text-sm ${testData.hba1c > 6.5 ? 'text-red-600' : 'text-green-600'}`}>
                {testData.hba1c > 6.5 ? 'Above normal' : 'Normal range'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Insulin Level</div>
              <div className="text-lg font-semibold">{testData.insulin} mu U/ml</div>
              <div className={`text-sm ${testData.insulin > 30 ? 'text-red-600' : 'text-green-600'}`}>
                {testData.insulin > 30 ? 'Above normal' : 'Normal range'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Cholesterol</div>
              <div className="text-lg font-semibold">{testData.cholesterol} mg/dL</div>
              <div className={`text-sm ${testData.cholesterol > 200 ? 'text-red-600' : 'text-green-600'}`}>
                {testData.cholesterol > 200 ? 'Above normal' : 'Normal range'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={generatePDFReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2"
        >
          <FileDown className="w-5 h-5" />
          Download PDF Report
        </Button>
        
        <Button 
          variant="outline"
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default PredictionResult;
