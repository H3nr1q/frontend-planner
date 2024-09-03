import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { CreateImportantLinks } from "./create-important-links";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../libs/axios";

interface ImportantLinks{
    id: string
    title: string
    url: string
}

export function ImportantLinks() {
	const [isCreateImportantLinksOpen, setIsCreateImportantLinksOpen] = useState(false)
  const { tripId } = useParams()
  const [linksImportant, setLinksImportant] = useState<ImportantLinks[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinksImportant(response.data.links))
  }, [tripId])

  function openCreateImportantLinks(){
		setIsCreateImportantLinksOpen(true)
	}

	function closeCreateImportantLinks(){
		setIsCreateImportantLinksOpen(false)
	}

  return(
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      {linksImportant.length > 0 ? (
        linksImportant?.map(link => {
          return(              
              <div key={link.id} className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">{link.title}</span>
                    <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">{link.url}</a>
                  </div>
                  <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
              </div> 
            )
          })
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum link encontrado</p>
      )}
        
      <Button onClick={openCreateImportantLinks} variant="secondary" size="full">
        <Plus className="sizen-5" />
          Cadastrar novo link
      </Button>

      {isCreateImportantLinksOpen && (
        <CreateImportantLinks
          closeCreateImportantLinks={closeCreateImportantLinks}
        />
			)}

    </div>
  )
}