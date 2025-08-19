import { NextRequest, NextResponse } from 'next/server'

// ClubDAM APIの2024年現状：denmoku.clubdam.comドメインは廃止済み
// 新しい公開エンドポイントは存在しない
const CLUBDAM_BASE_URL = 'https://denmoku.clubdam.com/dkdenmoku' // 廃止済み

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
    
    console.log('=== ClubDAM API Search Request ===')
    console.log('Search Type:', searchType)
    console.log('Search Query:', searchQuery)
    console.log('Match Type:', matchType)
    
    // 2024年現在：ClubDAM APIは利用不可
    // denmoku.clubdam.comドメインは廃止済み
    // 新しい公開APIエンドポイントは存在しない
    console.log('ClubDAM API Status: Domain discontinued (denmoku.clubdam.com)')
    
    return NextResponse.json({ 
      searchResult: [],
      totalCount: "0",
      totalPage: "0",
      error: "API_DISCONTINUED",
      message: "ClubDAM APIサービスは終了しました",
      details: {
        reason: "denmoku.clubdam.comドメインが廃止されました",
        status: "2024年現在、新しい公開APIは提供されていません",
        suggestion: "DAM公式アプリ「デンモクアプリ」をご利用ください",
        timestamp: new Date().toISOString(),
        appInfo: {
          name: "デンモクアプリ",
          ios: "https://apps.apple.com/jp/app/デンモクアプリ/id470831622",
          android: "https://play.google.com/store/apps/details?id=jp.co.dkkaraoke.denmokumini01"
        }
      }
    }, { status: 410 }) // 410 Gone - リソースが永続的に利用不可

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