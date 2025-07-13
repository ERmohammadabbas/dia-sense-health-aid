
import { Button } from '@/components/ui/button';
import { Heart, Home, User, TestTube, FileText, BookOpen, LogOut } from 'lucide-react';

const Navigation = ({ currentStep, setCurrentStep, user, onLogout }) => {
  const navItems = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'patient-form', label: 'Patient Info', icon: User },
    { key: 'medical-test', label: 'Medical Test', icon: TestTube },
    { key: 'result', label: 'Results', icon: FileText },
    { key: 'health-tips', label: 'Health Tips', icon: BookOpen }
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentStep('home')}>
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">DiabetesAI</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.key}
                variant={currentStep === item.key ? "default" : "ghost"}
                onClick={() => setCurrentStep(item.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentStep === item.key 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              Welcome, {user?.name}
            </span>
            <Button
              variant="outline"
              onClick={onLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden">
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
