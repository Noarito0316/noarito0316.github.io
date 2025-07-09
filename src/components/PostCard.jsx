import React, { useEffect } from 'react'

export default function PostCard({ post }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [post.content]) // ⬅ importante observar alterações no conteúdo

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 24 }}>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
