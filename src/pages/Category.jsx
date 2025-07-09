// src/pages/Categoria.jsx

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../utils/DB_client'
import PostCard from '../components/PostCard'

export default function Categoria() {
  const { nome } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', nome)
        .order('created_at', { ascending: false })

      if (!error) setPosts(data)
    }

    fetchPosts()
  }, [nome])

  return (
    <div style={{ padding: 16 }}>
      <h1>Postagens em: {nome}</h1>
      {posts.length === 0 ? <p>Nenhuma postagem encontrada.</p> : posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
