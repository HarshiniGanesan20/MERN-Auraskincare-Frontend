import AboutCard from '../components/AboutCard'
import Banner from '../components/Banner'
import IconCard from '../components/IconCard'
import LatestProduct from '../components/LatestProduct'
import Masonry from '../components/Masonry'
import Testi from '../components/Testi'
import VideoBanner from '../components/VideoBanner'

export default function Home() {
    return (<>

        <Banner />
        <IconCard />
        <Masonry />
        <LatestProduct/>
        <AboutCard/>
        <VideoBanner/>
        <Testi/>
    </>)
}