import { NextRequest, NextResponse } from 'next/server'

const CLUBDAM_BASE_URL = 'https://denmoku.clubdam.com/dkdenmoku'

const DEFAULT_PARAMS = {
  appVer: "2.1.0",
  deviceId: "nextjs123456789",
  deviceNm: "ClubDAM Next.js WebUI",
  osVer: "1.0.0"
}

function generateRandomDuration() {
  return Math.floor(Math.random() * 240) + 120
}

function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds < 0) {
    return "0:00"
  }
  
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { songs, serialNo } = body
    
    const requestData: any = {
      ...DEFAULT_PARAMS,
      isExist: songs
    }

    if (serialNo) {
      requestData.serialNo = serialNo
    }

    console.log('Checking song existence:', requestData)

    const response = await fetch(`${CLUBDAM_BASE_URL}/DkDamIsExistServlet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.isExist) {
      data.isExist = data.isExist.map((song: any) => {
        if (song.reqNo) {
          const duration = generateRandomDuration()
          return {
            ...song,
            durationSeconds: duration,
            durationFormatted: formatDuration(duration)
          }
        }
        return song
      })
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Check Exist API Error:', error)
    return NextResponse.json({ 
      error: 'Check exist API call failed', 
      message: (error as Error).message,
      isExist: []
    }, { status: 500 })
  }
}