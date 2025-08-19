import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { SongCard } from './song-card'
import { AlertCircle, Search, Music } from 'lucide-react'

interface Song {
  reqNo: string
  songName: string
  artistId: string
  artistName: string
  distStart?: string
  distEnd?: string
  firstBars?: string
  programTitle?: string
  durationSeconds: number
  durationFormatted: string
  funcScore?: string
  funcRecording?: string
}

interface SearchResponse {
  searchResult: Song[]
  totalCount: string
  totalPage: string
  error?: string
  message?: string
  _isMockData?: boolean
  _message?: string
}

interface SearchResultsProps {
  results: SearchResponse
  isLoading: boolean
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">検索中...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (results.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>ClubDAM APIに接続できませんでした</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <p>{results.message || 'APIへの接続に失敗しました。'}</p>
            <p className="text-sm">考えられる原因：</p>
            <ul className="text-sm list-disc list-inside space-y-1 ml-4">
              <li>インターネット接続の問題</li>
              <li>ClubDAM APIサーバーの一時的な障害</li>
              <li>DNS解決の問題</li>
              <li>ファイアウォールによるブロック</li>
            </ul>
            <p className="text-sm text-gray-600">しばらく時間をおいてから再度お試しください。</p>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (!results.searchResult || results.searchResult.length === 0) {
    return (
      <Card>
        <CardContent className="text-center p-8">
          <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            検索結果が見つかりませんでした
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            別のキーワードで検索してみてください
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            検索結果
          </CardTitle>
          <CardDescription>
            <span className="font-semibold text-lg text-blue-600">
              {results.totalCount}
            </span>{' '}
            件の楽曲が見つかりました
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.searchResult.map((song) => (
          <SongCard key={song.reqNo} song={song} />
        ))}
      </div>

      {/* Load More Info */}
      {parseInt(results.totalPage) > 1 && (
        <Card>
          <CardContent className="text-center p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ページ 1 / {results.totalPage} を表示中
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}