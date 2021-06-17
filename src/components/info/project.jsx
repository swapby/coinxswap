import projectImage from '../../images/project/image_section_01.png'
import checkImage from '../../images/project/ic_check.png'

export const Project = (props) => {
  return (
    <div className="container" id="project">
      <div className="hero-title">
          <div className="title">
              <h2>{props.data ? props.data.title : 'Loading'}</h2>
              <p>{props.data ? props.data.paragraph : 'Loading'}</p>
              <div className="inner_cotainer">
                  <img src={projectImage} alt='item'/>
                  <ul>
                      <li><img src={checkImage} alt='check'/>{props.data ? props.data.features[0] : 'Loading'}</li>
                      <li><img src={checkImage} alt='check'/>{props.data ? props.data.features[1] : 'Loading'}</li>
                      <li><img src={checkImage} alt='check'/>{props.data ? props.data.features[2] : 'Loading'}</li>
                      <li><img src={checkImage} alt='check'/>{props.data ? props.data.features[3] : 'Loading'}</li>
                      <li><img src={checkImage} alt='check'/>{props.data ? props.data.features[4] : 'Loading'}</li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
    
  )
}
