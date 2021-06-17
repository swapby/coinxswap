import monitoringImage from '../../images/monitoring/image_section_03.png'

export const Monitoring = (props) => {
  return (
    <div className="container">
        <div className="hero-title">
            <div className="title">
                <h2>{props.data ? props.data.title : 'Loading'}</h2>
                <p>{props.data ? props.data.paragraph1 : 'Loading'}
                <br/>
                {props.data ? props.data.paragraph2 : 'Loading'}</p>
                <img src={monitoringImage} alt='item'/>
            </div>
        </div>
    </div>
    
  )
}
