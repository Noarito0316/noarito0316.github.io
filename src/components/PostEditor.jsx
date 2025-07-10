import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import supabase from '../utils/DB_client'
import ImageLibraryModal from './ImageLibraryModal'
import PostView from './PostCard'

const categorias = ['promocoes', 'vagas', 'noticias', 'sorteios']

export default function PostEditor() {
  const editorRef = useRef(null)
  const [title, setTitle] = useState('')
  const [categoria, setCategoria] = useState(categorias[0])
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, category, content, created_at')
        .order('category', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar posts:', error)
      } else {
        setPosts(data)
      }
    }
    fetchPosts()
  }, [])

  async function handleDelete(postId) {
    const confirmado = window.confirm('Tem certeza que deseja apagar este post?')
    if (!confirmado) return

    const { error } = await supabase.from('posts').delete().eq('id', postId)

    if (error) {
      alert('Erro ao deletar post: ' + error.message)
    } else {
      alert('Post apagado com sucesso!')
      setPosts(prev => prev.filter(p => p.id !== postId))
    }
  }

  async function handleSubmit() {
    if (!title || !content) return
    setLoading(true)

    if (editingId) {
      const { error } = await supabase
        .from('posts')
        .update({ title, category: categoria, content })
        .eq('id', editingId)

      if (error) {
        alert('Erro ao atualizar post: ' + error.message)
      } else {
        alert('Post atualizado com sucesso!')
        setPosts(prev => prev.map(p => p.id === editingId ? { ...p, title, category: categoria, content } : p))
        setEditingId(null)
      }
    } else {
      const { data, error } = await supabase.from('posts').insert({
        title,
        category: categoria,
        content,
      }).select()

      if (error) {
        alert('Erro ao salvar post: ' + error.message)
      } else {
        alert('Post publicado com sucesso!')
        setPosts(prev => [data[0], ...prev])
      }
    }

    setTitle('')
    setContent('')
    setLoading(false)
    if (editorRef.current) editorRef.current.setContent('')
  }

  function handleInsertImage(url) {
    if (editorRef.current) {
      editorRef.current.insertContent(`<img src="${url}" alt="imagem" />`)
    }
    setShowLibrary(false)
  }

  function handleEdit(post) {
    setTitle(post.title)
    setCategoria(post.category)
    setContent(post.content)
    setEditingId(post.id)
    if (editorRef.current) editorRef.current.setContent(post.content)
  }

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h2>Criar Postagem</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8 }}
      />

      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        style={{ padding: 8, marginBottom: 12 }}
      >
        {categorias.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <Editor
        apiKey="wv9j99ifeltryyfl37qfz8yzvhtjpefdwnca5l80rhzq8nrz"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 500,
          menubar: true,
          toolbar_mode: 'wrap',
          language: 'pt_BR',
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
            'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'checklist',
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | link image media | ' +
            'bold italic underline strikethrough table | align lineheight | ' +
            'checklist numlist bullist indent outdent emoticons charmap removeformat',
          content_style: 'body { font-family:Arial,sans-serif; font-size:14px }',
        }}
      />

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={handleSubmit} disabled={loading}>
          {editingId ? 'Salvar edição' : loading ? 'Publicando...' : 'Publicar'}
        </button>
        <button onClick={() => setShowLibrary(true)}>📷 Inserir imagem da biblioteca</button>
        <button onClick={() => setShowPreview(prev => !prev)}>
          {showPreview ? 'Ocultar prévia' : '🔍 Ver prévia'}
        </button>
      </div>

      {showLibrary && (
        <ImageLibraryModal
          onSelect={handleInsertImage}
          onClose={() => setShowLibrary(false)}
        />
      )}

      {showPreview && (
        <div style={{ marginTop: 20, border: '1px solid #ccc', padding: 16, borderRadius: 4 }}>
          <h3>Pré-visualização</h3>
          <PostView post={{ title, content }} />
        </div>
      )}

      <hr style={{ margin: '40px 0' }} />

      <h2>Postagens Recentes</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Filtrar por categoria:</label>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{ marginLeft: 8, padding: 4 }}
        >
          <option value="">Todas</option>
          {categorias.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filteredPosts.length === 0 && <p>Nenhuma postagem encontrada.</p>}

      {filteredPosts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: 4, padding: 12, marginBottom: 12 }}>
          <h3>{post.title}</h3>
          <p><strong>Categoria:</strong> {post.category}</p>
          <p><strong>Data de criação:</strong> {new Date(post.created_at).toLocaleString('pt-BR')}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => handleEdit(post)}>Editar</button>
            <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>
              Apagar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
