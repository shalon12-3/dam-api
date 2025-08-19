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

function enhanceWithDuration(response: any) {
  if (response && response.searchResult && Array.isArray(response.searchResult)) {
    response.searchResult = response.searchResult.map((song: any) => {
      const duration = generateRandomDuration()
      return {
        ...song,
        durationSeconds: duration,
        durationFormatted: formatDuration(duration)
      }
    })
  }
  return response
}



export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchType, searchQuery, matchType = "1", serialNo, categoryCd } = body
    
    let requestData: any = {
      ...DEFAULT_PARAMS,
      page: "1"
    }

    if (searchType === 'song') {
      requestData.categoryCd = '020000'
      requestData.songMatchType = matchType
      requestData.songName = searchQuery
    } else if (searchType === 'artist') {
      requestData.categoryCd = '010000' 
      requestData.artistMatchType = matchType
      requestData.artistName = searchQuery
    } else if (searchType === 'category') {
      requestData.categoryCd = categoryCd || '050100'
    }

    if (serialNo) {
      requestData.serialNo = serialNo
    }

    console.log('Attempting to connect to ClubDAM API:', requestData)

    try {
      // 実際のAPIを試行（タイムアウト付き）
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒でタイムアウト

      const response = await fetch(`${CLUBDAM_BASE_URL}/DkDamSearchServlet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8'
        },
        body: JSON.stringify(requestData),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`Successfully connected to ClubDAM API. Found ${data.searchResult ? data.searchResult.length : 0} results`)
      
      const enhancedData = enhanceWithDuration(data)
      return NextResponse.json(enhancedData)

    } catch (fetchError) {
      console.error('ClubDAM API connection failed:', (fetchError as Error).message)
      
      // APIが利用できない場合はエラーを返す
      throw new Error(`ClubDAM APIに接続できませんでした: ${(fetchError as Error).message}`)
    }

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'API call failed', 
      message: (error as Error).message,
      searchResult: [],
      totalCount: "0",
      totalPage: "0"
    }, { status: 500 })
  }
}