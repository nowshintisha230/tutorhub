import AvailableTutor from "./components/AvailableTutor";
import Banner from "./components/Banner";
import HowItWorks from "./components/HowItWorks";
import PopularSubjects from "./components/PopularSubjects";


export default function Home() {
  return (
    <div >
   <Banner></Banner>
     <AvailableTutor></AvailableTutor>
     <HowItWorks></HowItWorks>
     <PopularSubjects></PopularSubjects>
    </div>
  );
}
