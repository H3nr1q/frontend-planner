import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../libs/axios";
import { format } from "date-fns";
import { DestinationAndDateModal } from "./destination-and-date-modal";
import { DateRange } from "react-day-picker";

interface Trip{
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader(){
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [isDestinationAndModalOpen, setIsDestinationAndModalOpenn] = useState(false)
  
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  function openDestinationAndDateModal(event: React.MouseEvent){
    event.preventDefault(); // Previne o comportamento padrão do clique
		setIsDestinationAndModalOpenn(true)
	}
  
  useEffect(() =>  {
    api.get(`/trips/${tripId}`).then(response => {
      const trip = response.data.trip;
      setTrip(trip);

      if(trip.starts_at && trip.ends_at){
        setEventStartAndEndDates({
          from: trip.starts_at,
          to: trip.ends_at,
        });
      }
    });
  },[tripId])

  
  const displayedDate = trip 
  ? format(trip.starts_at, "d 'de 'LLL").concat(' até ').concat(format(trip.ends_at, "d 'de 'LLL"))
  : ''

  const destination = trip?.destination || '';

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">{destination}</span>
        </div>
        <div className="flex items-center gap-5">
          <Calendar className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className='x-px h-6 bg-zinc-800'/>
        <Button onClick={openDestinationAndDateModal} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5"/>
        </Button>

        {isDestinationAndModalOpen && (
          <DestinationAndDateModal
            destination={destination}
            displayedDate={displayedDate}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />
        )}

    </div>
    
  )
}