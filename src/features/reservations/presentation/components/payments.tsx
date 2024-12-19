import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onConfirm: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose, total, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulamos el proceso de pago
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Información de Pago</DialogTitle>
              <DialogDescription>
                Complete los detalles de su tarjeta para procesar el pago de ${total}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Número de Tarjeta</Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="4242 4242 4242 4242"
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Fecha de Expiración</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleClose} variant="outline">
                Cancelar
              </Button>
              <Button onClick={handlePayment} disabled={loading}>
                {loading ? "Procesando..." : "Pagar"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>¡Pago Exitoso!</DialogTitle>
              <DialogDescription>
                Su reserva ha sido confirmada
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <DialogFooter>
              <Button onClick={() => {
                handleClose();
                onConfirm();
              }} className="w-full">
                Continuar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;