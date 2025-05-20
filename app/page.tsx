"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const neighborhoods = ["Copacabana", "Ipanema", "Leblon", "Centro", "Botafogo"];
const blocks = ["Bloco da Favorita", "Cordão do Bola Preta", "Monobloco"];
const transports = ["Ônibus", "Metrô", "Carro", "Bicicleta", "A pé"];
const trees = [1, 2, 3, 5, 10];

interface FormData {
  neighborhood: string;
  block: string;
  transport: string;
  trees: number;
  name: string;
  email: string;
  phone: string;
  paymentMethod: "PIX" | "Cartão de Crédito";
}

export default function CarnavalOffset() {
  const [data, setData] = useState<FormData>({
    neighborhood: "",
    block: "",
    transport: "",
    trees: 1,
    name: "",
    email: "",
    phone: "",
    paymentMethod: "PIX",
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log("Step atualizado:", step);
  }, [step]);

  const handleChange = (field: keyof FormData, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    console.log("Passo atual antes:", step);
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Passo final alcançado.");
    }
  };

  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = async () => {
    console.log("Enviando pagamento...");
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        alert("Pagamento realizado com sucesso! Obrigado pela sua contribuição.");
      } else {
        alert("Houve um problema no pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <CardContent className="flex flex-col gap-4">
          {step < 5 && (
            <>
              <h2 className="text-xl font-bold text-center">
                {step === 1 ? "Está saindo de qual bairro?" :
                 step === 2 ? "Para qual bloco?" :
                 step === 3 ? "Qual será o transporte?" :
                 "Quer plantar quantas árvores?"}
              </h2>
              <Select
                value={step === 1 ? data.neighborhood : step === 2 ? data.block : step === 3 ? data.transport : data.trees.toString()}
                onValueChange={(val) => handleChange(step === 1 ? "neighborhood" : step === 2 ? "block" : step === 3 ? "transport" : "trees", step === 4 ? Number(val) : val)}
              >
                {(step === 1 ? neighborhoods : step === 2 ? blocks : step === 3 ? transports : trees.map(String)).map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </Select>
              <div className="flex justify-between">
                {step > 1 && <Button onClick={prevStep} className="bg-gray-400 text-white">Voltar</Button>}
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">Próximo</Button>
              </div>
            </>
          )}
          {step === 5 && (
            <>
              <h2 className="text-xl font-bold text-center">Dados e pagamento</h2>
              <Input type="text" placeholder="Nome" value={data.name} onChange={(e) => handleChange("name", e.target.value)} />
              <Input type="email" placeholder="E-mail" value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
              <Input type="tel" placeholder="Telefone" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              <Select value={data.paymentMethod} onValueChange={(val) => handleChange("paymentMethod", val as "PIX" | "Cartão de Crédito")}>                <SelectItem value="PIX">PIX</SelectItem>
                <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
              </Select>
              <div className="flex justify-between">
                <Button onClick={prevStep} className="bg-gray-400 text-white">Voltar</Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">Finalizar</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
