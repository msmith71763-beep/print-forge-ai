import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;
    const image = formData.get('image') as File | null;
    const mode = image ? 'image-to-3d' : 'text-to-3d';

    const MESHY_API_KEY = process.env.MESHY_API_KEY;

    if (!MESHY_API_KEY) {
      return NextResponse.json({ error: 'Meshy API key not configured' }, { status: 500 });
    }

    let response;
    if (mode === 'image-to-3d' && image) {
      return NextResponse.json({ error: 'Image upload to 3D not fully implemented in this preview' }, { status: 501 });
    } else {
      response = await axios.post(
        'https://api.meshy.ai/v1/text-to-3d',
        {
          prompt: prompt,
          art_style: 'realistic',
        },
        {
          headers: { Authorization: `Bearer ${MESHY_API_KEY}` },
        }
      );
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Meshy Error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to trigger generation' }, { status: 500 });
  }
}