import type { NextPage } from 'next'
import { useQuery } from 'react-query'
import EventCard from '../../components/EventCard'
import DeviderLine from '../../StyledComponents/DeviderLine'
import SubTitle from '../../StyledComponents/SubTitle'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';


type BoxProps = {
  id: React.ReactNode;
};


const Home: NextPage = () => {
  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3000/events");
    return response.json();
  }

  const { data, status } = useQuery("events", fetchEvents );

  if(status === "loading") {return <div>Loading ...</div>}
  if(status === "error") { return <div>Error</div>}

  return (
    <div className={styles.container}>
      <div className={styles.main} >
        <SubTitle>Today, Jan 20</SubTitle>
        <DeviderLine />
        {data.today.map((ev:BoxProps) => (<EventCard key={ev.id} size="" event={ev} />))}

        <SubTitle>Tomorrow, Jan 21</SubTitle>
        <DeviderLine />
        {data.tommorow.map((ev:BoxProps) => (<EventCard key={ev.id} size="" event={ev} />))}
        
      </div>
      <div className={styles.side_area} >
        <SubTitle>Your next events</SubTitle>
        {data.next.map((ev:BoxProps) => (<EventCard key={ev.id} size="small" event={ev} />))}
      </div>
    </div>
  )
}

export default Home
