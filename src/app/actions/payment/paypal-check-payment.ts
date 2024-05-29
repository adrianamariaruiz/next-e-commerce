"use server";

import { PayPalOrderStatusResponse } from "@/interfaces/paypal.interface";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {

  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "Could not get verification token",
    };
  }

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken)
  if (!resp) {
    return {
      ok: false,
      message: "error verifying payment",
    };
  }

  const {status, purchase_units} = resp;
  const {invoice_id: orderId} = purchase_units[0];

  if(status !== 'COMPLETED'){
    return {
      ok: false,
      message: 'Has not yet been paid in paypal'
    }
  }

  // actualiza en base de datos
  try {
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: true,
        paidDate: new Date()
      }
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true
    }

  } catch (error) {
    return {
      ok: false,
      message: "the payment could not be made",
    };
  }

  


};

export const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL || "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, requestOptions).then((res) =>
      res.json()
    );
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse|null> => {

  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${bearerToken}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders
  };

  try {
    const result = await fetch(paypalOrderUrl, requestOptions).then(res => res.json())
    return result

  } catch (error) {
    console.log(error)
    return null
  }
};
