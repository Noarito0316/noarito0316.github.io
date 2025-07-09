import { useEffect, useRef, useState } from 'react'
import supabase from '../utils/DB_client'

const categorias = ['promocoes', 'vagas', 'noticias', 'sorteios']

function ImageLibraryModal({ onSelect, onClose }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchImages() {
    const { data, error } = await supabase.storage.from('posts').list('', { limit: 100 })
    if (error) {
      console.error('Erro ao listar imagens:', error)
      setImages([])
    } else {
      const urls = data.map(file => {
        const { data: urlData } = supabase.storage.from('posts').getPublicUrl(file.name)
        return { name: file.name, url: urlData.publicUrl }
      })
      setImages(urls)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  async function deleteImage(name) {
    const confirmar = window.confirm('Deseja excluir esta imagem?')
    if (!confirmar) return

    const { error } = await supabase.storage.from('posts').remove([name])
    if (error) {
      alert('Erro ao excluir imagem: ' + error.message)
    } else {
      setImages(prev => prev.filter(i => i.name !== name))
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0009', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: 20, maxHeight: '80vh', overflowY: 'auto', borderRadius: 8 }}>
        <h3>Biblioteca de Imagens</h3>
        {loading ? <p>Carregando imagens...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
            {images.map(img => (
              <div style={{ position: 'relative' }} key={img.name}>
                <img
                  src={img.url}
                  alt={img.name}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    borderRadius: 4,
                  }}
                  onClick={() => onSelect(img.url)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteImage(img.name)
                  }}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    textAlign: 'center',
                    padding: 0,
                  }}
                  title="Excluir imagem"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button onClick={onClose} style={{ marginTop: 16 }}>Fechar</button>
      </div>
    </div>
  )
}

export default ImageLibraryModal;
