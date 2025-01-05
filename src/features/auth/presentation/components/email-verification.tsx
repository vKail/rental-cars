import React from "react";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";

export const EmailVerificationComponent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const {onSubmit} = useVerifyEmail();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Verifica tu correo electrónico
            </h1>
            <p className="text-gray-600">
              Hemos enviado los pasos para la verificación de tu email. Revisa
              tu correo para completar el registro.
            </p>
          </div>
          <Button className="w-full mt-4" onClick={() => onSubmit(token ?? "")}>Verificar correo</Button>
        </CardContent>
      </Card>
    </div>
  );
};
