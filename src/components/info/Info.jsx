import { useState, useEffect } from 'react'
import { Main } from './main'
import { Project } from './project'
import { Trustless } from './trustless'
import { Monitoring } from './monitoring'
import { Allocation } from './allocation'
import { Feature } from './feature'
import { Roadmap } from './roadmap'
import { Footer } from './footer'
import { Header } from './header'
import JsonData from '../../data/data.json'
import SmoothScroll from 'smooth-scroll'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const Info = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
      <Header/>
      <Main data={landingPageData.Main} />
      <Project data={landingPageData.Project} />
      <Trustless data={landingPageData.Trustless} />
      <Monitoring data={landingPageData.Monitoring} />
      <Allocation data={landingPageData.Allocation} />
      <Feature data={landingPageData.Feature} />
      <Roadmap data={landingPageData.Roadmap} />
      <Footer data={landingPageData.Footer} />
    </div>
  )
}

export default Info
