
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TestTube, Activity, Heart, Scale, Droplets } from 'lucide-react';

const MedicalTestForm = ({ onSubmit, patientData }) => {
  const [formData, setFormData] = useState({
    glucose: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    cholesterol: '',
    heartRate: '',
    hba1c: '',
    physicalActivity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert string values to numbers
    const processedData = {
      ...formData,
      glucose: parseFloat(formData.glucose),
      bloodPressure: parseFloat(formData.bloodPressureSystolic),
      skinThickness: parseFloat(formData.skinThickness),
      insulin: parseFloat(formData.insulin),
      bmi: parseFloat(formData.bmi),
      diabetesPedigree: parseFloat(formData.diabetesPedigree),
      cholesterol: parseFloat(formData.cholesterol),
      heartRate: parseFloat(formData.heartRate),
      hba1c: parseFloat(formData.hba1c),
      physicalActivity: parseFloat(formData.physicalActivity)
    };
    onSubmit(processedData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const testSections = [
    {
      title: "Blood Tests",
      icon: Droplets,
      color: "text-red-600",
      fields: [
        { key: 'glucose', label: 'Glucose Level', unit: 'mg/dL', placeholder: '70-100 (normal)', normal: '70-100' },
        { key: 'insulin', label: 'Insulin Level', unit: 'mu U/ml', placeholder: '2-25 (normal)', normal: '2-25' },
        { key: 'hba1c', label: 'HbA1c', unit: '%', placeholder: '4.0-5.6 (normal)', normal: '4.0-5.6' },
        { key: 'cholesterol', label: 'Cholesterol', unit: 'mg/dL', placeholder: '<200 (normal)', normal: '<200' }
      ]
    },
    {
      title: "Physical Measurements",
      icon: Scale,
      color: "text-blue-600",
      fields: [
        { key: 'bmi', label: 'BMI', unit: 'kg/m²', placeholder: '18.5-24.9 (normal)', normal: '18.5-24.9' },
        { key: 'skinThickness', label: 'Skin Thickness', unit: 'mm', placeholder: '10-40 (typical)', normal: '10-40' }
      ]
    },
    {
      title: "Cardiovascular",
      icon: Heart,
      color: "text-pink-600",
      fields: [
        { key: 'bloodPressureSystolic', label: 'Blood Pressure (Systolic)', unit: 'mmHg', placeholder: '90-120 (normal)', normal: '90-120' },
        { key: 'bloodPressureDiastolic', label: 'Blood Pressure (Diastolic)', unit: 'mmHg', placeholder: '60-80 (normal)', normal: '60-80' },
        { key: 'heartRate', label: 'Heart Rate', unit: 'bpm', placeholder: '60-100 (normal)', normal: '60-100' }
      ]
    },
    {
      title: "Lifestyle Factors",
      icon: Activity,
      color: "text-green-600",
      fields: [
        { key: 'diabetesPedigree', label: 'Diabetes Pedigree Function', unit: '', placeholder: '0.078-2.42 (typical)', normal: '0.078-2.42' },
        { key: 'physicalActivity', label: 'Physical Activity', unit: 'hours/week', placeholder: '2.5+ recommended', normal: '2.5+' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <TestTube className="w-6 h-6" />
            Medical Test Parameters
          </CardTitle>
          <CardDescription className="text-green-100">
            Hello {patientData?.name}! Please enter your recent medical test results
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {testSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className={`text-lg font-semibold ${section.color} flex items-center gap-2`}>
                  <section.icon className="w-5 h-5" />
                  {section.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="space-y-2">
                      <Label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                        {field.label} {field.unit && `(${field.unit})`} *
                      </Label>
                      <Input
                        id={field.key}
                        type="number"
                        step="0.01"
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <p className="text-xs text-gray-500">Normal range: {field.normal}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Important Notes */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please use recent lab results (within last 3 months)</li>
                <li>• If you don't have a specific test result, consult with your doctor</li>
                <li>• All values should be in the specified units</li>
                <li>• This prediction is for informational purposes only</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Generate Diabetes Prediction
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalTestForm;
