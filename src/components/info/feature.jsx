export const Feature = (props) => {
  return (
    <div className="container">
        <div className="hero-title">
            <div className="title">
                <h2>{props.data ? props.data.title : 'Loading'}</h2>
                <p>{props.data ? props.data.paragraph1 : 'Loading'}
                <br/>
                {props.data ? props.data.paragraph2 : 'Loading'}</p>
                <ul className="feature">
                    <li>{props.data ? props.data.features[0] : 'Loading'}</li>
                    <li>{props.data ? props.data.features[1] : 'Loading'}</li>
                    <li>{props.data ? props.data.features[2] : 'Loading'}</li>
                </ul>
            </div>
        </div>
    </div>
    
  )
}
