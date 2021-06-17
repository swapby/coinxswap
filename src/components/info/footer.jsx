import logoImage from '../../images/ic_logo_light.svg'
import textImage from '../../images/footer/logo_text.png'
import facebookImage from '../../images/footer/ic_facebook.png'
import instaImage from '../../images/footer/ic_instagram.png'

export const Footer = (props) => {
  return (
    <footer>
        <div className="inner_footer">
          <img src={logoImage} alt='logo' width="24px"/>
          {' '}
          <img src={textImage} alt='logo' height="20px"/>
          <p className="txt">
            {props.data ? props.data.paragraph : 'Loading'}
          </p>
          <ul>
              <li>{props.data ? props.data.copyright : 'Loading'}</li>
              <li><a href='mailto:info@grabity.org'>{props.data ? props.data.email : 'Loading'}</a></li>
              <li>
                  <a href='#!'><img src={facebookImage} alt='facebook' width="24px"/></a>
                  {' '}
                  <a href='#!'><img src={instaImage} alt='instagram' width="24px"/></a>
              </li>
          </ul>
        </div>
    </footer>
    
  )
}
