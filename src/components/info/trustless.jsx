import truslessImage from '../../images/trustless/image_section_02.png'

export const Trustless = (props) => {
  return (
    <div className="container bg_fa">
        <div className="hero-title">
            <div className="title">
                <h2>{props.data ? props.data.title : 'Loading'}</h2>
                <p>{props.data ? props.data.paragraph1 : 'Loading'} 
                <br/>
                {props.data ? props.data.paragraph2 : 'Loading'}</p>
                <img src={truslessImage} alt='item'/>
            </div>
        </div>
    </div>
    
  )
}
