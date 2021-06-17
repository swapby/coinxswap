import logoImage from '../../images/ic_logo_light.svg'

export const Main = (props) => {
  return (
    <div className="container main">
      <div className="hero-title">
        <div className="title">
          <h1 className="main_txt">
            {props.data ? props.data.title : 'Loading'}
          </h1>
          <p>
          {props.data ? props.data.paragraph1 : 'Loading'}
          </p>
          <a href='http://docs.coinxswap.com' className="btn_wp" target="_blank" rel="noreferrer">
            <img src={logoImage} alt='logo'/>
              {props.data ? props.data.paragraph2 : 'Loading'}
            <span>
              {props.data ? props.data.link : 'Loading'}
            </span>
          </a>
        </div>
      </div>
    </div>
    
  )
}
