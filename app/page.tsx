'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Music, User, Sparkles, Heart, Users } from 'lucide-react'
import { SearchResults } from '@/components/search-results'
import { SongCard } from '@/components/song-card'

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
}

export default function Home() {
  const [searchType, setSearchType] = useState<'song' | 'artist'>('song')
  const [searchQuery, setSearchQuery] = useState('')
  const [matchType, setMatchType] = useState('1')
  const [serialNo, setSerialNo] = useState('AB316238')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResponse | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchType,
          searchQuery,
          matchType,
          serialNo: serialNo || undefined,
        }),
      })

      const data: SearchResponse = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults({
        searchResult: [],
        totalCount: '0',
        totalPage: '0',
        error: 'Search failed',
        message: 'Failed to connect to the API'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickSearch = async (categoryCd: string, label: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchType: 'category',
          categoryCd,
          serialNo: serialNo || undefined,
        }),
      })

      const data: SearchResponse = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Quick search error:', error)
      setResults({
        searchResult: [],
        totalCount: '0',
        totalPage: '0',
        error: 'Quick search failed',
        message: 'Failed to connect to the API'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <Music className="h-10 w-10 text-blue-600" />
            ClubDAM API Explorer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            カラオケ楽曲を検索して、曲の長さも確認できます
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Search Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                楽曲検索
              </CardTitle>
              <CardDescription>
                楽曲名やアーティスト名で検索できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="searchType">検索タイプ</Label>
                  <Select value={searchType} onValueChange={(value: 'song' | 'artist') => setSearchType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="song">
                        <div className="flex items-center gap-2">
                          <Music className="h-4 w-4" />
                          楽曲名で検索
                        </div>
                      </SelectItem>
                      <SelectItem value="artist">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          アーティスト名で検索
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="searchQuery">検索キーワード</Label>
                  <Input
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="検索したいキーワードを入力"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matchType">マッチタイプ</Label>
                  <Select value={matchType} onValueChange={setMatchType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">前方一致</SelectItem>
                      <SelectItem value="1">部分一致</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNo">シリアル番号 (オプション)</Label>
                  <Input
                    id="serialNo"
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                    placeholder="例: AB316238"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      検索中...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      検索
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                クイック検索
              </CardTitle>
              <CardDescription>
                人気カテゴリから簡単検索
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleQuickSearch('030301', '新しいアニメ楽曲')}
                  disabled={isLoading}
                  className="justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    <div className="text-left">
                      <div className="font-semibold">新しいアニメ楽曲</div>
                      <div className="text-sm text-muted-foreground">最新のアニメ関連楽曲</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleQuickSearch('060100', 'VOCALOID楽曲')}
                  disabled={isLoading}
                  className="justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-cyan-500" />
                    <div className="text-left">
                      <div className="font-semibold">VOCALOID楽曲</div>
                      <div className="text-sm text-muted-foreground">初音ミクなどのVOCALOID楽曲</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleQuickSearch('070400', 'デュエット楽曲')}
                  disabled={isLoading}
                  className="justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-500" />
                    <div className="text-left">
                      <div className="font-semibold">デュエット楽曲</div>
                      <div className="text-sm text-muted-foreground">二人で歌えるデュエット楽曲</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {results && (
          <SearchResults 
            results={results}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}