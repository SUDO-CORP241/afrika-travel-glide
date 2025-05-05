
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  price: number;
  onPaymentComplete: (paymentMethod: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ price, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('orange-money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(paymentMethod);
    }, 1500);
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Payment Details</h3>
        
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Choose payment method</h4>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="gap-3"
            >
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="orange-money" id="orange-money" />
                <Label htmlFor="orange-money" className="flex-1 cursor-pointer">
                  <div className="font-medium">Orange Money</div>
                  <div className="text-sm text-gray-500">Pay with Orange Money mobile wallet</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="mtn-momo" id="mtn-momo" />
                <Label htmlFor="mtn-momo" className="flex-1 cursor-pointer">
                  <div className="font-medium">MTN MoMo</div>
                  <div className="text-sm text-gray-500">Pay with MTN Mobile Money</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="wave" id="wave" />
                <Label htmlFor="wave" className="flex-1 cursor-pointer">
                  <div className="font-medium">Wave</div>
                  <div className="text-sm text-gray-500">Pay with Wave mobile money</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="travel-label block">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="travel-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <div className="text-xs text-gray-500">
              We'll send a confirmation code to this number
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Ticket price:</span>
              <span className="font-medium">{price.toLocaleString()} CFA</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service fee:</span>
              <span className="font-medium">500 CFA</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-travel-blue">{(price + 500).toLocaleString()} CFA</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-travel-blue hover:bg-travel-sky" 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment
              </div>
            ) : (
              `Pay ${(price + 500).toLocaleString()} CFA`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
