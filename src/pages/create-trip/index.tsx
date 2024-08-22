import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invites-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../libs/axios'

export function CreateTripPage() {
	const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()


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

  async function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
  
    console.log("🚀 ~ createTrip ~ destination:", destination)  
    console.log("🚀 ~ createTrip ~ ownerEmail:", ownerEmail)
    console.log("🚀 ~ createTrip ~ ownerName:", ownerName)
    console.log("🚀 ~ createTrip ~ eventStartAndEndDates:", eventStartAndEndDates)

    if(!destination) return

    if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return

    if(emailsToInvite.length ===0) return
      
    if(!ownerName || !ownerEmail) return

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailsToInvite
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)

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
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
					/>

          {isGuestInputOpen && (
              <InviteGuestsStep
                openGuestModal={openGuestModal}
                openConfirmTripModal={openConfirmTripModal}
                emailsToInvite={emailsToInvite}
              />
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
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
				/>
				

			)}

    </div>

  )
}

//Aula 3 - 37 min