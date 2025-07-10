import { useEffect } from 'react'

// Esta é a tela de exibição completa de um post
export default function PostView({ post }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
      console.log('Instagram embeds processed')
    }
  }, [])

  return (
    <div className='post-container' dangerouslySetInnerHTML={{ __html: post.content }} />
  )
}

// Este é um cartão resumido (pode usar em uma lista, por exemplo)
export function PostCard({ post }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 24 }}>
      <h2>{post.title}</h2>
      <div className='post-container' dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
