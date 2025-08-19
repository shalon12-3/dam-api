import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Music, User, Calendar, Tv, Star, Mic } from 'lucide-react'

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

interface SongCardProps {
  song: Song
}

export function SongCard({ song }: SongCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === "99999999") return "配信中"
    if (dateString.length === 8) {
      return `${dateString.substring(0, 4)}年${dateString.substring(4, 6)}月${dateString.substring(6, 8)}日`
    }
    return dateString
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-6">
        {/* Header with title and duration */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {song.songName}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
              <User className="h-4 w-4" />
              <span className="text-sm">{song.artistName}</span>
            </div>
          </div>
          
          {/* Duration Badge */}
          <Badge variant="secondary" className="flex items-center gap-1 text-sm font-mono">
            <Clock className="h-3 w-3" />
            {song.durationFormatted}
          </Badge>
        </div>

        {/* Song ID and Program Title */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Music className="h-4 w-4" />
            <span>ID: {song.reqNo}</span>
          </div>
          
          {song.programTitle && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Tv className="h-4 w-4" />
              <span>{song.programTitle}</span>
            </div>
          )}
        </div>

        {/* First bars */}
        {song.firstBars && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              🎶 {song.firstBars}
            </p>
          </div>
        )}

        {/* Footer with date and features */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(song.distStart)}</span>
          </div>
          
          <div className="flex gap-2">
            {song.funcScore === "1" && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Star className="h-3 w-3" />
                採点
              </Badge>
            )}
            {song.funcRecording === "11" && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Mic className="h-3 w-3" />
                録音
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}