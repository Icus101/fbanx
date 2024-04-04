import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Homepage/Card'
import Disclaimer from '../components/Homepage/Disclaimer'
import Dream from '../components/Homepage/Dream'
import Footers from '../components/Homepage/Footers'
import Grow from '../components/Homepage/Grow'
import Header from '../components/Homepage/Header'
import RoadMap from '../components/Homepage/RoadMap'
import Solutions from '../components/Homepage/Solutions'
import Upcoming from '../components/Homepage/Upcoming'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className='  '>
      <Header />
      <Card />
      <Solutions />
      <Dream/>
      <RoadMap />
      <Upcoming/>
      <Grow/>
      <Disclaimer/>
      <Footers />
    </main>
  )
}