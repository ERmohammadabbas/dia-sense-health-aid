
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Phone, Calendar, Users, Activity } from 'lucide-react';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    contact: '',
    familyHistory: false,
    smoker: false,
    alcoholic: false,
    exerciseRegularly: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6" />
            Patient Information
          </CardTitle>
          <CardDescription className="text-blue-100">
            Please provide your personal details for accurate health assessment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender *</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Contact Number *
                  </Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Medical & Lifestyle History
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="familyHistory"
                    checked={formData.familyHistory}
                    onCheckedChange={(checked) => handleInputChange('familyHistory', checked)}
                  />
                  <Label htmlFor="familyHistory" className="text-sm font-medium text-gray-700">
                    Family history of diabetes
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smoker"
                    checked={formData.smoker}
                    onCheckedChange={(checked) => handleInputChange('smoker', checked)}
                  />
                  <Label htmlFor="smoker" className="text-sm font-medium text-gray-700">
                    Current smoker
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="alcoholic"
                    checked={formData.alcoholic}
                    onCheckedChange={(checked) => handleInputChange('alcoholic', checked)}
                  />
                  <Label htmlFor="alcoholic" className="text-sm font-medium text-gray-700">
                    Regular alcohol consumption
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exerciseRegularly"
                    checked={formData.exerciseRegularly}
                    onCheckedChange={(checked) => handleInputChange('exerciseRegularly', checked)}
                  />
                  <Label htmlFor="exerciseRegularly" className="text-sm font-medium text-gray-700">
                    Exercise regularly (3+ times per week)
                  </Label>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Continue to Medical Tests
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientForm;
