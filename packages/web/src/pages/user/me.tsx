import { useRouter } from 'next/router'
import { useMyProfileQuery } from './query.generated'

function MyProfile() {
  const router = useRouter()
  const { data, loading, error } = useMyProfileQuery()

  if (loading) return <div>Loading...</div>
  
  if (error) {
    console.error('Authentication error:', error)
    router.push('/user')
    return <div>認証エラーが発生しました。ログインページにリダイレクトします...</div>
  }

  if (!data?.user) {
    router.push('/user')
    return <div>ユーザー情報を取得できませんでした。</div>
  }

  const { user } = data

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">マイプロフィール</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            戻る
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ユーザー情報 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">基本情報</h2>
            <div className="space-y-2">
              <p><strong>ユーザー名:</strong> {user.username}</p>
              <p><strong>ユーザーID:</strong> {user.id}</p>
              <p><strong>信頼スコア:</strong> {user.trustScore.toFixed(1)}</p>
            </div>
          </div>

          {/* 本の一覧 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">登録した本 ({user.books.length}冊)</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {user.books.length === 0 ? (
                <p className="text-gray-500">まだ本を登録していません</p>
              ) : (
                user.books.map((book) => (
                  <div key={book.id} className="border border-gray-200 p-2 rounded">
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {book.condition}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        book.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {book.isAvailable ? '利用可能' : '利用不可'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 信頼レビュー */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">受け取った信頼レビュー ({user.receivedTrustReviews.length}件)</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {user.receivedTrustReviews.length === 0 ? (
              <p className="text-gray-500">まだレビューがありません</p>
            ) : (
              user.receivedTrustReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 p-3 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.reviewerUser.username}</p>
                      <p className="text-sm text-gray-600">{review.reviewType}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{review.rating}/5</p>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push('/book')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            本の一覧
          </button>
          <button
            onClick={() => router.push('/user')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            ユーザーページ
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyProfile