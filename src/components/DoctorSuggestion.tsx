
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  User, 
  Stethoscope,
  DollarSign,
  CheckCircle
} from 'lucide-react';

const DoctorSuggestion = ({ userRisk = 'LOW' }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  // Dynamic doctor data based on risk level
  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Endocrinologist",
      experience: "15 years",
      rating: 4.8,
      consultationFee: userRisk === 'HIGH' ? 1500 : 1200,
      location: "Apollo Hospital, Delhi",
      phone: "+91 98765 43210",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
      timeSlots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Diabetologist",
      experience: "12 years",
      rating: 4.9,
      consultationFee: userRisk === 'HIGH' ? 1800 : 1400,
      location: "Max Hospital, Mumbai",
      phone: "+91 87654 32109",
      availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
      timeSlots: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialization: "Internal Medicine",
      experience: "20 years",
      rating: 4.7,
      consultationFee: userRisk === 'HIGH' ? 1600 : 1300,
      location: "Fortis Hospital, Bangalore",
      phone: "+91 76543 21098",
      availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
      timeSlots: ["11:00 AM", "12:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"],
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face"
    }
  ];

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && patientName && patientPhone) {
      setAppointmentBooked(true);
      // In real app, this would make an API call to book the appointment
      console.log('Appointment booked:', {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        patient: { name: patientName, phone: patientPhone }
      });
    }
  };

  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setPatientName('');
    setPatientPhone('');
    setAppointmentBooked(false);
  };

  const today = new Date();
  const availableDates = [];
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    availableDates.push(date.toISOString().split('T')[0]);
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          Recommended Doctors
        </CardTitle>
        <CardDescription>
          {userRisk === 'HIGH' 
            ? '⚠️ High risk detected - Immediate consultation recommended'
            : '📋 Consult with specialists for better health management'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="border border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-blue-600">{doctor.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{doctor.rating}/5 rating</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">₹{doctor.consultationFee}</span>
                    {userRisk === 'HIGH' && (
                      <Badge className="bg-red-100 text-red-800 text-xs">Priority</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{doctor.phone}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Available Days:</h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availableDays.map((day) => (
                      <Badge key={day} variant="outline" className="text-xs">
                        {day.slice(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-md">
                    {!appointmentBooked ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Book Appointment</DialogTitle>
                          <DialogDescription>
                            Book consultation with {selectedDoctor?.name}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="patientName">Patient Name</Label>
                            <Input
                              id="patientName"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              placeholder="Enter your full name"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="patientPhone">Phone Number</Label>
                            <Input
                              id="patientPhone"
                              value={patientPhone}
                              onChange={(e) => setPatientPhone(e.target.value)}
                              placeholder="Enter your phone number"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="appointmentDate">Select Date</Label>
                            <select
                              id="appointmentDate"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Choose a date</option>
                              {availableDates.map((date) => {
                                const dateObj = new Date(date);
                                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
                                const isAvailable = selectedDoctor?.availableDays.includes(dayName);
                                
                                return (
                                  <option 
                                    key={date} 
                                    value={date} 
                                    disabled={!isAvailable}
                                  >
                                    {dateObj.toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })} {!isAvailable ? '(Not Available)' : ''}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          
                          <div>
                            <Label htmlFor="appointmentTime">Select Time</Label>
                            <select
                              id="appointmentTime"
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Choose a time slot</option>
                              {selectedDoctor?.timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {selectedDoctor && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Consultation Fee:</span>
                                <span className="text-xl font-bold text-blue-600">
                                  ₹{selectedDoctor.consultationFee}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          <Button 
                            onClick={handleBookAppointment}
                            disabled={!selectedDate || !selectedTime || !patientName || !patientPhone}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-600 mb-2">
                          Appointment Confirmed!
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                          <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                          })}</p>
                          <p><strong>Time:</strong> {selectedTime}</p>
                          <p><strong>Fee:</strong> ₹{selectedDoctor?.consultationFee}</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                          Confirmation details will be sent to your phone number.
                        </p>
                        <Button onClick={resetBooking} className="w-full">
                          Book Another Appointment
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Note:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Consultation fees may vary based on risk assessment</li>
            <li>• High-risk patients get priority booking</li>
            <li>• All doctors are certified diabetes specialists</li>
            <li>• Telemedicine consultations also available</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorSuggestion;
