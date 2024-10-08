import { CheckCircle, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../libs/axios";
import { InviteGuestModal } from "../create-trip/invite-guest-modal";

interface participants{
  id: string
  nome: string | null
  email: string
  is_confirmed: boolean
}

export function Guests(){
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<participants[] | []>()
  const [ isInviteGuestModalOpen, setIsInviteGuestModalOpen] = useState(false)

  useEffect(() =>  {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  },[tripId])

  function openInviteGuestModalOpen(){
    setIsInviteGuestModalOpen(true)
  }

  function closeInviteGuestModalOpen(){
    setIsInviteGuestModalOpen(false)
  }
  
  return(
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
       {participants?.map((participant,index) => {
        return(
          <div key={participant.id} className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">{participant.nome ?? `Convidado ${index}`}</span>
            <span className="block text-xs text-zinc-400 truncate">{participant.email}</span>
          </div>
          {
            participant.is_confirmed ? (
              <CheckCircle className="size-5 shrink-0 text-green-400" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )
          }
        </div>
        )
       })}
      </div>

      <Button onClick={openInviteGuestModalOpen} variant="secondary" size="full">
        <UserCog className="sizen-5" />
          Gerenciar convidados
      </Button>

       {isInviteGuestModalOpen && (
          <InviteGuestModal 
            closeInviteGuestModalOpen={closeInviteGuestModalOpen}
          />
       )}

    </div>
  )
}