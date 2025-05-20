import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { name, email, phone, paymentMethod, trees } = await req.json();

    const amount = trees * 5.00; // R$5 por árvore

    // Criar preferência de pagamento
    const paymentData = {
      items: [
        {
          title: `Doação para plantar ${trees} árvore(s)`,
          quantity: 1,
          currency_id: "BRL",
          unit_price: amount,
        },
      ],
      payer: {
        email: email,
        name: name,
      },
      payment_methods: {
        excluded_payment_types: paymentMethod === "PIX" ? ["credit_card"] : ["pix"],
      },
      auto_return: "approved",
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
    };

    const response = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ preferenceId: response.data.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
