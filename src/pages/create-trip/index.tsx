import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invites-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'

export function CreateTripPage() {
	const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'carlos.silva@GitPullRequest.com'
  ])

  function openGuestsInput(){
    setIsGuestInputOpen(true)
  }

  function closeGuestsInput(){
    setIsGuestInputOpen(false)
  }

  function openGuestModal(){
    setIsGuestModalOpen(true)
  }

  function closeGuestModal(){
    setIsGuestModalOpen(false)
  }

  function openConfirmTripModal(){
    setConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal(){
    setConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    if(emailsToInvite.includes(email)){
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove : string){
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)

  }

  function createTrip(event: FormEvent<HTMLFormElement>){
		event.preventDefault
			navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src='/logo.svg' alt='plann.er'/>
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua viagem!</p>
        </div>
        
        <div className='space-y-4'>
          <DestinationAndDateStep 
						closeGuestsInput={closeGuestsInput}
						isGuestInputOpen={isGuestInputOpen}
						openGuestsInput={openGuestsInput}
					/>

          {isGuestInputOpen && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={openGuestModal} className='flex items-center gap-2 flex-1'>
                <UserRoundPlus className='size-5 text-zinc-400'/>
                {emailsToInvite.length > 0 ?(
                  <span className='text-zinc-100 text-lg flex-1 text-left'>{emailsToInvite.length} pessoa(s) convidada(s)</span>
                ) :  (
                  <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
                )}
              </button>
              <div className='x-px h-6 bg-zinc-800'/>
    
              <button onClick={openConfirmTripModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar viagem
                <ArrowRight className='size-5'/>
              </button>
              </div>
          )}
        </div>

        

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#"> politicas de privacidade</a>
        </p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal
					emailsToInvite={emailsToInvite}
					addNewEmailToInvite={addNewEmailToInvite}
					closeGuestModal={closeGuestModal}
					removeEmailFromInvite={removeEmailFromInvite}
				/>
      )}

      {isConfirmTripModalOpen && (
				<ConfirmTripModal 
					closeConfirmTripModal={closeConfirmTripModal}
					createTrip={createTrip}
				/>
				

			)}

    </div>

  )
}

//27 min aula 2