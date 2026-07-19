import { MercadoPagoConfig, Preference } from 'mercadopago';

// Esta función será ejecutada por Vercel (Serverless)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, price, successUrl, failureUrl } = req.body;

    // IMPORTANTE: Reemplaza esto con tu ACCESS_TOKEN real de Mercado Pago (Perú)
    // Para producción usa process.env.MP_ACCESS_TOKEN
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-7724511535037155-071823-7696e7ab43d1d1cf8141f2d0bcd0c3b2-300376346', 
      options: { timeout: 5000 } 
    });

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: title || 'Enlace Mágico Premium - PixelHugs',
            quantity: 1,
            unit_price: Number(price) || 3.00,
            currency_id: 'PEN' // Soles Peruanos
          }
        ],
        back_urls: {
          success: successUrl || 'http://localhost:5173/?payment=success',
          failure: failureUrl || 'http://localhost:5173/?payment=failure',
          pending: failureUrl || 'http://localhost:5173/?payment=pending'
        },
        auto_return: 'approved',
      }
    });

    return res.status(200).json({ 
      id: result.id, 
      init_point: result.init_point, // Link para que el usuario pague
      sandbox_init_point: result.sandbox_init_point
    });

  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error);
    return res.status(500).json({ error: 'Error interno del servidor al procesar el pago' });
  }
}
