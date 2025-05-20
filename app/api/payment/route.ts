import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { name, email, phone, paymentMethod, trees, cardNumber, cardCVV, cardExpiration } = await req.json();

    const amount = trees * 5.00; // R$5 por árvore

    // Dados do pagamento
    const paymentData = {
      transaction_amount: amount,
      description: `Doação para plantar ${trees} árvore(s)`,
      payment_method_id: paymentMethod === "PIX" ? "pix" : "credit_card",
      payer: {
        email,
        first_name: name.split(" ")[0],
        last_name: name.split(" ").slice(1).join(" "),
        identification: { type: "CPF", number: phone },
      },
      ...(paymentMethod === "Cartão de Crédito" && {
        token: await getCardToken(cardNumber, cardCVV, cardExpiration), // Obtém token do cartão
        installments: 1, // Pagamento à vista
      }),
    };

    const response = await axios.post(
      "https://api.mercadopago.com/v1/payments",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentStatus = response.data.status;

    return NextResponse.json({
      success: paymentStatus === "approved",
      status: paymentStatus,
      message: paymentStatus === "approved" ? "Pagamento aprovado!" : "Pagamento pendente ou recusado.",
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Função para obter o token do cartão de crédito
async function getCardToken(cardNumber: string, cardCVV: string, cardExpiration: string) {
  const response = await axios.post(
    "https://api.mercadopago.com/v1/card_tokens",
    {
      card_number: cardNumber,
      security_code: cardCVV,
      expiration_month: cardExpiration.split("/")[0],
      expiration_year: "20" + cardExpiration.split("/")[1], // Exemplo: 12/25 -> 2025
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_PUBLIC_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.id; // Retorna o token do cartão
}
