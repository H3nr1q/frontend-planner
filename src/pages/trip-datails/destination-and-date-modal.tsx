import { Calendar, Link2, MapPin, Plus, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { api } from "../../libs/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

interface DestinationAndDateModalProps{
	eventStartAndEndDates: DateRange | undefined
	destination: string
	displayedDate: string
	setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateModal({
	destination,
	eventStartAndEndDates,
	setEventStartAndEndDates
} : DestinationAndDateModalProps){
	const { tripId } = useParams()
	const [localDestination, setLocalDestination] = useState(destination);
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDestination(e.target.value);
  };

	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
	console.log("🚀 ~ eventStartAndEndDates:", eventStartAndEndDates)
	
	function openDatePicker(event: React.MouseEvent) {
		event.preventDefault(); // Previne o comportamento padrão do clique
		setIsDatePickerOpen(true);
	}

	function closeDatePicker(){
		return setIsDatePickerOpen(false)
	}

	async function updateTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    if(!localDestination) return

    if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return

    await api.put(`/trips/${tripId}`, {
			tripId,
      destination: localDestination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    })

		window.document.location.reload()
  }

	const displayedDateNew = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
		? format(eventStartAndEndDates.from, "d 'de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de 'LLL"))
		: '';

	return(
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
			<div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
				<div className='space-y-2'>
					<div className='flex items-center justify-between'>
						<h2 className='text-lg font-semibold'>Alterar Local e Data</h2>
					</div>
				</div>
				<form onSubmit={updateTrip} className='space-y-3'>
          <div className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <MapPin className='text-zinc-400 size-5' />
            <input 
							type="text"
              placeholder='Para onde você vai?' 
							value={localDestination}
							onChange={handleDestinationChange}
              className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' />
						
          </div>
          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
						<button onClick={openDatePicker} className='flex items-center gap-2 text-left w-[240px]'>
							<Calendar className='text-zinc-400 size-5' />
							<span className="text-lg text-zinc-400 w-40 flex-1">
								{displayedDateNew || 'Quando?'}
							</span>
						</button>
						{isDatePickerOpen && (
							<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
							<div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-semibold'>Selecione as datas</h2>
										<button type='button' onClick={closeDatePicker}>
											<X className="size-5 text-zinc-400" />
										</button>
									</div>
								</div>
								<DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
							</div>
						</div>

						)}
          </div>
          
          <div className="flex items-center gap-2">
            
          </div>
          
          <Button variant="primary" size="full">
            Salvar
          </Button>

        </form>

			</div>
		</div>
	)
}